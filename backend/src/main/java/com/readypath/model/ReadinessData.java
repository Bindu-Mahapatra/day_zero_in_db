package com.readypath.model;

import java.util.List;

public final class ReadinessData {

    private ReadinessData() {
    }

    public record JoinerSnapshot(
            String joinerId,
            String displayName,
            String role,
            String location,
            String managerId,
            String managerName,
            String joiningDate,
            int daysToJoining,
            int readinessScore,
            String readinessStatus,
            int completedAreas,
            int inProgressAreas,
            int blockedAreas,
            String topPendingItem,
            String pendingOwner) {
    }

    public record BlockerSnapshot(
            String blockerId,
            String joinerId,
            String title,
            String description,
            String severity,
            String owner,
            String areaCode,
            int ageInDays,
            String recommendedAction,
            List<String> evidenceIds) {
        public BlockerSnapshot {
            evidenceIds = evidenceIds == null
                    ? List.of()
                    : List.copyOf(evidenceIds);
        }
    }

    public record EvidenceSnapshot(
            String evidenceId,
            String joinerId,
            String title,
            String sourceSystem,
            String sourceReference,
            String observedValue,
            String capturedAt,
            String status) {
    }

    public record RecommendationSnapshot(
            boolean found,
            String recommendationId,
            String joinerId,
            String title,
            String summary,
            String recommendedAction,
            String recipient,
            String approvalStatus,
            List<String> evidenceIds) {
        public RecommendationSnapshot {
            evidenceIds = evidenceIds == null
                    ? List.of()
                    : List.copyOf(evidenceIds);
        }
    }

    public record JoinerContext(
            boolean found,
            String message,
            JoinerSnapshot joiner,
            List<BlockerSnapshot> blockers,
            List<EvidenceSnapshot> evidence,
            RecommendationSnapshot recommendation) {
        public JoinerContext {
            blockers = blockers == null
                    ? List.of()
                    : List.copyOf(blockers);

            evidence = evidence == null
                    ? List.of()
                    : List.copyOf(evidence);
        }
    }
}