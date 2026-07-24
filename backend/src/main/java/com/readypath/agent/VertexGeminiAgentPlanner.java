package com.readypath.agent;

import com.google.genai.Client;
import com.google.genai.types.Content;
import com.google.genai.types.GenerateContentConfig;
import com.google.genai.types.GenerateContentResponse;
import com.google.genai.types.Part;
import com.google.genai.types.ThinkingConfig;
import com.readypath.config.GeminiProperties;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@Service
@ConditionalOnProperty(prefix = "readypath.gemini", name = "enabled", havingValue = "true")
public class VertexGeminiAgentPlanner
                implements GeminiAgentPlanner {

        private static final Logger LOGGER = LoggerFactory.getLogger(
                        VertexGeminiAgentPlanner.class);

        private static final String SYSTEM_INSTRUCTION = """
                        You are the planning component of ReadyPath AI.

                        Select the minimum read-only backend tools needed
                        to answer an onboarding-readiness question.

                        Available tools:

                        GET_JOINER_CONTEXT
                        Retrieves one joiner's readiness, blockers,
                        evidence, ownership and readiness areas.

                        GET_PENDING_RECOMMENDATION
                        Retrieves a pending recommendation that requires
                        human review. Use it for reminder, follow-up,
                        escalation or approval questions.

                        LIST_JOINERS_NEEDING_ACTION
                        Retrieves joiners requiring attention within the
                        authenticated user's permitted scope.

                        Rules:

                        1. Return only a tool plan. Do not answer the question.
                        2. Use only the listed tool names.
                        3. When the question mentions Maya, use
                           "Maya Sen" as joinerReference.
                        4. LIST_JOINERS_NEEDING_ACTION must use an empty
                           joinerReference.
                        5. Reminder requests generally require:
                           GET_JOINER_CONTEXT and
                           GET_PENDING_RECOMMENDATION.
                        6. Use at most three tool calls.
                        7. Do not return user IDs, evidence values,
                           passwords or readiness facts.
                        8. Follow the configured response schema.
                        """.strip();

        private static final Map<String, Object> PLAN_RESPONSE_JSON_SCHEMA = buildPlanResponseJsonSchema();

        private final Client client;
        private final GeminiProperties properties;
        private final ObjectMapper jsonMapper;

        public VertexGeminiAgentPlanner(
                        Client client,
                        GeminiProperties properties,
                        ObjectMapper jsonMapper) {
                this.client = client;
                this.properties = properties;
                this.jsonMapper = jsonMapper;
        }

        @Override
        public boolean enabled() {
                return true;
        }

        @Override
        public String modelName() {
                return properties.getModel();
        }

        @Override
        public GeminiAgentPlanResult plan(
                        String persona,
                        String question) {
                validateRequest(
                                persona,
                                question);

                LOGGER.info(
                                "GEMINI_AGENT_PLAN_START model={} persona={}",
                                properties.getModel(),
                                persona);

                GenerateContentConfig config = GenerateContentConfig
                                .builder()
                                .systemInstruction(
                                                Content.fromParts(
                                                                Part.fromText(
                                                                                SYSTEM_INSTRUCTION)))
                                /*
                                 * Tool planning is a small classification
                                 * task. Extended model reasoning is not
                                 * required and can consume the output budget.
                                 */
                                .thinkingConfig(
                                                ThinkingConfig
                                                                .builder()
                                                                .thinkingBudget(0))
                                .temperature(0.0F)
                                .responseMimeType(
                                                "application/json")
                                .responseJsonSchema(
                                                PLAN_RESPONSE_JSON_SCHEMA)
                                .candidateCount(1)
                                .maxOutputTokens(1000)
                                .build();

                String prompt = """
                                Authenticated persona:
                                %s

                                User question:
                                %s

                                Select the minimum read-only tool plan required
                                to retrieve the information needed to answer
                                this question.

                                Follow the configured response schema.
                                """.formatted(
                                persona,
                                question).strip();

                long startedAt = System.nanoTime();

                GenerateContentResponse response = client.models.generateContent(
                                properties.getModel(),
                                prompt,
                                config);

                long latencyMs = TimeUnit.NANOSECONDS.toMillis(
                                System.nanoTime() - startedAt);

                String responseText = requireResponseText(response);

                GeminiAgentPlan plan = parsePlan(responseText);

                LOGGER.info(
                                """
                                                GEMINI_AGENT_PLAN_SUCCEEDED
                                                model={}
                                                latencyMs={}
                                                toolCount={}
                                                """.strip(),
                                properties.getModel(),
                                latencyMs,
                                plan.toolCalls().size());

                return new GeminiAgentPlanResult(
                                properties.getModel(),
                                plan,
                                latencyMs);
        }

        private GeminiAgentPlan parsePlan(
                        String responseText) {
                try {
                        GeminiAgentPlan plan = jsonMapper.readValue(
                                        responseText,
                                        GeminiAgentPlan.class);

                        if (plan == null) {
                                throw new IllegalStateException(
                                                "Gemini returned a null agent plan.");
                        }

                        if (plan.objective() == null ||
                                        plan.objective().isBlank()) {
                                throw new IllegalStateException(
                                                "Gemini returned a plan without an objective.");
                        }

                        if (plan.toolCalls() == null ||
                                        plan.toolCalls().isEmpty()) {
                                throw new IllegalStateException(
                                                "Gemini returned a plan without tool calls.");
                        }

                        return plan;
                } catch (Exception exception) {
                        /*
                         * Do not log responseText because it contains
                         * user-provided content generated by the model.
                         */
                        throw new IllegalStateException(
                                        """
                                                        Gemini returned a planning response that
                                                        could not be mapped to GeminiAgentPlan.
                                                        """.strip(),
                                        exception);
                }
        }

        private String requireResponseText(
                        GenerateContentResponse response) {
                if (response == null) {
                        throw new IllegalStateException(
                                        "Gemini returned no planning response.");
                }

                String responseText = response.text();

                if (responseText == null ||
                                responseText.isBlank()) {
                        throw new IllegalStateException(
                                        """
                                                        Gemini returned an empty planning response.
                                                        The output may have reached the token limit,
                                                        been blocked, or ended without a visible JSON
                                                        candidate.
                                                        """.strip());
                }

                return responseText.strip();
        }

        private void validateRequest(
                        String persona,
                        String question) {
                if (persona == null ||
                                persona.isBlank()) {
                        throw new IllegalArgumentException(
                                        "Agent persona cannot be empty.");
                }

                if (question == null ||
                                question.isBlank()) {
                        throw new IllegalArgumentException(
                                        "Agent question cannot be empty.");
                }
        }

        private static Map<String, Object> buildPlanResponseJsonSchema() {
                Map<String, Object> toolProperties = new LinkedHashMap<>();

                toolProperties.put(
                                "toolName",
                                Map.of(
                                                "type", "string",
                                                "description",
                                                "The read-only ReadyPath backend tool.",
                                                "enum",
                                                List.of(
                                                                "GET_JOINER_CONTEXT",
                                                                "GET_PENDING_RECOMMENDATION",
                                                                "LIST_JOINERS_NEEDING_ACTION")));

                toolProperties.put(
                                "joinerReference",
                                Map.of(
                                                "type", "string",
                                                "description",
                                                """
                                                                Joiner name or identifier. Use an empty
                                                                string when the tool does not require one.
                                                                """.strip()));

                Map<String, Object> toolSchema = new LinkedHashMap<>();

                toolSchema.put(
                                "type",
                                "object");

                toolSchema.put(
                                "properties",
                                toolProperties);

                toolSchema.put(
                                "required",
                                List.of(
                                                "toolName",
                                                "joinerReference"));

                toolSchema.put(
                                "propertyOrdering",
                                List.of(
                                                "toolName",
                                                "joinerReference"));

                Map<String, Object> rootProperties = new LinkedHashMap<>();

                rootProperties.put(
                                "objective",
                                Map.of(
                                                "type", "string",
                                                "description",
                                                """
                                                                A short description of the information
                                                                that must be retrieved.
                                                                """.strip()));

                rootProperties.put(
                                "toolCalls",
                                Map.of(
                                                "type", "array",
                                                "description",
                                                """
                                                                Ordered read-only backend tools required
                                                                to retrieve the answer.
                                                                """.strip(),
                                                "items", toolSchema,
                                                "minItems", 1,
                                                "maxItems", 3));

                Map<String, Object> rootSchema = new LinkedHashMap<>();

                rootSchema.put(
                                "type",
                                "object");

                rootSchema.put(
                                "properties",
                                rootProperties);

                rootSchema.put(
                                "required",
                                List.of(
                                                "objective",
                                                "toolCalls"));

                rootSchema.put(
                                "propertyOrdering",
                                List.of(
                                                "objective",
                                                "toolCalls"));

                return rootSchema;
        }
}
