package com.readypath.service;

import com.readypath.model.ReadinessData.BlockerSnapshot;
import com.readypath.model.ReadinessData.EvidenceSnapshot;
import com.readypath.model.ReadinessData.JoinerContext;
import com.readypath.model.ReadinessData.JoinerSnapshot;
import com.readypath.model.ReadinessData.RecommendationSnapshot;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;

@Service
public class ReadinessKnowledgeService {

    private static final String HR_USER_ID = "hr-001";

    private static final String MANAGER_USER_ID = "manager-001";

    private static final String JOINER_USER_ID = "joiner-001";

    private static final String MAYA_JOINER_ID = "J-1001";

    /*
     * Authoritative joiner readiness state.
     *
     * The readiness score and readiness-area counts
     * are calculated by application rules rather than
     * by a language model.
     */
    private static final JoinerSnapshot MAYA = new JoinerSnapshot(
            MAYA_JOINER_ID,
            "Maya Sen",
            "TDI Java Engineer",
            "Bengaluru, India",
            MANAGER_USER_ID,
            "Arjun Rao",
            "29 Jul 2026",
            5,
            64,
            "ATTENTION",
            5,
            3,
            2,
            "Role access fulfilment",
            "Access Management");

    private static final List<BlockerSnapshot> MAYA_BLOCKERS = List.of(
            new BlockerSnapshot(
                    "BLK-ACCESS-1001",
                    MAYA_JOINER_ID,
                    "Role access fulfilment overdue",
                    """
                            Role-access request AG-3812 has exceeded
                            its expected fulfilment time by four days.
                            """.strip(),
                    "CRITICAL",
                    "Access Management",
                    "ROLE_ACCESS",
                    4,
                    """
                            Follow up with Access Management and
                            request a confirmed resolution date.
                            """.strip(),
                    List.of(
                            "EVD-ACCESS-1001")),

            new BlockerSnapshot(
                    "BLK-TRAINING-1001",
                    MAYA_JOINER_ID,
                    "Mandatory training incomplete",
                    """
                            Data Privacy and Protection training
                            remains incomplete.
                            """.strip(),
                    "MEDIUM",
                    "Maya Sen",
                    "TRAINING",
                    1,
                    """
                            Complete the remaining mandatory
                            LearningHub assignment.
                            """.strip(),
                    List.of(
                            "EVD-TRAINING-1001")));

    private static final Map<String, EvidenceSnapshot> EVIDENCE_BY_ID = Map.ofEntries(
            Map.entry(
                    "EVD-ACCESS-1001",
                    new EvidenceSnapshot(
                            "EVD-ACCESS-1001",
                            MAYA_JOINER_ID,
                            "Role access request pending",
                            "AccessHub",
                            "AG-3812",
                            """
                                    Awaiting Access Management fulfilment
                                    """.strip(),
                            "24 Jul 2026, 9:00 AM",
                            "PENDING")),

            Map.entry(
                    "EVD-MFA-1001",
                    new EvidenceSnapshot(
                            "EVD-MFA-1001",
                            MAYA_JOINER_ID,
                            "MFA registration pending",
                            "Security Registration",
                            "MFA-REG-29018",
                            """
                                    Registration initiated;
                                    confirmation pending
                                    """.strip(),
                            "24 Jul 2026, 9:00 AM",
                            "PENDING")),

            Map.entry(
                    "EVD-TRAINING-1001",
                    new EvidenceSnapshot(
                            "EVD-TRAINING-1001",
                            MAYA_JOINER_ID,
                            "Mandatory training incomplete",
                            "LearningHub",
                            "LH-ASSIGN-6214",
                            """
                                    Two of three mandatory courses completed
                                    """.strip(),
                            "24 Jul 2026, 9:00 AM",
                            "PENDING")),

            Map.entry(
                    "EVD-TEAM-1001",
                    new EvidenceSnapshot(
                            "EVD-TEAM-1001",
                            MAYA_JOINER_ID,
                            "First-week role plan pending",
                            "ReadyPath",
                            "TEAM-PLAN-1001",
                            """
                                    Buddy assigned; first-week role plan pending
                                    """.strip(),
                            "24 Jul 2026, 9:00 AM",
                            "PENDING")),

            Map.entry(
                    "EVD-IDENTITY-1001",
                    new EvidenceSnapshot(
                            "EVD-IDENTITY-1001",
                            MAYA_JOINER_ID,
                            "Primary identity created",
                            "Identity Management",
                            "IDENTITY-1001",
                            """
                                    Primary employee identity is active
                                    """.strip(),
                            "24 Jul 2026, 9:00 AM",
                            "COMPLETE")),

            Map.entry(
                    "EVD-DEVICE-1001",
                    new EvidenceSnapshot(
                            "EVD-DEVICE-1001",
                            MAYA_JOINER_ID,
                            "Device prepared",
                            "Technology Fulfilment",
                            "DEVICE-4821",
                            """
                                    Laptop configured and ready for collection
                                    """.strip(),
                            "24 Jul 2026, 9:00 AM",
                            "COMPLETE")));

