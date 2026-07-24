package com.readypath.gateway;

public record GeminiCallResult(
        String model,
        String text,
        long latencyMs) {
}