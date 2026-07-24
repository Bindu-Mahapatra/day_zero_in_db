package com.readypath.dto;

import com.readypath.agent.AgentToolExecution;
import com.readypath.agent.GeminiAgentPlan.ToolCall;
import jakarta.validation.constraints.NotBlank;

import java.util.List;

public final class AgentDtos {

        private AgentDtos() {
        }

        public record AgentPlanRequest(
                        @NotBlank String question) {
        }

        public record AgentPlanResponse(
                        String status,
                        String model,
                        String objective,
                        List<ToolCall> plannedTools,
                        List<AgentToolExecution> toolResults,
                        long planningLatencyMs) {

                public AgentPlanResponse {
                        plannedTools = plannedTools == null
                                        ? List.of()
                                        : List.copyOf(
                                                        plannedTools);

                        toolResults = toolResults == null
                                        ? List.of()
                                        : List.copyOf(
                                                        toolResults);
                }
        }
}