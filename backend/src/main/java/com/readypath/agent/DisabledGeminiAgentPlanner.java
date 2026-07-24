package com.readypath.agent;

import com.readypath.config.GeminiProperties;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;

@Service
@ConditionalOnProperty(prefix = "readypath.gemini", name = "enabled", havingValue = "false", matchIfMissing = true)
public class DisabledGeminiAgentPlanner
        implements GeminiAgentPlanner {

    private final GeminiProperties properties;

    public DisabledGeminiAgentPlanner(
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
    public GeminiAgentPlanResult plan(
            String persona,
            String question) {
        throw new IllegalStateException(
                """
                        Gemini integration is disabled.
                        """.strip());
    }
}