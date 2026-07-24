package com.readypath.service;

import com.readypath.dto.AssistantDtos.AssistantResponse;
import com.readypath.dto.AssistantDtos.Citation;
import com.readypath.dto.AssistantDtos.ProposedAction;
import com.readypath.model.ReadinessData.EvidenceSnapshot;
import com.readypath.model.ReadinessData.JoinerContext;
import com.readypath.model.ReadinessData.RecommendationSnapshot;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Locale;

@Service
public class DeterministicAssistantService {

        private static final String READINESS_DISCLAIMER = """
                        Explanation generated from deterministic readiness state and verified readiness evidence. Human review is required.
                        """
                        .strip();

        private static final String APPROVAL_DISCLAIMER = """
                        Draft generated from verified readiness evidence. Human approval is required before sending.
                        """.strip();

        private final ReadinessKnowledgeService knowledgeService;

        public DeterministicAssistantService(
                        ReadinessKnowledgeService knowledgeService) {
                this.knowledgeService = knowledgeService;
        }

        public AssistantResponse answer(
                        String rawQuery,
                        String persona,
                        String userId) {
                /*
                 * Authorization must happen before returning
                 * readiness data or invoking any future AI model.
                 */
                if (!knowledgeService.isKnownUserScope(
                                persona,
                                userId)) {
                        return accessDenied();
                }

                String query = normalize(rawQuery);

                if (query.contains("DRAFT") &&
                                query.contains("REMINDER")) {
                        return reminderDraft(
                                        persona,
                                        userId);
                }

                if (query.contains("WHY") &&
                                (query.contains("MAYA") ||
                                                query.contains("J-1001"))) {
                        return mayaReadinessExplanation(
                                        persona,
                                        userId);
                }

                if (query.contains("HIGHEST") &&
                                query.contains("BLOCKER")) {
                        return highestBlocker(
                                        persona,
                                        userId);
                }

                if (query.contains("MFA")) {
                        return mfaSummary(
                                        persona,
                                        userId);
                }

                if (query.contains("ACTION") &&
                                query.contains("TODAY")) {
                        return priorityActionToday(
                                        persona,
                                        userId);
                }

                return defaultResponse();
        }

        private AssistantResponse mayaReadinessExplanation(
                        String persona,
                        String userId) {
                JoinerContext context = knowledgeService.getJoinerContext(
                                persona,
                                userId,
                                "Maya Sen");

                if (!context.found()) {
                        return informationUnavailable(
                                        context.message());
                }

                var joiner = context.joiner();

                String answer = """
                                %s's readiness is %d%%.

                                %d of ten readiness areas are complete, %d are in progress and %d are blocked.

                                The primary blocker is Role Access. Request AG-3812 has exceeded its expected fulfilment time by four days.

                                MFA verification and one mandatory training assignment are also pending. The manager must complete the first-week role plan.
                                """
                                .formatted(
                                                joiner.displayName(),
                                                joiner.readinessScore(),
                                                joiner.completedAreas(),
                                                joiner.inProgressAreas(),
                                                joiner.blockedAreas())
                                .strip();

                return new AssistantResponse(
                                "Maya is not yet operationally ready",
                                answer,
                                verifiedCitations(
                                                persona,
                                                userId,
                                                List.of(
                                                                "EVD-ACCESS-1001",
                                                                "EVD-MFA-1001",
                                                                "EVD-TRAINING-1001")),
                                List.of(
                                                new ProposedAction(
                                                                "OPEN_JOINER",
                                                                "Open Maya's Joiner 360",
                                                                "J-1001",
                                                                null)),
                                READINESS_DISCLAIMER);
        }

        private AssistantResponse reminderDraft(
                        String persona,
                        String userId) {
                RecommendationSnapshot recommendation = knowledgeService.getPendingRecommendation(
                                persona,
                                userId,
                                "Maya Sen");

                if (!recommendation.found()) {
                        return informationUnavailable(
                                        """
                                                        No pending recommendation is available within the current user's permitted scope.
                                                        """
                                                        .strip());
                }

                String answer = """
                                Subject: Follow-up required for onboarding access request AG-3812

                                Hello Access Management,

                                Maya Sen joins in five days. Her role-access request remains pending and has exceeded its expected fulfilment time by four days.

                                Please confirm the current status and expected resolution date. If additional information is required, route the request back to the hiring manager.

                                Regards,
                                Arjun Rao
                                """
                                .strip();

                return new AssistantResponse(
                                "Reminder draft ready for approval",
                                answer,
                                verifiedCitations(
                                                persona,
                                                userId,
                                                recommendation.evidenceIds()),
                                List.of(
                                                new ProposedAction(
                                                                "APPROVE_RECOMMENDATION",
                                                                "Approve reminder",
                                                                recommendation.joinerId(),
                                                                recommendation.recommendationId()),
                                                new ProposedAction(
                                                                "OPEN_JOINER",
                                                                "Review supporting evidence",
                                                                recommendation.joinerId(),
                                                                null)),
                                APPROVAL_DISCLAIMER);
        }

