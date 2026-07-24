package com.readypath.gateway;

import java.util.List;

public record GeminiAssistantDraft(
        String heading,
        String answer,
        List<String> evidenceIds,
        List<String> actionTypes) {

    public GeminiAssistantDraft {
        evidenceIds = evidenceIds == null
                ? List.of()
                : List.copyOf(
                        evidenceIds);

        actionTypes = actionTypes == null
                ? List.of()
                : List.copyOf(
                        actionTypes);
    }
}