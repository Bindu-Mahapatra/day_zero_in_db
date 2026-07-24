package com.readypath.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public record CandidateInsightResponse(
        String headline,
        String summary,
        List<TopRiskResponse> topRisks
) {
}

