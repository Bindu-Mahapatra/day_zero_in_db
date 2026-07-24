package com.readypath.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record Blocker(
        String id,
        String label,
        Integer affectedJoiners,
        String owner,
        String severity
) {
}

