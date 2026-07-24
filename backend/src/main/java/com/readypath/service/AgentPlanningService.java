package com.readypath.service;

import com.readypath.agent.AgentToolExecution;
import com.readypath.agent.GeminiAgentPlan;
import com.readypath.agent.GeminiAgentPlanResult;
import com.readypath.agent.GeminiAgentPlanner;
import com.readypath.agent.ReadinessAgentToolExecutor;
import com.readypath.config.GeminiProperties;
import com.readypath.dto.AgentDtos.AgentPlanResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Locale;

@Service
public class AgentPlanningService {

        private static final Logger LOGGER = LoggerFactory.getLogger(
                        AgentPlanningService.class);

        private static final int MAX_TOOL_CALLS = 3;

        private final GeminiAgentPlanner planner;
        private final GeminiProperties properties;
        private final ReadinessKnowledgeService knowledgeService;
        private final ReadinessAgentToolExecutor toolExecutor;

        public AgentPlanningService(
                        GeminiAgentPlanner planner,
                        GeminiProperties properties,
                        ReadinessKnowledgeService knowledgeService,
                        ReadinessAgentToolExecutor toolExecutor) {
                this.planner = planner;
                this.properties = properties;
                this.knowledgeService = knowledgeService;
                this.toolExecutor = toolExecutor;
        }

        public AgentPlanResponse planAndExecute(
                        String question,
                        String persona,
                        String userId) {
                /*
                 * Authorization happens before Gemini receives
                 * the question.
                 */
                if (!knowledgeService.isKnownUserScope(
                                persona,
                                userId)) {
                        LOGGER.warn(
                                        """
                                                        READY_PATH_AGENT_ACCESS_DENIED
                                                        persona={}
                                                        userId={}
                                                        """.strip(),
                                        persona,
                                        userId);

                        return response(
                                        "ACCESS_DENIED",
                                        "",
                                        List.of(),
                                        List.of(),
                                        0);
                }

                if (!planner.enabled() ||
                                !properties.isAgentEnabled()) {
                        LOGGER.info(
                                        """
                                                        READY_PATH_AGENT_DISABLED
                                                        geminiEnabled={}
                                                        agentEnabled={}
                                                        """.strip(),
                                        planner.enabled(),
                                        properties.isAgentEnabled());

                        return response(
                                        "DISABLED",
                                        "",
                                        List.of(),
                                        List.of(),
                                        0);
                }

                try {
                        GeminiAgentPlanResult planningResult = planner.plan(
                                        normalizePersona(persona),
                                        question);

                        GeminiAgentPlan sanitizedPlan = sanitizePlan(
                                        planningResult.plan());

                        if (sanitizedPlan.toolCalls().isEmpty()) {
                                LOGGER.warn(
                                                """
                                                                READY_PATH_AGENT_PLAN_REJECTED
                                                                reason=NO_ALLOWED_TOOLS
                                                                model={}
                                                                """.strip(),
                                                planningResult.model());

                                return response(
                                                "NO_ALLOWED_TOOLS",
                                                sanitizedPlan.objective(),
                                                List.of(),
                                                List.of(),
                                                planningResult.latencyMs());
                        }

                        List<AgentToolExecution> toolResults = toolExecutor.execute(
                                        sanitizedPlan,
                                        persona,
                                        userId);

                        LOGGER.info(
                                        """
                                                        READY_PATH_AGENT_PLAN_EXECUTED
                                                        model={}
                                                        plannedTools={}
                                                        executedTools={}
                                                        """.strip(),
                                        planningResult.model(),
                                        sanitizedPlan.toolCalls().size(),
                                        toolResults.size());

                        return new AgentPlanResponse(
                                        "SUCCESS",
                                        planningResult.model(),
                                        sanitizedPlan.objective(),
                                        sanitizedPlan.toolCalls(),
                                        toolResults,
                                        planningResult.latencyMs());
                } catch (Exception exception) {
                        /*
                         * Log the complete stack trace, but do not log
                         * the user question or model response.
                         */
                        LOGGER.error(
                                        """
                                                        READY_PATH_AGENT_PLANNING_FAILED
                                                        model={}
                                                        persona={}
                                                        exceptionType={}
                                                        exceptionMessage={}
                                                        """,
                                        planner.modelName(),
                                        normalizePersona(persona),
                                        exception.getClass().getName(),
                                        exception.getMessage(),
                                        exception);

                        return response(
                                        "PLANNING_FAILED",
                                        """
                                                        The agent could not create a valid tool plan.
                                                        Check the backend log for the underlying
                                                        Gemini or schema error.
                                                        """.strip(),
                                        List.of(),
                                        List.of(),
                                        0);
                }
        }

        private GeminiAgentPlan sanitizePlan(
                        GeminiAgentPlan plan) {
                if (plan == null) {
                        return new GeminiAgentPlan(
                                        "",
                                        List.of());
                }

                List<GeminiAgentPlan.ToolCall> allowedTools = plan.toolCalls()
                                .stream()
                                .filter(
                                                this::isAllowedTool)
                                .map(
                                                this::normalizeToolCall)
                                .distinct()
                                .limit(MAX_TOOL_CALLS)
                                .toList();

                return new GeminiAgentPlan(
                                plan.objective(),
                                allowedTools);
        }

        private GeminiAgentPlan.ToolCall normalizeToolCall(
                        GeminiAgentPlan.ToolCall toolCall) {
                return new GeminiAgentPlan.ToolCall(
                                normalize(toolCall.toolName()),
                                toolCall.joinerReference() == null
                                                ? ""
                                                : toolCall.joinerReference().strip());
        }

        private boolean isAllowedTool(
                        GeminiAgentPlan.ToolCall toolCall) {
                if (toolCall == null ||
                                toolCall.toolName() == null) {
                        return false;
                }

                return switch (normalize(toolCall.toolName())) {
                        case "GET_JOINER_CONTEXT",
                                        "GET_PENDING_RECOMMENDATION",
                                        "LIST_JOINERS_NEEDING_ACTION" ->
                                true;

                        default ->
                                false;
                };
        }

        private AgentPlanResponse response(
                        String status,
                        String objective,
                        List<GeminiAgentPlan.ToolCall> tools,
                        List<AgentToolExecution> results,
                        long latencyMs) {
                return new AgentPlanResponse(
                                status,
                                planner.modelName(),
                                objective,
                                tools,
                                results,
                                latencyMs);
        }

        private String normalizePersona(
                        String persona) {
                return normalize(persona);
        }

        private String normalize(
                        String value) {
                return value == null
                                ? ""
                                : value
                                                .trim()
                                                .toUpperCase(
                                                                Locale.ROOT);
        }
}