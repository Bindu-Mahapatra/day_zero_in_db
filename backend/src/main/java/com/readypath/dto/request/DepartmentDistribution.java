package com.readypath.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record DepartmentDistribution(
        String department,
        Integer joinerCount,
        Double percentage
) {
}

