package com.readypath.dto;

import jakarta.validation.constraints.NotBlank;

import java.time.Instant;

public final class ActionDtos {

    private ActionDtos() {
    }

    public record ApprovalRequest(
            @NotBlank String joinerId,
            @NotBlank String recommendationId,
            @NotBlank String approvedBy) {
    }

    public record ApprovalResponse(
            String status,
            String auditEventId,
            String notificationId,
            Instant approvedAt) {
    }
}