package com.readypath.agent;

public record GeminiAgentPlanResult(
        String model,
        GeminiAgentPlan plan,
        long latencyMs) {
}