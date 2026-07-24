package com.readypath.config;

import com.readypath.security.SessionAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import jakarta.servlet.http.HttpServletResponse;

@Configuration
public class SecurityConfiguration {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http,
            SessionAuthenticationFilter authenticationFilter) throws Exception {
        return http
                /*
                 * The API uses bearer tokens and does
                 * not use browser-cookie authentication.
                 */
                .csrf(
                        AbstractHttpConfigurer::disable)

                .cors(
                        Customizer.withDefaults())

                .sessionManagement(session -> session.sessionCreationPolicy(
                        SessionCreationPolicy.STATELESS))

                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/v1/auth/login")
                        .permitAll()

                        .requestMatchers(
                                "/api/v1/health",
                                "/actuator/health")
                        .permitAll()

                        .requestMatchers(
                                "/api/v1/actions/**",
                                "/api/v1/notifications/**")
                        .hasRole("MANAGER")

                        .requestMatchers(
                                "/api/v1/audit-events/**")
                        .hasAnyRole(
                                "HR",
                                "MANAGER")

                        .requestMatchers(
                                "/api/v1/gemini/**",
                                "/api/v1/agent/**")
                        .hasAnyRole(
                                "HR",
                                "MANAGER")

                        .anyRequest()
                        .authenticated())

                .exceptionHandling(exceptions -> exceptions
                        .authenticationEntryPoint(
                                (
                                        request,
                                        response,
                                        exception) -> {
                                    response.setStatus(
                                            HttpServletResponse.SC_UNAUTHORIZED);

                                    response.setContentType(
                                            MediaType.APPLICATION_JSON_VALUE);

                                    response.getWriter()
                                            .write(
                                                    """
                                                            {
                                                              "status": "UNAUTHORIZED",
                                                              "message": "Authentication is required."
                                                            }
                                                            """);
                                })

                        .accessDeniedHandler(
                                (
                                        request,
                                        response,
                                        exception) -> {
                                    response.setStatus(
                                            HttpServletResponse.SC_FORBIDDEN);

                                    response.setContentType(
                                            MediaType.APPLICATION_JSON_VALUE);

                                    response.getWriter()
                                            .write(
                                                    """
                                                            {
                                                              "status": "FORBIDDEN",
                                                              "message": "The authenticated user cannot access this resource."
                                                            }
                                                            """);
                                }))

                .addFilterBefore(
                        authenticationFilter,
                        UsernamePasswordAuthenticationFilter.class)

                .build();
    }
}