package com.readypath.dto;

import jakarta.validation.constraints.NotBlank;

import java.time.Instant;

public final class NotificationDtos {

    private NotificationDtos() {
    }

    public record NotificationRequest(
            @NotBlank String recipient,
            @NotBlank String subject,
            @NotBlank String message,
            String joinerId,
            String evidenceReference) {
    }

    public record NotificationResponse(
            String notificationId,
            String status,
            String recipient,
            Instant sentAt) {
    }
}