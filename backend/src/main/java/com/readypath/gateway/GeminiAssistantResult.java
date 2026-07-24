package com.readypath.gateway;

public record GeminiAssistantResult(
        String model,
        GeminiAssistantDraft draft,
        long latencyMs) {
}