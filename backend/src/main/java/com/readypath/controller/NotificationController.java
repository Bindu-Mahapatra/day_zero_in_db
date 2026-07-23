package com.readypath.controller;

import com.readypath.dto.NotificationDtos.NotificationRequest;
import com.readypath.dto.NotificationDtos.NotificationResponse;
import com.readypath.service.NotificationService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(
            NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @PostMapping("/send")
    public NotificationResponse send(
            @Valid @RequestBody NotificationRequest request) {
        return notificationService.send(request);
    }
}