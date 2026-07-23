package com.readypath.util;

import org.springframework.stereotype.Component;

@Component
public class JsonNormalizer {

    public String normalize(final String payload) {
        final String trimmedPayload = payload == null ? "" : payload.trim();
        if (trimmedPayload.startsWith("```") && trimmedPayload.endsWith("```")) {
            return trimmedPayload
                    .replaceFirst("^```(?:json)?\\s*", "")
                    .replaceFirst("\\s*```$", "")
                    .trim();
        }
        return trimmedPayload;
    }
}

