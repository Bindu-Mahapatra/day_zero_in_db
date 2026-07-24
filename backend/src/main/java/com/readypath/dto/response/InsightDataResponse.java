package com.readypath.dto.response;

import java.time.Instant;

public record InsightDataResponse(
        CandidateInsightResponse candidateInsight,
        Instant processedAt,
        long processingTimeMs
) {
}

