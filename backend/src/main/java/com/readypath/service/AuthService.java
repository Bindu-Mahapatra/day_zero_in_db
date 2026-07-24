package com.readypath.service;

import com.readypath.dto.AuthDtos.AuthenticatedUserResponse;
import com.readypath.security.ReadyPathPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.Duration;
import java.time.Instant;
import java.util.Base64;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class AuthService {

    private static final Duration SESSION_TTL = Duration.ofHours(8);

    private static final int TOKEN_BYTES = 32;

    private final Map<String, Account> accounts;

    private final Map<String, SessionDetails> sessions = new ConcurrentHashMap<>();

    private final SecureRandom secureRandom = new SecureRandom();

    public AuthService(
            PasswordEncoder passwordEncoder) {
        /*
         * These fixed accounts are temporary application
         * accounts. Authentication can later be replaced
         * with the approved enterprise identity provider.
         */
        this.accounts = Map.of(
                "hr@readypath.com",
                new Account(
                        new ReadyPathPrincipal(
                                "hr-001",
                                "hr@readypath.com",
                                "Priya Mehta",
                                "HR Business Partner",
                                "HR",
                                null),
                        passwordEncoder.encode(
                                "Hr@123")),

                "manager@readypath.com",
                new Account(
                        new ReadyPathPrincipal(
                                "manager-001",
                                "manager@readypath.com",
                                "Arjun Rao",
                                "Engineering Manager",
                                "MANAGER",
                                null),
                        passwordEncoder.encode(
                                "Manager@123")),

                "maya.sen@readypath.com",
                new Account(
                        new ReadyPathPrincipal(
                                "joiner-001",
                                "maya.sen@readypath.com",
                                "Maya Sen",
                                "TDI Java Engineer",
                                "JOINER",
                                "J-1001"),
                        passwordEncoder.encode(
                                "Joiner@123")));

        this.passwordEncoder = passwordEncoder;
    }

    private final PasswordEncoder passwordEncoder;

    public Optional<LoginResult> login(
            String username,
            String password) {
        if (username == null ||
                password == null) {
            return Optional.empty();
        }

        String normalizedUsername = username
                .trim()
                .toLowerCase(Locale.ROOT);

        Account account = accounts.get(
                normalizedUsername);

        if (account == null ||
                !passwordEncoder.matches(
                        password,
                        account.passwordHash())) {
            return Optional.empty();
        }

        removeExpiredSessions();

        String token = generateToken();

        Instant expiresAt = Instant.now()
                .plus(SESSION_TTL);

        SessionDetails session = new SessionDetails(
                token,
                account.principal(),
                expiresAt);

        sessions.put(
                token,
                session);

        return Optional.of(
                new LoginResult(
                        token,
                        expiresAt,
                        account.principal()));
    }

    public Optional<SessionDetails> resolveSession(
            String token) {
        if (token == null ||
                token.isBlank()) {
            return Optional.empty();
        }

        SessionDetails session = sessions.get(token);

        if (session == null) {
            return Optional.empty();
        }

        if (session.expiresAt()
                .isBefore(Instant.now())) {
            sessions.remove(token);

            return Optional.empty();
        }

        return Optional.of(session);
    }

    public void logout(
            String token) {
        if (token != null &&
                !token.isBlank()) {
            sessions.remove(token);
        }
    }

    public AuthenticatedUserResponse toResponse(
            ReadyPathPrincipal principal) {
        return new AuthenticatedUserResponse(
                principal.userId(),
                principal.username(),
                principal.displayName(),
                principal.roleName(),
                principal.persona(),
                principal.subjectJoinerId());
    }

    private String generateToken() {
        byte[] tokenBytes = new byte[TOKEN_BYTES];

        secureRandom.nextBytes(
                tokenBytes);

        return Base64
                .getUrlEncoder()
                .withoutPadding()
                .encodeToString(tokenBytes);
    }

    private void removeExpiredSessions() {
        Instant now = Instant.now();

        sessions.entrySet()
                .removeIf(entry -> entry.getValue()
                        .expiresAt()
                        .isBefore(now));
    }

    private record Account(
            ReadyPathPrincipal principal,
            String passwordHash) {
    }

    public record LoginResult(
            String token,
            Instant expiresAt,
            ReadyPathPrincipal principal) {
    }

    public record SessionDetails(
            String token,
            ReadyPathPrincipal principal,
            Instant expiresAt) {
    }
}