    private static final RecommendationSnapshot MAYA_RECOMMENDATION = new RecommendationSnapshot(
            true,
            "REC-ACCESS-1001",
            MAYA_JOINER_ID,
            "Role access follow-up recommended",
            """
                    Maya joins in five days and her
                    role-access request is four days overdue.
                    """.strip(),
            """
                    Send a reminder to Access Management
                    referencing request AG-3812.
                    """.strip(),
            "Access Management",
            "PENDING_APPROVAL",
            List.of(
                    "EVD-ACCESS-1001"));

    /**
     * Returns joiners requiring attention within the
     * authenticated user's permitted scope.
     */
    public List<JoinerSnapshot> listJoinersNeedingAction(
            String persona,
            String userId) {
        if (!canAccessJoiner(
                persona,
                userId,
                MAYA_JOINER_ID)) {
            return List.of();
        }

        return List.of(MAYA);
    }

    /**
     * Returns the complete authoritative context required
     * to explain one joiner's readiness.
     */
    public JoinerContext getJoinerContext(
            String persona,
            String userId,
            String joinerReference) {
        Optional<JoinerSnapshot> resolvedJoiner = resolveJoiner(joinerReference);

        if (resolvedJoiner.isEmpty()) {
            return notFoundContext(
                    """
                            No joiner matched the supplied name
                            or identifier.
                            """.strip());
        }

        JoinerSnapshot joiner = resolvedJoiner.get();

        if (!canAccessJoiner(
                persona,
                userId,
                joiner.joinerId())) {
            return notFoundContext(
                    """
                            The requested joiner is outside the
                            current user's permitted scope.
                            """.strip());
        }

        List<EvidenceSnapshot> evidence = EVIDENCE_BY_ID
                .values()
                .stream()
                .filter(item -> item.joinerId()
                        .equals(
                                joiner.joinerId()))
                .sorted(
                        java.util.Comparator.comparing(
                                EvidenceSnapshot::evidenceId))
                .toList();

        return new JoinerContext(
                true,
                "Joiner readiness context found.",
                joiner,
                MAYA_BLOCKERS,
                evidence,
                MAYA_RECOMMENDATION);
    }

    /**
     * Returns the pending recommendation available for
     * human review.
     */
    public RecommendationSnapshot getPendingRecommendation(
            String persona,
            String userId,
            String joinerReference) {
        Optional<JoinerSnapshot> resolvedJoiner = resolveJoiner(joinerReference);

        if (resolvedJoiner.isEmpty()) {
            return noRecommendation();
        }

        JoinerSnapshot joiner = resolvedJoiner.get();

        if (!canAccessJoiner(
                persona,
                userId,
                joiner.joinerId())) {
            return noRecommendation();
        }

        return MAYA_RECOMMENDATION;
    }

    /**
     * Resolves verified evidence records.
     *
     * Unknown evidence IDs and records outside the
     * user's permitted scope are excluded.
     */
    public List<EvidenceSnapshot> findEvidenceByIds(
            String persona,
            String userId,
            List<String> evidenceIds) {
        if (evidenceIds == null ||
                evidenceIds.isEmpty()) {
            return List.of();
        }

        return evidenceIds
                .stream()
                .filter(id -> id != null &&
                        !id.isBlank())
                .distinct()
                .map(EVIDENCE_BY_ID::get)
                .filter(item -> item != null)
                .filter(item -> canAccessJoiner(
                        persona,
                        userId,
                        item.joinerId()))
                .toList();
    }

