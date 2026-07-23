package com.readypath.service;

import com.readypath.dto.AssistantDtos.AssistantResponse;
import com.readypath.dto.AssistantDtos.Citation;
import com.readypath.dto.AssistantDtos.ProposedAction;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Locale;

@Service
public class AssistantService {

        private static final Citation ACCESS_EVIDENCE = new Citation(
                        "EVD-ACCESS-1001",
                        "Role access request pending",
                        "dbAccessGate",
                        "AG-3812",
                        "Awaiting Access Management fulfilment",
                        "21 Jul 2026, 4:20 PM");

        private static final Citation MFA_EVIDENCE = new Citation(
                        "EVD-MFA-1001",
                        "MFA registration pending",
                        "Security Registration",
                        "MFA-REG-29018",
                        "Registration initiated; confirmation pending",
                        "20 Jul 2026, 11:05 AM");

        private static final Citation TRAINING_EVIDENCE = new Citation(
                        "EVD-TRAINING-1001",
                        "Mandatory training incomplete",
                        "LearningHub",
                        "LH-ASSIGN-6214",
                        "Two of three mandatory courses completed",
                        "21 Jul 2026, 3:05 PM");

        public AssistantResponse answer(String rawQuery) {
                String query = rawQuery
                                .trim()
                                .toLowerCase(Locale.ROOT);

                if (query.contains("why")
                                && (query.contains("maya")
                                                || query.contains("not ready"))) {
                        return explainMaya();
                }

                if (query.contains("draft")
                                && (query.contains("reminder")
                                                || query.contains("access"))) {
                        return draftReminder();
                }

                if (query.contains("highest")
                                && query.contains("blocker")) {
                        return highestPriorityBlocker();
                }

                if (query.contains("bengaluru")
                                && query.contains("mfa")) {
                        return bengaluruMfa();
                }

                if (query.contains("action today")
                                || query.contains("need action")
                                || query.contains("needs attention")) {
                        return actionToday();
                }

                return fallback();
        }

        private AssistantResponse explainMaya() {
                return new AssistantResponse(
                                "Maya is not yet operationally ready",
                                """
                                                Maya's readiness is 64%.

                                                Five of ten readiness areas are complete, three are in progress and two are blocked.

                                                The primary blocker is Role Access. Request AG-3812 has exceeded its expected fulfilment time by four days.

                                                Maya must also complete MFA verification and one mandatory training assignment. Her manager must complete the first-week role plan.
                                                """,
                                List.of(
                                                ACCESS_EVIDENCE,
                                                MFA_EVIDENCE,
                                                TRAINING_EVIDENCE),
                                List.of(
                                                new ProposedAction(
                                                                "OPEN_JOINER",
                                                                "Open Maya's Joiner 360",
                                                                "J-1001",
                                                                null)),
                                """
                                                Explanation generated from deterministic readiness state and readiness evidence. Human review is required.
                                                """);
        }

        private AssistantResponse highestPriorityBlocker() {
                return new AssistantResponse(
                                "Access Management owns the highest-priority blocker",
                                """
                                                Maya Sen's Role Access request is the highest-priority blocker.

                                                It is classified as critical, has been open beyond its expected fulfilment time and is owned by Access Management.

                                                Recommended action: send an evidence-grounded reminder and escalate if unresolved after one business day.
                                                """,
                                List.of(ACCESS_EVIDENCE),
                                List.of(
                                                new ProposedAction(
                                                                "OPEN_JOINER",
                                                                "Review supporting evidence",
                                                                "J-1001",
                                                                null)),
                                "Blocker priority is based on structured severity and blocker-age rules.");
        }

        private AssistantResponse bengaluruMfa() {
                return new AssistantResponse(
                                "One Bengaluru joiner requires MFA follow-up",
                                """
                                                Maya Sen is based in Bengaluru and her MFA registration remains incomplete.

                                                The registration was initiated, but the final joiner confirmation step is still pending.
                                                """,
                                List.of(MFA_EVIDENCE),
                                List.of(
                                                new ProposedAction(
                                                                "OPEN_JOINER",
                                                                "Open Maya Sen",
                                                                "J-1001",
                                                                null)),
                                "Location and MFA status come from onboarding evidence.");
        }

        private AssistantResponse actionToday() {
                return new AssistantResponse(
                                "Maya Sen requires priority action today",
                                """
                                                Maya joins in five days and is currently 64% ready.

                                                Priority actions:

                                                1. Follow up with Access Management regarding AG-3812.
                                                2. Ask Maya to complete MFA verification.
                                                3. Ask Maya to complete Data Privacy training.
                                                4. Complete the manager-owned first-week role plan.
                                                """,
                                List.of(
                                                ACCESS_EVIDENCE,
                                                MFA_EVIDENCE,
                                                TRAINING_EVIDENCE),
                                List.of(
                                                new ProposedAction(
                                                                "OPEN_JOINER",
                                                                "Open Maya's Joiner 360",
                                                                "J-1001",
                                                                null)),
                                "Priority is determined from readiness status and proximity to joining date.");
        }

        private AssistantResponse draftReminder() {
                return new AssistantResponse(
                                "Reminder draft ready for approval",
                                """
                                                Subject: Follow-up required for onboarding access request AG-3812

                                                Hello Access Management,

                                                Maya Sen joins in five days. Her role-access request remains pending and has exceeded its expected fulfilment time.

                                                Please confirm the current status and expected resolution date. If additional information is required, route the request back to the hiring manager.

                                                Regards,
                                                Arjun Rao
                                                """,
                                List.of(ACCESS_EVIDENCE),
                                List.of(
                                                new ProposedAction(
                                                                "APPROVE_RECOMMENDATION",
                                                                "Approve reminder",
                                                                "J-1001",
                                                                "REC-ACCESS-1001"),
                                                new ProposedAction(
                                                                "OPEN_JOINER",
                                                                "Review supporting evidence",
                                                                "J-1001",
                                                                null)),
                                "AI-generated draft using readiness evidence. Human approval is required before sending.");
        }

        private AssistantResponse fallback() {
                return new AssistantResponse(
                                "Ask a readiness-specific question",
                                """
                                                Try one of these questions:

                                                - Which joiners need action today?
                                                - Why is Maya not ready?
                                                - Who owns the highest-priority blocker?
                                                - Show Bengaluru joiners missing MFA.
                                                - Draft a reminder for Maya's access request.
                                                """,
                                List.of(),
                                List.of(),
                                "This endpoint currently uses deterministic intent matching.");
        }
}
