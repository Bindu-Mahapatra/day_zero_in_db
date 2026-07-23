package com.readypath.dto;

import jakarta.validation.constraints.NotBlank;

import java.util.List;

public final class AssistantDtos {

    private AssistantDtos() {
    }

    public record AssistantQueryRequest(
            @NotBlank String query,
            @NotBlank String persona,
            @NotBlank String userId) {
    }

    public record Citation(
            String evidenceId,
            String title,
            String sourceSystem,
            String sourceReference,
            String observedValue,
            String capturedAt) {
    }

    public record ProposedAction(
            String actionType,
            String label,
            String joinerId,
            String recommendationId) {
    }

    public record AssistantResponse(
            String heading,
            String answer,
            List<Citation> citations,
            List<ProposedAction> actions,
            String disclaimer) {
    }
}