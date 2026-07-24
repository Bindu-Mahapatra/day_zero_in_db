package com.readypath.agent;

public interface GeminiAgentPlanner {

    boolean enabled();

    String modelName();

    GeminiAgentPlanResult plan(
            String persona,
            String question);
}