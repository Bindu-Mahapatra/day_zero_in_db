package com.readypath.config;

import com.google.genai.Client;
import com.google.genai.types.HttpOptions;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableConfigurationProperties(GeminiProperties.class)
public class GeminiConfiguration {

    @Bean(destroyMethod = "close")
    @ConditionalOnProperty(prefix = "readypath.gemini", name = "enabled", havingValue = "true")
    public Client geminiClient(
            GeminiProperties properties) {
        validate(properties);

        /*
         * Authentication is provided by Application
         * Default Credentials.
         *
         * No API key or credential file is passed
         * into application code.
         */
        return Client.builder()
                .project(
                        properties.getProjectId())
                .location(
                        properties.getLocation())
                .enterprise(true)
                .httpOptions(
                        HttpOptions.builder()
                                .apiVersion("v1")
                                .build())
                .build();
    }

    private void validate(
            GeminiProperties properties) {
        if (properties.getProjectId() == null ||
                properties.getProjectId().isBlank()) {
            throw new IllegalStateException(
                    """
                            GOOGLE_CLOUD_PROJECT must be configured when Gemini is enabled.
                            """.strip());
        }

        if (properties.getLocation() == null ||
                properties.getLocation().isBlank()) {
            throw new IllegalStateException(
                    """
                            GOOGLE_CLOUD_LOCATION must be configured when Gemini is enabled.
                            """.strip());
        }

        if (properties.getModel() == null ||
                properties.getModel().isBlank()) {
            throw new IllegalStateException(
                    """
                            A Gemini model must be configured when Gemini is enabled.
                            """.strip());
        }
    }
}