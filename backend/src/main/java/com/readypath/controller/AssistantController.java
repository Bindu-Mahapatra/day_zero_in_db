package com.readypath.controller;

import com.readypath.dto.AssistantDtos.AssistantQueryRequest;
import com.readypath.dto.AssistantDtos.AssistantResponse;
import com.readypath.service.AssistantService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/assistant")
public class AssistantController {

    private final AssistantService assistantService;

    public AssistantController(
            AssistantService assistantService) {
        this.assistantService = assistantService;
    }

    @PostMapping("/query")
    public AssistantResponse query(
            @Valid @RequestBody AssistantQueryRequest request) {
        return assistantService.answer(request.query());
    }
}