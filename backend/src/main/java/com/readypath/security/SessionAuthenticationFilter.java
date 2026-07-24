package com.readypath.security;

import com.readypath.service.AuthService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class SessionAuthenticationFilter
        extends OncePerRequestFilter {

    private static final String AUTHORIZATION_HEADER = "Authorization";

    private static final String BEARER_PREFIX = "Bearer ";

    private final AuthService authService;

    public SessionAuthenticationFilter(
            AuthService authService) {
        this.authService = authService;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {
        String token = extractBearerToken(request);

        if (token != null &&
                SecurityContextHolder
                        .getContext()
                        .getAuthentication() == null) {
            authService
                    .resolveSession(token)
                    .ifPresent(session -> authenticate(
                            request,
                            session
                                    .principal()));
        }

        filterChain.doFilter(
                request,
                response);
    }

    private void authenticate(
            HttpServletRequest request,
            ReadyPathPrincipal principal) {
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(
                "ROLE_" +
                        principal.persona());

        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                principal,
                null,
                List.of(authority));

        authentication.setDetails(
                new WebAuthenticationDetailsSource()
                        .buildDetails(request));

        SecurityContext context = SecurityContextHolder
                .createEmptyContext();

        context.setAuthentication(
                authentication);

        SecurityContextHolder.setContext(
                context);
    }

    private String extractBearerToken(
            HttpServletRequest request) {
        String header = request.getHeader(
                AUTHORIZATION_HEADER);

        if (header == null ||
                !header.startsWith(
                        BEARER_PREFIX)) {
            return null;
        }

        String token = header.substring(
                BEARER_PREFIX.length()).trim();

        return token.isBlank()
                ? null
                : token;
    }
}