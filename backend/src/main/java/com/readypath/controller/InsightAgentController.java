package com.readypath.controller;

import com.readypath.dto.request.CandidateInfoRequest;
import com.readypath.dto.response.HealthResponse;
import com.readypath.dto.response.InsightDataResponse;
import com.readypath.service.InsightAgentProcessingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/1.0.0/candidate")
@RequiredArgsConstructor
public class InsightAgentController {

    private final InsightAgentProcessingService insightAgentProcessingService;

    @PostMapping(path = "/analyze-candidate-info", consumes = "application/json", produces = "application/json")
    public ResponseEntity<InsightDataResponse> analyzeCandidateInfo(@RequestBody final CandidateInfoRequest candidateInfo) {
        log.debug("Received request to analyze candidate info: {}", candidateInfo);
        final InsightDataResponse insightData = insightAgentProcessingService.processCandidateInformation(candidateInfo);
        return ResponseEntity.ok(insightData);
    }

    @GetMapping(path = "/health", produces = "application/json")
    public ResponseEntity<HealthResponse> health() {
        return ResponseEntity.ok(new HealthResponse("UP", "Candidate Analyzer Agent"));
    }
}

