package com.readypath.gateway;

import com.readypath.config.GeminiProperties;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;

@Service
@ConditionalOnProperty(prefix = "readypath.gemini", name = "enabled", havingValue = "false", matchIfMissing = true)
public class DisabledGeminiGateway
        implements GeminiGateway {

    private final GeminiProperties properties;

    public DisabledGeminiGateway(
            GeminiProperties properties) {
        this.properties = properties;
    }

    @Override
    public boolean enabled() {
        return false;
    }

    @Override
    public String modelName() {
        return properties.getModel();
    }

    @Override
    public GeminiCallResult generate(
            String prompt) {
        throw disabledException();
    }

    @Override
    public GeminiAssistantResult generateAssistant(
            GeminiAssistantRequest request) {
        throw disabledException();
    }

    private IllegalStateException disabledException() {
        return new IllegalStateException(
                """
                        Gemini integration is disabled.
                        Set READYPATH_GEMINI_ENABLED=true to enable it.
                        """.strip());
    }
}