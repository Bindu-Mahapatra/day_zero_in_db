package com.readypath.config;

import io.micrometer.common.util.StringUtils;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "gemini")
@Data
public class GeminiProperties {

    private String model;

    private String apiKey;

    public boolean hasApiKey() {
        return StringUtils.isNotBlank(apiKey);
    }
}
