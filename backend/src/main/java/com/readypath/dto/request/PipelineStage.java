package com.readypath.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record PipelineStage(
        String id,
        String label,
        Integer joinerCount,
        Integer conversionPercentage
) {
}

