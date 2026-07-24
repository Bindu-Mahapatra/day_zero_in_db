package com.readypath.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public record TopRiskResponse(
        Integer rank,
        String title,
        String description,
        String severity,
        Integer affectedJoiners,
        List<String> candidateIds,
        Integer confidence,
        String recommendation
) {
}

