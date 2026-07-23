package com.readypath.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record StatusDistribution(
        String status,
        String label,
        Integer count,
        Double percentage
) {
}

