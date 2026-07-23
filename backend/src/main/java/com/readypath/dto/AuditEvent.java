package com.readypath.dto;

import java.time.Instant;
import java.util.Map;

public record AuditEvent(
        String eventId,
        String eventType,
        String actor,
        String joinerId,
        String description,
        Instant occurredAt,
        Map<String, String> metadata) {
}