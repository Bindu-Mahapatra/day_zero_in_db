package com.readypath.agent;

import java.util.List;

public record GeminiAgentPlan(
        String objective,
        List<ToolCall> toolCalls) {

    public GeminiAgentPlan {
        objective = objective == null
                ? ""
                : objective.strip();

        toolCalls = toolCalls == null
                ? List.of()
                : List.copyOf(toolCalls);
    }

    public record ToolCall(
            String toolName,
            String joinerReference) {

        public ToolCall {
            toolName = toolName == null
                    ? ""
                    : toolName.strip();

            joinerReference = joinerReference == null
                    ? ""
                    : joinerReference.strip();
        }
    }
}