package com.readypath.dto;

public final class GeminiDtos {

    private GeminiDtos() {
    }

    public record VerificationResponse(
            String status,
            String provider,
            String model,
            String response,
            long latencyMs,
            String message) {
    }
}