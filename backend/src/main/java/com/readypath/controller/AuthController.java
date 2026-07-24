package com.readypath.controller;

import com.readypath.dto.AuthDtos.AuthenticatedUserResponse;
import com.readypath.dto.AuthDtos.AuthenticationErrorResponse;
import com.readypath.dto.AuthDtos.LoginRequest;
import com.readypath.dto.AuthDtos.LoginResponse;
import com.readypath.security.ReadyPathPrincipal;
import com.readypath.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private static final String BEARER_PREFIX = "Bearer ";

    private final AuthService authService;

    public AuthController(
            AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @Valid @RequestBody LoginRequest request) {
        return authService
                .login(
                        request.username(),
                        request.password())
                .<ResponseEntity<?>>map(result -> ResponseEntity.ok(
                        new LoginResponse(
                                result.token(),
                                "Bearer",
                                result.expiresAt(),
                                authService.toResponse(
                                        result.principal()))))
                .orElseGet(() -> ResponseEntity
                        .status(
                                HttpStatus.UNAUTHORIZED)
                        .body(
                                new AuthenticationErrorResponse(
                                        "INVALID_CREDENTIALS",
                                        """
                                                The username or password is incorrect.
                                                """.strip())));
    }

    @GetMapping("/me")
    public AuthenticatedUserResponse me(
            Authentication authentication) {
        return authService.toResponse(
                requirePrincipal(
                        authentication));
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(
            HttpServletRequest request) {
        String token = extractBearerToken(request);

        authService.logout(token);

        return ResponseEntity
                .noContent()
                .build();
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

    private String extractBearerToken(
            HttpServletRequest request) {
        String header = request.getHeader(
                "Authorization");

        if (header == null ||
                !header.startsWith(
                        BEARER_PREFIX)) {
            return null;
        }

        return header
                .substring(
                        BEARER_PREFIX.length())
                .trim();
    }
}