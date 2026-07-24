package com.readypath.security;

public record ReadyPathPrincipal(
        String userId,
        String username,
        String displayName,
        String roleName,
        String persona,
        String subjectJoinerId) {
}