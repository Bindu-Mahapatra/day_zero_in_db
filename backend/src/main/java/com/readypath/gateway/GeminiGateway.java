package com.readypath.gateway;

public interface GeminiGateway {

    boolean enabled();

    String modelName();

    /*
     * Used by the existing connectivity endpoint.
     */
    GeminiCallResult generate(
            String prompt);

    /*
     * Generates a constrained ReadyPath response.
     */
    GeminiAssistantResult generateAssistant(
            GeminiAssistantRequest request);
}