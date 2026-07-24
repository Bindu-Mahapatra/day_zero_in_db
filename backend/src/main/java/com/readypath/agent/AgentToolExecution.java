package com.readypath.agent;

public record AgentToolExecution(
        String toolName,
        String status,
        Object result) {
}