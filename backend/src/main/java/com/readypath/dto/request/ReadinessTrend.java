package com.readypath.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record ReadinessTrend(
        String label,
        Integer ready,
        Integer attention,
        Integer critical
) {
}

