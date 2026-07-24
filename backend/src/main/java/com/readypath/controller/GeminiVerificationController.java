package com.readypath.controller;

import com.readypath.dto.GeminiDtos.VerificationResponse;
import com.readypath.gateway.GeminiCallResult;
import com.readypath.gateway.GeminiGateway;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/gemini")
public class GeminiVerificationController {

    private static final Logger LOGGER = LoggerFactory.getLogger(
            GeminiVerificationController.class);

    private static final String EXPECTED_MARKER = "READY_PATH_GEMINI_CONNECTED";

    private static final String VERIFICATION_PROMPT = """
            Return exactly the following text and nothing else:

            READY_PATH_GEMINI_CONNECTED
            """.strip();

    private final GeminiGateway geminiGateway;

    public GeminiVerificationController(
            GeminiGateway geminiGateway) {
        this.geminiGateway = geminiGateway;
    }

    @PostMapping("/verify")
    public ResponseEntity<VerificationResponse> verify() {
        if (!geminiGateway.enabled()) {
            return ResponseEntity
                    .status(
                            HttpStatus.SERVICE_UNAVAILABLE)
                    .body(
                            new VerificationResponse(
                                    "DISABLED",
                                    "GEMINI",
                                    geminiGateway
                                            .modelName(),
                                    null,
                                    0,
                                    """
                                            Gemini integration is disabled.
                                            """.strip()));
        }

        try {
            GeminiCallResult result = geminiGateway.generate(
                    VERIFICATION_PROMPT);

            boolean verified = result.text()
                    .contains(
                            EXPECTED_MARKER);

            if (!verified) {
                return ResponseEntity
                        .status(
                                HttpStatus.BAD_GATEWAY)
                        .body(
                                new VerificationResponse(
                                        "UNEXPECTED_RESPONSE",
                                        "GEMINI",
                                        result.model(),
                                        result.text(),
                                        result.latencyMs(),
                                        """
                                                Gemini responded, but the verification marker was not returned.
                                                """.strip()));
            }

            return ResponseEntity.ok(
                    new VerificationResponse(
                            "CONNECTED",
                            "GEMINI",
                            result.model(),
                            result.text(),
                            result.latencyMs(),
                            """
                                    Spring Boot successfully connected to Gemini through the GCP project.
                                    """.strip()));
        } catch (Exception exception) {
            LOGGER.error(
                    """
                            GEMINI_VERIFICATION_FAILED model={}
                            """.strip(),
                    geminiGateway.modelName(),
                    exception);

            return ResponseEntity
                    .status(
                            HttpStatus.SERVICE_UNAVAILABLE)
                    .body(
                            new VerificationResponse(
                                    "UNAVAILABLE",
                                    "GEMINI",
                                    geminiGateway
                                            .modelName(),
                                    null,
                                    0,
                                    """
                                            The Gemini request failed. Check the backend logs for the underlying GCP error.
                                            """
                                            .strip()));
        }
    }
}