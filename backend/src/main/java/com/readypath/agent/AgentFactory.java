package com.readypath.agent;

import com.google.adk.agents.LlmAgent;
import com.google.adk.models.Gemini;
import com.readypath.config.GeminiProperties;
import com.readypath.domain.AgentType;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.EnumMap;
import java.util.Map;
import java.util.Objects;

@Component
@RequiredArgsConstructor
public class AgentFactory {

    private static final Logger log = LoggerFactory.getLogger(AgentFactory.class);

    private final GeminiProperties geminiProperties;

    private final Map<AgentType, LlmAgent> agents =
            new EnumMap<>(AgentType.class);

    @PostConstruct
    public void initialize() {
        agents.put(AgentType.CANDIDATE_INSIGHT,
                buildAgent("insight-analyzer-agent", getCandidateInfoAnalyzerInstruction()));
        log.info("Initialized {} AI agents.", agents.size());
    }

    public LlmAgent getAgent(AgentType type) {
        LlmAgent agent = agents.get(type);
        if (Objects.isNull(agent)) {
            throw new IllegalArgumentException("Unsupported agent type: " + type);
        }
        return agent;
    }

    private LlmAgent buildAgent(String name, String instruction) {
        final Gemini geminiModel = Gemini.builder()
                .modelName(geminiProperties.getModel())
                .apiKey(geminiProperties.getApiKey())
                .build();

        return LlmAgent.builder()
                .name(name)
                .description("Candidate processing agent using Gemini")
                .instruction(instruction)
                .model(geminiModel)
                .build();
    }


    private String getCandidateInfoAnalyzerInstruction() {
        return """
                        You are ReadyPath AI, an enterprise onboarding readiness assistant.
                        Your task is to analyse onboarding readiness for all joiners and generate executive operational insights.
                
                        Instructions:
                
                        1. Analyse every joiner individually.
                        2. Identify common operational bottlenecks.
                        3. Look for patterns across all joiners.
                        4. Rank risks by business impact.
                        5. Prioritise issues affecting joiners whose joining date is near.
                        6. Never invent facts.
                        7. Use only the supplied candidate data.
                        8. Every conclusion must be evidence-backed.
                        9. Keep the summary concise and executive-friendly.
                
                        Return JSON using exactly this schema.
                
                        {
                          "headline": "",
                          "summary": "",
                          "topRisks":[
                            {
                              "rank":1,
                              "title":"",
                              "description":"",
                              "severity":"LOW|MEDIUM|HIGH|CRITICAL",
                              "affectedJoiners":0,
                              "candidateIds":[],
                              "confidence":0,
                              "recommendation":""
                            }
                          ]
                        }
                """;
    }
}

