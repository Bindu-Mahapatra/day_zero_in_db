package com.readypath.service;

import com.readypath.dto.AuditEvent;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.atomic.AtomicInteger;

@Service
public class AuditService {

    private final AtomicInteger sequence = new AtomicInteger(1);

    private final List<AuditEvent> events = new CopyOnWriteArrayList<>();

    public AuditEvent record(
            String eventType,
            String actor,
            String joinerId,
            String description,
            Map<String, String> metadata) {
        AuditEvent event = new AuditEvent(
                "AUD-%04d".formatted(sequence.getAndIncrement()),
                eventType,
                actor,
                joinerId,
                description,
                Instant.now(),
                Map.copyOf(metadata));

        events.add(0, event);

        return event;
    }

    public List<AuditEvent> findAll() {
        return new ArrayList<>(events);
    }

    public void reset() {
        events.clear();
        sequence.set(1);
    }
}