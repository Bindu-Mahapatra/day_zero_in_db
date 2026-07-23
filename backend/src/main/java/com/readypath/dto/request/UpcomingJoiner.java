package com.readypath.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record UpcomingJoiner(
        String id,
        String displayName,
        String email,
        String role,
        String department,
        String division,
        String location,
        String managerId,
        String managerName,
        String joiningDate,
        Integer daysToJoining,
        Integer readinessScore,
        String status,
        String topPendingItem,
        String pendingOwner
) {
}

