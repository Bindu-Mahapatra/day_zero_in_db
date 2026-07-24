package com.readypath.controller;

import com.readypath.dto.AgentDtos.AgentPlanRequest;
import com.readypath.dto.AgentDtos.AgentPlanResponse;
import com.readypath.security.ReadyPathPrincipal;
import com.readypath.service.AgentPlanningService;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/agent")
public class AgentPlanningController {

    private final AgentPlanningService planningService;

    public AgentPlanningController(
            AgentPlanningService planningService) {
        this.planningService = planningService;
    }

    @PostMapping("/plan")
    public AgentPlanResponse plan(
            @Valid @RequestBody AgentPlanRequest request,
            Authentication authentication) {
        ReadyPathPrincipal principal = requirePrincipal(
                authentication);

        return planningService
                .planAndExecute(
                        request.question(),
                        principal.persona(),
                        principal.userId());
    }

    private ReadyPathPrincipal requirePrincipal(
            Authentication authentication) {
        if (authentication == null ||
                !(authentication.getPrincipal() instanceof ReadyPathPrincipal principal)) {
            throw new IllegalStateException(
                    """
                            Authenticated ReadyPath principal is unavailable.
                            """.strip());
        }

        return principal;
    }
}