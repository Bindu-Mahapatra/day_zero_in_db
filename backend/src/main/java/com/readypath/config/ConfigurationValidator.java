package com.readypath.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Component
public class ConfigurationValidator {

    private static final Logger log = LoggerFactory.getLogger(ConfigurationValidator.class);

    private final GeminiProperties geminiProperties;

    public ConfigurationValidator(GeminiProperties geminiProperties) {
        this.geminiProperties = geminiProperties;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void validateConfiguration() {
        log.info("Validating Gemini configuration");
        validateModel();
        validateApiKey();
        log.info("Gemini configuration validated successfully");
    }

    private void validateModel() {
        if (!StringUtils.hasText(geminiProperties.getModel())) {
            throw new IllegalStateException("Gemini model must be configured");
        }
        log.info("Gemini model: {}", geminiProperties.getModel());
    }

    private void validateApiKey() {
        if (!geminiProperties.hasApiKey()) {
            log.warn("Gemini API key is not configured; set GOOGLE_API_KEY or gemini.api-key");
        } else {
            log.info("Gemini API key is configured");
        }
    }
}