        private AssistantResponse highestBlocker(
                        String persona,
                        String userId) {
                JoinerContext context = knowledgeService.getJoinerContext(
                                persona,
                                userId,
                                "Maya Sen");

                if (!context.found()) {
                        return informationUnavailable(
                                        context.message());
                }

                return new AssistantResponse(
                                "Role access is the highest-priority blocker",
                                """
                                                Maya's role-access request AG-3812 is the highest-priority blocker.

                                                It is four days overdue, prevents role readiness and is owned by Access Management.
                                                """
                                                .strip(),
                                verifiedCitations(
                                                persona,
                                                userId,
                                                List.of(
                                                                "EVD-ACCESS-1001")),
                                List.of(
                                                new ProposedAction(
                                                                "OPEN_JOINER",
                                                                "Review Maya's readiness",
                                                                "J-1001",
                                                                null)),
                                READINESS_DISCLAIMER);
        }

        private AssistantResponse mfaSummary(
                        String persona,
                        String userId) {
                if (!knowledgeService.canAccessJoiner(
                                persona,
                                userId,
                                "J-1001")) {
                        return accessDenied();
                }

                return new AssistantResponse(
                                "MFA verification remains pending",
                                """
                                                Maya's MFA registration has been initiated, but confirmation remains pending.

                                                The remaining registration step is owned by Maya.
                                                """
                                                .strip(),
                                verifiedCitations(
                                                persona,
                                                userId,
                                                List.of(
                                                                "EVD-MFA-1001")),
                                List.of(
                                                new ProposedAction(
                                                                "OPEN_JOINER",
                                                                "Open Maya's Joiner 360",
                                                                "J-1001",
                                                                null)),
                                READINESS_DISCLAIMER);
        }

        private AssistantResponse priorityActionToday(
                        String persona,
                        String userId) {
                RecommendationSnapshot recommendation = knowledgeService.getPendingRecommendation(
                                persona,
                                userId,
                                "Maya Sen");

                if (!recommendation.found()) {
                        return informationUnavailable(
                                        """
                                                        No pending action is available within the current user's permitted scope.
                                                        """
                                                        .strip());
                }

                return new AssistantResponse(
                                "The access reminder is the priority action today",
                                """
                                                The priority action today is to follow up with Access Management on request AG-3812.

                                                The request is four days overdue and is the primary blocker preventing Maya from becoming role-ready.
                                                """
                                                .strip(),
                                verifiedCitations(
                                                persona,
                                                userId,
                                                recommendation.evidenceIds()),
                                List.of(
                                                new ProposedAction(
                                                                "APPROVE_RECOMMENDATION",
                                                                "Approve reminder",
                                                                recommendation.joinerId(),
                                                                recommendation.recommendationId())),
                                APPROVAL_DISCLAIMER);
        }

        private List<Citation> verifiedCitations(
                        String persona,
                        String userId,
                        List<String> evidenceIds) {
                return knowledgeService
                                .findEvidenceByIds(
                                                persona,
                                                userId,
                                                evidenceIds)
                                .stream()
                                .map(this::toCitation)
                                .toList();
        }

        private Citation toCitation(
                        EvidenceSnapshot evidence) {
                return new Citation(
                                evidence.evidenceId(),
                                evidence.title(),
                                evidence.sourceSystem(),
                                evidence.sourceReference(),
                                evidence.observedValue(),
                                evidence.capturedAt());
        }

        private AssistantResponse defaultResponse() {
                return new AssistantResponse(
                                "ReadyPath can answer readiness questions",
                                """
                                                Ask about a joiner's readiness, highest-priority blocker, supporting evidence, task ownership or a recommended follow-up action.
                                                """
                                                .strip(),
                                List.of(),
                                List.of(),
                                READINESS_DISCLAIMER);
        }

        private AssistantResponse accessDenied() {
                return new AssistantResponse(
                                "Information unavailable",
                                """
                                                The requested onboarding information is outside the current user's permitted scope.
                                                """
                                                .strip(),
                                List.of(),
                                List.of(),
                                """
                                                ReadyPath only returns readiness information available to the authenticated user's role.
                                                """
                                                .strip());
        }

        private AssistantResponse informationUnavailable(
                        String message) {
                return new AssistantResponse(
                                "Information unavailable",
                                message,
                                List.of(),
                                List.of(),
                                """
                                                No readiness data was returned outside the current user's permitted scope.
                                                """
                                                .strip());
        }

        private String normalize(
                        String value) {
                return value == null
                                ? ""
                                : value
                                                .trim()
                                                .toUpperCase(Locale.ROOT);
        }
}