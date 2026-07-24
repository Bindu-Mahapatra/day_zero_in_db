package com.readypath.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public record CandidateInfoRequest(
        Integer totalJoiners,
        Integer fullyReady,
        Integer attentionRequired,
        Integer criticalRisk,
        Integer notStarted,
        List<PipelineStage> pipeline,
        List<StatusDistribution> distribution,
        List<Blocker> blockers,
        List<ReadinessTrend> trend,
        List<DepartmentDistribution> departments,
        List<UpcomingJoiner> upcomingJoiners,
        String lastUpdated
) {
}

