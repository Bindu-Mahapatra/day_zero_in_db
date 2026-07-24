package com.readypath.controller;

import com.readypath.dto.ActionDtos.ApprovalRequest;
import com.readypath.dto.ActionDtos.ApprovalResponse;
import com.readypath.security.ReadyPathPrincipal;
import com.readypath.service.ActionService;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/actions")
public class ActionController {

    private final ActionService actionService;

    public ActionController(
            ActionService actionService) {
        this.actionService = actionService;
    }

    @PostMapping("/approve")
    public ApprovalResponse approve(
            @Valid @RequestBody ApprovalRequest request,
            Authentication authentication) {
        ReadyPathPrincipal principal = (ReadyPathPrincipal) authentication.getPrincipal();

        ApprovalRequest securedRequest = new ApprovalRequest(
                request.joinerId(),
                request.recommendationId(),
                principal.displayName());

        return actionService.approve(
                securedRequest);
    }
}