    /**
     * Returns one verified evidence record when the user
     * has access to its associated joiner.
     */
    public Optional<EvidenceSnapshot> getEvidence(
            String persona,
            String userId,
            String evidenceId) {
        if (evidenceId == null ||
                evidenceId.isBlank()) {
            return Optional.empty();
        }

        EvidenceSnapshot evidence = EVIDENCE_BY_ID.get(evidenceId);

        if (evidence == null ||
                !canAccessJoiner(
                        persona,
                        userId,
                        evidence.joinerId())) {
            return Optional.empty();
        }

        return Optional.of(evidence);
    }

    /**
     * Confirms that the persona and user combination
     * belongs to one of the application accounts.
     */
    public boolean isKnownUserScope(
            String persona,
            String userId) {
        if (persona == null ||
                userId == null) {
            return false;
        }

        String normalizedPersona = normalizePersona(persona);

        return switch (normalizedPersona) {
            case "HR" ->
                HR_USER_ID.equals(userId);

            case "MANAGER" ->
                MANAGER_USER_ID.equals(userId);

            case "JOINER" ->
                JOINER_USER_ID.equals(userId);

            default ->
                false;
        };
    }

    /**
     * Enforces joiner-level access.
     *
     * HR can access the portfolio.
     * The assigned manager can access their joiner.
     * The joiner can access only their own record.
     */
    public boolean canAccessJoiner(
            String persona,
            String userId,
            String joinerId) {
        if (!isKnownUserScope(
                persona,
                userId)) {
            return false;
        }

        if (joinerId == null ||
                !MAYA_JOINER_ID.equals(joinerId)) {
            return false;
        }

        String normalizedPersona = normalizePersona(persona);

        return switch (normalizedPersona) {
            case "HR" ->
                HR_USER_ID.equals(userId);

            case "MANAGER" ->
                MAYA.managerId()
                        .equals(userId);

            case "JOINER" ->
                JOINER_USER_ID.equals(userId);

            default ->
                false;
        };
    }

    /**
     * Validates that an action proposal refers to a
     * known, pending recommendation within the user's
     * permitted scope.
     */
    public boolean isPendingRecommendation(
            String persona,
            String userId,
            String joinerId,
            String recommendationId) {
        if (recommendationId == null ||
                recommendationId.isBlank()) {
            return false;
        }

        return canAccessJoiner(
                persona,
                userId,
                joinerId)
                && MAYA_RECOMMENDATION
                        .recommendationId()
                        .equals(recommendationId)

                && MAYA_RECOMMENDATION
                        .joinerId()
                        .equals(joinerId)

                && "PENDING_APPROVAL".equals(
                        MAYA_RECOMMENDATION
                                .approvalStatus());
    }

    /**
     * Returns one joiner when the caller has access.
     */
    public Optional<JoinerSnapshot> getJoiner(
            String persona,
            String userId,
            String joinerId) {
        if (canAccessJoiner(
                persona,
                userId,
                joinerId)) {
            return Optional.of(MAYA);
        }

        return Optional.empty();
    }

    /**
     * Resolves a joiner using either their identifier or
     * a supported name reference.
     */
    private Optional<JoinerSnapshot> resolveJoiner(
            String joinerReference) {
        if (joinerReference == null ||
                joinerReference.isBlank()) {
            return Optional.empty();
        }

        String normalizedReference = joinerReference
                .trim()
                .toLowerCase(Locale.ROOT);

        if (normalizedReference.equals(
                MAYA_JOINER_ID.toLowerCase(
                        Locale.ROOT))
                || normalizedReference.equals(
                        "maya sen")
                || normalizedReference.equals(
                        "maya")
                || normalizedReference.contains(
                        "maya sen")) {
            return Optional.of(MAYA);
        }

        return Optional.empty();
    }

    private JoinerContext notFoundContext(
            String message) {
        return new JoinerContext(
                false,
                message,
                null,
                List.of(),
                List.of(),
                noRecommendation());
    }

    private RecommendationSnapshot noRecommendation() {
        return new RecommendationSnapshot(
                false,
                null,
                null,
                null,
                null,
                null,
                null,
                "NOT_FOUND",
                List.of());
    }

    private String normalizePersona(
            String persona) {
        return persona == null
                ? ""
                : persona
                        .trim()
                        .toUpperCase(Locale.ROOT);
    }
}