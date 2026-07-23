package com.readypath.controller;

import com.readypath.dto.AuditEvent;
import com.readypath.service.AuditService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/audit-events")
public class AuditController {

    private final AuditService auditService;

    public AuditController(
            AuditService auditService) {
        this.auditService = auditService;
    }

    @GetMapping
    public List<AuditEvent> findAll() {
        return auditService.findAll();
    }
}