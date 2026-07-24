package com.readypath.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.adk.agents.LlmAgent;
import com.google.genai.types.Content;
import com.google.genai.types.Part;
import com.readypath.agent.AgentExecutionService;
import com.readypath.agent.AgentFactory;
import com.readypath.domain.AgentType;
import com.readypath.dto.request.CandidateInfoRequest;
import com.readypath.dto.response.CandidateInsightResponse;
import com.readypath.dto.response.InsightDataResponse;
import com.readypath.exception.CandidateInfoProcessingException;
import com.readypath.util.JsonNormalizer;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
@Slf4j
public class InsightAgentProcessingService {

    private final AgentFactory agentFactory;
    private final AgentExecutionService agentExecutionService;
    private final JsonNormalizer jsonNormalizer;
    private final ObjectMapper objectMapper;

    public InsightAgentProcessingService(
            AgentFactory agentFactory,
            AgentExecutionService agentExecutionService,
            JsonNormalizer jsonNormalizer,
            ObjectMapper objectMapper) {
        this.agentFactory = agentFactory;
        this.agentExecutionService = agentExecutionService;
        this.jsonNormalizer = jsonNormalizer;
        this.objectMapper = objectMapper;
    }

    public InsightDataResponse processCandidateInformation(final CandidateInfoRequest candidateInfo) {
        long startTime = System.currentTimeMillis();
        try {
            final String candidateInfoJson = objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(candidateInfo);
            final LlmAgent candidateInsightAgent = agentFactory.getAgent(AgentType.CANDIDATE_INSIGHT);
            final Content content = Content.fromParts(Part.fromText(candidateInfoJson));
            final String agentResponse = agentExecutionService.execute(candidateInsightAgent, content);
            final CandidateInsightResponse candidateInsight = parseCandidateInsight(agentResponse);

            long processingTime = System.currentTimeMillis() - startTime;
            log.info("Candidate analyzer processing completed in {} ms", processingTime);

            return new InsightDataResponse(candidateInsight, Instant.now(), processingTime);

        } catch (Exception e) {
            log.error("Error processing candidate information", e);
            throw new CandidateInfoProcessingException("Failed to process candidate information", e);
        }
    }

    private CandidateInsightResponse parseCandidateInsight(final String agentResponse) {
        final String normalizedAgentResponse = jsonNormalizer.normalize(agentResponse);
        try {
            return objectMapper.readValue(normalizedAgentResponse, CandidateInsightResponse.class);
        } catch (Exception ex) {
            throw new CandidateInfoProcessingException("Failed to parse candidate insight response", ex);
        }
    }
}
