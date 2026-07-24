package com.readypath.gateway;

import com.google.genai.Client;
import com.google.genai.types.Content;
import com.google.genai.types.GenerateContentConfig;
import com.google.genai.types.GenerateContentResponse;
import com.google.genai.types.Part;
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
public class VertexGeminiGateway
                implements GeminiGateway {

        private static final Logger LOGGER = LoggerFactory.getLogger(
                        VertexGeminiGateway.class);

        private static final String SYSTEM_INSTRUCTION = """
                        You are ReadyPath AI, an employee onboarding
                        readiness assistant.

                        The ReadyPath backend supplies authorized,
                        authoritative results from read-only onboarding
                        tools.

                        Follow these rules:

                        1. Use only facts present in successful backend
                           tool results.

                        2. Ignore tool results whose status is not SUCCESS.

                        3. Never calculate, change or invent a readiness
                           score.

                        4. Never invent blockers, owners, dates, evidence,
                           identifiers, recommendations or source references.

                        5. Return only evidence IDs present in successful
                           tool results.

                        6. Clearly state the primary blocker and the owner
                           of the next action when those facts are available.

                        7. Do not assess performance, personality,
                           competence or employment suitability.

                        8. Do not mention internal tool names or the
                           planning process in the answer.

                        9. Keep the response concise, operational and
                           evidence-grounded.

                        10. For reminder requests, place the complete
                            reminder draft in the answer field.

                        11. Never claim that a reminder has been approved,
                            delivered or sent.

                        12. APPROVE_RECOMMENDATION only presents an option
                            for human approval.

                        13. OPEN_JOINER only presents navigation to the
                            authorized joiner's readiness record.

                        14. Follow the configured JSON response schema.
                        """.strip();

        private static final Map<String, Object> ASSISTANT_RESPONSE_JSON_SCHEMA = buildAssistantResponseJsonSchema();

        private final Client client;

        private final GeminiProperties properties;

        private final ObjectMapper jsonMapper;

        public VertexGeminiGateway(
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

        /**
         * Used by the fixed Gemini connectivity endpoint.
         */
        @Override
        public GeminiCallResult generate(
                        String prompt) {
                validatePrompt(prompt);

                LOGGER.info(
                                "GEMINI_CALL_START model={}",
                                properties.getModel());

                long startedAt = System.nanoTime();

                GenerateContentConfig config = GenerateContentConfig
                                .builder()
                                .candidateCount(1)
                                .temperature(0.0F)
                                .maxOutputTokens(100)
                                .build();

                GenerateContentResponse response = client.models.generateContent(
                                properties.getModel(),
                                prompt,
                                config);

                long latencyMs = elapsedMilliseconds(startedAt);

                String responseText = requireResponseText(response);

                LOGGER.info(
                                "GEMINI_CALL_SUCCEEDED model={} latencyMs={}",
                                properties.getModel(),
                                latencyMs);

                return new GeminiCallResult(
                                properties.getModel(),
                                responseText,
                                latencyMs);
        }

        /**
         * Generates a schema-constrained ReadyPath response.
         *
         * The gateway returns only the model draft.
         * Evidence, joiner IDs and actions are validated
         * again by AssistantService.
         */
        @Override
        public GeminiAssistantResult generateAssistant(
                        GeminiAssistantRequest request) {
                validateAssistantRequest(request);

                LOGGER.info(
                                """
                                                GEMINI_STRUCTURED_CALL_START model={} persona={}
                                                """.strip(),
                                properties.getModel(),
                                request.persona());

                GenerateContentConfig config = GenerateContentConfig
                                .builder()
                                .systemInstruction(
                                                Content.fromParts(
                                                                Part.fromText(
                                                                                SYSTEM_INSTRUCTION)))
                                .responseMimeType(
                                                "application/json")
                                .responseJsonSchema(
                                                ASSISTANT_RESPONSE_JSON_SCHEMA)
                                .candidateCount(1)
                                .maxOutputTokens(1200)
                                .build();

                String prompt = buildAssistantPrompt(request);

                long startedAt = System.nanoTime();

                GenerateContentResponse response = client.models.generateContent(
                                properties.getModel(),
                                prompt,
                                config);

                long latencyMs = elapsedMilliseconds(startedAt);

                String responseText = requireResponseText(response);

                GeminiAssistantDraft draft = parseAssistantDraft(responseText);

                LOGGER.info(
                                """
                                                GEMINI_STRUCTURED_CALL_SUCCEEDED model={} latencyMs={} evidenceCount={} actionCount={}
                                                """
                                                .strip(),
                                properties.getModel(),
                                latencyMs,
                                draft.evidenceIds().size(),
                                draft.actionTypes().size());

                return new GeminiAssistantResult(
                                properties.getModel(),
                                draft,
                                latencyMs);
        }

        private String buildAssistantPrompt(
                        GeminiAssistantRequest request) {
                return """
                                Authenticated persona:
                                %s

                                User question:
                                %s

                                Authoritative backend tool results:
                                %s

                                Answer the user's question using only successful
                                backend tool results.

                                Do not describe the planning process or mention
                                internal tool names.

                                Use only evidence identifiers present in the
                                successful tool results.

                                For a reminder request, place the complete
                                reminder draft in the answer field.

                                Follow the configured JSON response schema.
                                """.formatted(
                                request.persona(),
                                request.question(),
                                request.readinessContextJson()).strip();
        }

        private GeminiAssistantDraft parseAssistantDraft(
                        String responseText) {
                try {
                        GeminiAssistantDraft draft = jsonMapper.readValue(
                                        responseText,
                                        GeminiAssistantDraft.class);

                        validateDraft(draft);

                        return draft;
                } catch (Exception exception) {
                        /*
                         * Do not log responseText because it may contain
                         * employee-related readiness information.
                         */
                        throw new IllegalStateException(
                                        """
                                                        Gemini returned a response that could not
                                                        be mapped to the ReadyPath assistant schema.
                                                        """.strip(),
                                        exception);
                }
        }

        private void validateDraft(
                        GeminiAssistantDraft draft) {
                if (draft == null) {
                        throw new IllegalStateException(
                                        "Gemini returned a null assistant draft.");
                }

                if (draft.heading() == null ||
                                draft.heading().isBlank()) {
                        throw new IllegalStateException(
                                        """
                                                        Gemini returned an assistant draft
                                                        without a heading.
                                                        """.strip());
                }

                if (draft.answer() == null ||
                                draft.answer().isBlank()) {
                        throw new IllegalStateException(
                                        """
                                                        Gemini returned an assistant draft
                                                        without an answer.
                                                        """.strip());
                }
        }

        private String requireResponseText(
                        GenerateContentResponse response) {
                if (response == null) {
                        throw new IllegalStateException(
                                        "Gemini returned no response.");
                }

                String responseText = response.text();

                if (responseText == null ||
                                responseText.isBlank()) {
                        throw new IllegalStateException(
                                        "Gemini returned an empty response.");
                }

                return responseText.strip();
        }

        private void validatePrompt(
                        String prompt) {
                if (prompt == null ||
                                prompt.isBlank()) {
                        throw new IllegalArgumentException(
                                        "Gemini prompt cannot be empty.");
                }
        }

        private void validateAssistantRequest(
                        GeminiAssistantRequest request) {
                if (request == null) {
                        throw new IllegalArgumentException(
                                        """
                                                        Gemini assistant request cannot be null.
                                                        """.strip());
                }

                if (request.persona() == null ||
                                request.persona().isBlank()) {
                        throw new IllegalArgumentException(
                                        """
                                                        Gemini assistant persona cannot be empty.
                                                        """.strip());
                }

                if (request.question() == null ||
                                request.question().isBlank()) {
                        throw new IllegalArgumentException(
                                        """
                                                        Gemini assistant question cannot be empty.
                                                        """.strip());
                }

                if (request.readinessContextJson() == null ||
                                request.readinessContextJson().isBlank()) {
                        throw new IllegalArgumentException(
                                        """
                                                        Gemini readiness context cannot be empty.
                                                        """.strip());
                }
        }

        private long elapsedMilliseconds(
                        long startedAt) {
                return TimeUnit.NANOSECONDS
                                .toMillis(
                                                System.nanoTime() -
                                                                startedAt);
        }

        private static Map<String, Object> buildAssistantResponseJsonSchema() {
                Map<String, Object> properties = new LinkedHashMap<>();

                properties.put(
                                "heading",
                                Map.of(
                                                "type",
                                                "string",

                                                "description",
                                                """
                                                                A concise operational heading for the
                                                                ReadyPath response.
                                                                """.strip()));

                properties.put(
                                "answer",
                                Map.of(
                                                "type",
                                                "string",

                                                "description",
                                                """
                                                                A concise evidence-grounded answer.
                                                                For reminder requests, this must contain
                                                                the complete reminder draft.
                                                                """.strip()));

                properties.put(
                                "evidenceIds",
                                Map.of(
                                                "type",
                                                "array",

                                                "description",
                                                """
                                                                Evidence identifiers directly supporting
                                                                the answer. Every value must exist in the
                                                                supplied readiness context.
                                                                """.strip(),

                                                "items",
                                                Map.of(
                                                                "type",
                                                                "string"),

                                                "maxItems",
                                                6));

                properties.put(
                                "actionTypes",
                                Map.of(
                                                "type",
                                                "array",

                                                "description",
                                                """
                                                                Suggested ReadyPath user-interface actions.
                                                                Return an empty array when no action is
                                                                appropriate.
                                                                """.strip(),

                                                "items",
                                                Map.of(
                                                                "type",
                                                                "string",

                                                                "enum",
                                                                List.of(
                                                                                "OPEN_JOINER",
                                                                                "APPROVE_RECOMMENDATION")),

                                                "maxItems",
                                                2));

                Map<String, Object> schema = new LinkedHashMap<>();

                schema.put(
                                "type",
                                "object");

                schema.put(
                                "description",
                                """
                                                Structured ReadyPath onboarding assistant response.
                                                """.strip());

                schema.put(
                                "properties",
                                properties);

                schema.put(
                                "required",
                                List.of(
                                                "heading",
                                                "answer",
                                                "evidenceIds",
                                                "actionTypes"));

                schema.put(
                                "additionalProperties",
                                false);

                schema.put(
                                "propertyOrdering",
                                List.of(
                                                "heading",
                                                "answer",
                                                "evidenceIds",
                                                "actionTypes"));

                return schema;
        }
}
