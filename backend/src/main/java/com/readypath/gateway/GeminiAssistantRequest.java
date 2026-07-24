package com.readypath.gateway;

public record GeminiAssistantRequest(
        String persona,
        String question,
        String readinessContextJson) {
}