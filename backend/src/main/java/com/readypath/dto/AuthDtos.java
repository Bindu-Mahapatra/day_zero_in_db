package com.readypath.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import java.time.Instant;

public final class AuthDtos {

    private AuthDtos() {
    }

    public record LoginRequest(
            @NotBlank @Email String username,

            @NotBlank String password) {
    }

    public record AuthenticatedUserResponse(
            String userId,
            String username,
            String displayName,
            String roleName,
            String persona,
            String subjectJoinerId) {
    }

    public record LoginResponse(
            String token,
            String tokenType,
            Instant expiresAt,
            AuthenticatedUserResponse user) {
    }

    public record AuthenticationErrorResponse(
            String status,
            String message) {
    }
}