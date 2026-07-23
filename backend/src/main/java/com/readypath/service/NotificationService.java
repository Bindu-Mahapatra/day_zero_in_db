package com.readypath.service;

import com.readypath.dto.NotificationDtos.NotificationRequest;
import com.readypath.dto.NotificationDtos.NotificationResponse;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.concurrent.atomic.AtomicInteger;

@Service
public class NotificationService {

    private final AtomicInteger sequence = new AtomicInteger(1);

    public NotificationResponse send(NotificationRequest request) {
        String notificationId = "NTF-%04d".formatted(sequence.getAndIncrement());

        Instant sentAt = Instant.now();

        /*
         * Notification adapter.
         *
         * This can later call Teams, Outlook,
         * ServiceNow or another approved channel.
         */
        System.out.println();
        System.out.println("========================================");
        System.out.println("NOTIFICATION SENT");
        System.out.println("Notification ID: " + notificationId);
        System.out.println("To: " + request.recipient());
        System.out.println("Subject: " + request.subject());
        System.out.println("Message: " + request.message());
        System.out.println("Joiner: " + request.joinerId());
        System.out.println(
                "Evidence: " + request.evidenceReference());
        System.out.println("========================================");
        System.out.println();

        return new NotificationResponse(
                notificationId,
                "SENT",
                request.recipient(),
                sentAt);
    }
}