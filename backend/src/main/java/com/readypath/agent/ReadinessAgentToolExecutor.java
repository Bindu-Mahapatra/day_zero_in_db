package com.readypath.agent;

import com.readypath.model.ReadinessData.JoinerContext;
import com.readypath.model.ReadinessData.RecommendationSnapshot;
import com.readypath.service.ReadinessKnowledgeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Map;

@Service
public class ReadinessAgentToolExecutor {

    private static final Logger LOGGER = LoggerFactory.getLogger(
            ReadinessAgentToolExecutor.class);

    private static final int MAX_TOOL_CALLS = 4;

    private final ReadinessKnowledgeService knowledgeService;

    public ReadinessAgentToolExecutor(
            ReadinessKnowledgeService knowledgeService) {
        this.knowledgeService = knowledgeService;
    }

    public List<AgentToolExecution> execute(
            GeminiAgentPlan plan,
            String persona,
            String userId) {
        if (plan == null ||
                plan.toolCalls().isEmpty()) {
            return List.of();
        }

        List<AgentToolExecution> results = new ArrayList<>();

        plan.toolCalls()
                .stream()
                .limit(MAX_TOOL_CALLS)
                .forEach(toolCall -> results.add(
                        executeOne(
                                toolCall,
                                persona,
                                userId)));

        return List.copyOf(results);
    }

    private AgentToolExecution executeOne(
            GeminiAgentPlan.ToolCall toolCall,
            String persona,
            String userId) {
        String toolName = normalize(
                toolCall.toolName());

        AgentToolExecution execution = switch (toolName) {
            case "GET_JOINER_CONTEXT" ->
                getJoinerContext(
                        toolName,
                        toolCall
                                .joinerReference(),
                        persona,
                        userId);

            case "GET_PENDING_RECOMMENDATION" ->
                getPendingRecommendation(
                        toolName,
                        toolCall
                                .joinerReference(),
                        persona,
                        userId);

            case "LIST_JOINERS_NEEDING_ACTION" ->
                listJoinersNeedingAction(
                        toolName,
                        persona,
                        userId);

            default ->
                new AgentToolExecution(
                        toolName,
                        "REJECTED",
                        Map.of(
                                "message",
                                "Unsupported tool name."));
        };

        LOGGER.info(
                """
                        READY_PATH_AGENT_TOOL_EXECUTED tool={} status={}
                        """.strip(),
                execution.toolName(),
                execution.status());

        return execution;
    }

    private AgentToolExecution getJoinerContext(
            String toolName,
            String joinerReference,
            String persona,
            String userId) {
        if (joinerReference == null ||
                joinerReference.isBlank()) {
            return invalidArgument(
                    toolName,
                    "joinerReference is required.");
        }

        JoinerContext context = knowledgeService.getJoinerContext(
                persona,
                userId,
                joinerReference);

        return new AgentToolExecution(
                toolName,
                context.found()
                        ? "SUCCESS"
                        : "NOT_FOUND_OR_DENIED",
                context);
    }

    private AgentToolExecution getPendingRecommendation(
            String toolName,
            String joinerReference,
            String persona,
            String userId) {
        if (joinerReference == null ||
                joinerReference.isBlank()) {
            return invalidArgument(
                    toolName,
                    "joinerReference is required.");
        }

        RecommendationSnapshot recommendation = knowledgeService
                .getPendingRecommendation(
                        persona,
                        userId,
                        joinerReference);

        return new AgentToolExecution(
                toolName,
                recommendation.found()
                        ? "SUCCESS"
                        : "NOT_FOUND_OR_DENIED",
                recommendation);
    }

    private AgentToolExecution listJoinersNeedingAction(
            String toolName,
            String persona,
            String userId) {
        var joiners = knowledgeService
                .listJoinersNeedingAction(
                        persona,
                        userId);

        return new AgentToolExecution(
                toolName,
                "SUCCESS",
                Map.of(
                        "count",
                        joiners.size(),
                        "joiners",
                        joiners));
    }

    private AgentToolExecution invalidArgument(
            String toolName,
            String message) {
        return new AgentToolExecution(
                toolName,
                "INVALID_ARGUMENT",
                Map.of(
                        "message",
                        message));
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