package com.readypath.service;

import com.readypath.dto.ActionDtos.ApprovalRequest;
import com.readypath.dto.ActionDtos.ApprovalResponse;
import com.readypath.dto.AuditEvent;
import com.readypath.dto.NotificationDtos.NotificationRequest;
import com.readypath.dto.NotificationDtos.NotificationResponse;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class ActionService {

    private final NotificationService notificationService;
    private final AuditService auditService;

    private final Set<String> approvedRecommendations = ConcurrentHashMap.newKeySet();

    public ActionService(
            NotificationService notificationService,
            AuditService auditService) {
        this.notificationService = notificationService;
        this.auditService = auditService;
    }

    public ApprovalResponse approve(ApprovalRequest request) {
        boolean firstApproval = approvedRecommendations.add(
                request.recommendationId());

        if (!firstApproval) {
            AuditEvent existingAction = auditService.record(
                    "DUPLICATE_APPROVAL_ATTEMPT",
                    request.approvedBy(),
                    request.joinerId(),
                    "Recommendation was already approved.",
                    Map.of(
                            "recommendationId",
                            request.recommendationId()));

            return new ApprovalResponse(
                    "ALREADY_APPROVED",
                    existingAction.eventId(),
                    null,
                    existingAction.occurredAt());
        }

        NotificationResponse notification = notificationService.send(
                new NotificationRequest(
                        "Access Management",
                        "Follow-up required for onboarding request AG-3812",
                        """
                                Maya Sen joins in five days. Her role-access request remains pending and has exceeded its expected fulfilment time.

                                Please confirm the current status and expected resolution date.
                                """,
                        request.joinerId(),
                        "dbAccessGate AG-3812"));

        AuditEvent auditEvent = auditService.record(
                "AI_RECOMMENDATION_APPROVED",
                request.approvedBy(),
                request.joinerId(),
                "Access reminder approved and notification sent.",
                Map.of(
                        "recommendationId",
                        request.recommendationId(),
                        "notificationId",
                        notification.notificationId(),
                        "evidenceReference",
                        "AG-3812"));

        return new ApprovalResponse(
                "APPROVED",
                auditEvent.eventId(),
                notification.notificationId(),
                Instant.now());
    }

    public void reset() {
        approvedRecommendations.clear();
    }
}