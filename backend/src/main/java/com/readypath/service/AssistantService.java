package com.readypath.service;

import com.readypath.agent.AgentToolExecution;
import com.readypath.config.GeminiProperties;
import com.readypath.dto.AgentDtos.AgentPlanResponse;
import com.readypath.dto.AssistantDtos.AssistantResponse;
import com.readypath.dto.AssistantDtos.Citation;
import com.readypath.dto.AssistantDtos.ProposedAction;
import com.readypath.gateway.GeminiAssistantDraft;
import com.readypath.gateway.GeminiAssistantRequest;
import com.readypath.gateway.GeminiAssistantResult;
import com.readypath.gateway.GeminiGateway;
import com.readypath.model.ReadinessData.BlockerSnapshot;
import com.readypath.model.ReadinessData.EvidenceSnapshot;
import com.readypath.model.ReadinessData.JoinerContext;
import com.readypath.model.ReadinessData.RecommendationSnapshot;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Locale;
import java.util.Set;

@Service
public class AssistantService {

        private static final Logger LOGGER = LoggerFactory.getLogger(
                        AssistantService.class);

        private static final String AGENT_READINESS_DISCLAIMER = """
                        AI-generated explanation grounded in authorized
                        backend tool results and verified readiness
                        evidence. Human review is required.
                        """.strip();

        private static final String AGENT_APPROVAL_DISCLAIMER = """
                        AI-generated draft grounded in authorized backend
                        tool results and verified readiness evidence.
                        Human approval is required before sending.
                        """.strip();

        private static final String STRUCTURED_READINESS_DISCLAIMER = """
                        AI-generated explanation grounded in verified
                        readiness evidence. Human review is required.
                        """.strip();

        private static final String STRUCTURED_APPROVAL_DISCLAIMER = """
                        AI-generated draft grounded in verified readiness
                        evidence. Human approval is required before sending.
                        """.strip();

        private final GeminiGateway geminiGateway;

        private final GeminiProperties geminiProperties;

        private final ReadinessKnowledgeService knowledgeService;

        private final DeterministicAssistantService fallbackService;

        private final AgentPlanningService agentPlanningService;

        private final ObjectMapper jsonMapper;

        public AssistantService(
                        GeminiGateway geminiGateway,
                        GeminiProperties geminiProperties,
                        ReadinessKnowledgeService knowledgeService,
                        DeterministicAssistantService fallbackService,
                        AgentPlanningService agentPlanningService,
                        ObjectMapper jsonMapper) {
                this.geminiGateway = geminiGateway;

                this.geminiProperties = geminiProperties;

                this.knowledgeService = knowledgeService;

                this.fallbackService = fallbackService;

                this.agentPlanningService = agentPlanningService;

                this.jsonMapper = jsonMapper;
        }

        public AssistantResponse answer(
                        String query,
                        String persona,
                        String userId) {
                /*
                 * Authorization always happens before:
                 *
                 * - agent planning;
                 * - backend tool execution;
                 * - Gemini answer generation;
                 * - deterministic fallback.
                 */
                if (!knowledgeService.isKnownUserScope(
                                persona,
                                userId)) {
                        LOGGER.warn(
                                        """
                                                        READY_PATH_ACCESS_DENIED
                                                        persona={}
                                                        userId={}
                                                        """.strip(),
                                        persona,
                                        userId);

                        return accessDenied();
                }

                if (query == null ||
                                query.isBlank()) {
                        return invalidQuestion();
                }

                if (!geminiGateway.enabled()) {
                        return deterministicFallback(
                                        query,
                                        persona,
                                        userId,
                                        "GEMINI_DISABLED");
                }

                if (!geminiProperties
                                .isAssistantEnabled()) {
                        return deterministicFallback(
                                        query,
                                        persona,
                                        userId,
                                        "GEMINI_ASSISTANT_DISABLED");
                }

                /*
                 * Preferred path:
                 *
                 * Gemini plan
                 * → authorized Java tools
                 * → Gemini final answer.
                 */
                if (geminiProperties
                                .isAgentEnabled()) {
                        try {
                                return answerUsingAgent(
                                                query,
                                                persona,
                                                userId);
                        } catch (Exception exception) {
                                LOGGER.error(
                                                """
                                                                READY_PATH_AGENT_ANSWER_FAILED
                                                                persona={}
                                                                userId={}
                                                                exceptionType={}
                                                                exceptionMessage={}
                                                                """,
                                                normalizePersona(persona),
                                                userId,
                                                exception
                                                                .getClass()
                                                                .getName(),
                                                exception.getMessage(),
                                                exception);
                        }
                }

                /*
                 * First fallback:
                 *
                 * Use the previously working structured Gemini
                 * flow with a scoped preloaded context.
                 */
                try {
                        return answerUsingStructuredContext(
                                        query,
                                        persona,
                                        userId);
                } catch (Exception exception) {
                        LOGGER.error(
                                        """
                                                        READY_PATH_STRUCTURED_ANSWER_FAILED
                                                        persona={}
                                                        userId={}
                                                        exceptionType={}
                                                        exceptionMessage={}
                                                        """,
                                        normalizePersona(persona),
                                        userId,
                                        exception
                                                        .getClass()
                                                        .getName(),
                                        exception.getMessage(),
                                        exception);
                }

                /*
                 * Final fallback:
                 *
                 * No Gemini call is required.
                 */
                return deterministicFallback(
                                query,
                                persona,
                                userId,
                                "AGENT_AND_STRUCTURED_GEMINI_FAILED");
        }

        private AssistantResponse answerUsingAgent(
                        String query,
                        String persona,
                        String userId) throws Exception {
                LOGGER.info(
                                """
                                                READY_PATH_AGENT_ANSWER_START
                                                model={}
                                                persona={}
                                                """.strip(),
                                geminiGateway.modelName(),
                                normalizePersona(persona));

                AgentPlanResponse planResponse = agentPlanningService
                                .planAndExecute(
                                                query,
                                                persona,
                                                userId);

                if (!"SUCCESS".equals(
                                planResponse.status())) {
                        throw new IllegalStateException(
                                        """
                                                        Agent planning did not complete successfully.
                                                        Status: %s
                                                        """.formatted(
                                                        planResponse.status()).strip());
                }

                if (planResponse.toolResults() == null ||
                                planResponse
                                                .toolResults()
                                                .isEmpty()) {
                        throw new IllegalStateException(
                                        """
                                                        The agent plan produced no backend tool results.
                                                        """.strip());
                }

                Grounding grounding = extractGrounding(
                                planResponse.toolResults());

                String toolResultsJson = jsonMapper.writeValueAsString(
                                planResponse.toolResults());

                GeminiAssistantRequest request = new GeminiAssistantRequest(
                                normalizePersona(persona),
                                query.strip(),
                                toolResultsJson);

                GeminiAssistantResult result = geminiGateway.generateAssistant(
                                request);

                AssistantResponse response = validateAndMap(
                                result.draft(),
                                query,
                                persona,
                                userId,
                                grounding,
                                true);

                LOGGER.info(
                                """
                                                READY_PATH_ASSISTANT_ENGINE=GEMINI_AGENT
                                                model={}
                                                planningLatencyMs={}
                                                answerLatencyMs={}
                                                toolCount={}
                                                citationCount={}
                                                actionCount={}
                                                """.strip(),
                                result.model(),
                                planResponse.planningLatencyMs(),
                                result.latencyMs(),
                                planResponse.toolResults().size(),
                                response.citations().size(),
                                response.actions().size());

                return response;
        }

        private AssistantResponse answerUsingStructuredContext(
                        String query,
                        String persona,
                        String userId) throws Exception {
                LOGGER.info(
                                """
                                                READY_PATH_STRUCTURED_GEMINI_FALLBACK_START
                                                model={}
                                                persona={}
                                                """.strip(),
                                geminiGateway.modelName(),
                                normalizePersona(persona));

                JoinerContext context = resolveContext(
                                query,
                                persona,
                                userId);

                if (!context.found()) {
                        return informationUnavailable(
                                        context.message());
                }

                String contextJson = jsonMapper.writeValueAsString(
                                context);

                GeminiAssistantRequest request = new GeminiAssistantRequest(
                                normalizePersona(persona),
                                query.strip(),
                                contextJson);

                GeminiAssistantResult result = geminiGateway.generateAssistant(
                                request);

                Grounding grounding = groundingFromJoinerContext(
                                context);

                AssistantResponse response = validateAndMap(
                                result.draft(),
                                query,
                                persona,
                                userId,
                                grounding,
                                false);

                LOGGER.info(
                                """
                                                READY_PATH_ASSISTANT_ENGINE=GEMINI_STRUCTURED_FALLBACK
                                                model={}
                                                latencyMs={}
                                                citationCount={}
                                                actionCount={}
                                                """.strip(),
                                result.model(),
                                result.latencyMs(),
                                response.citations().size(),
                                response.actions().size());

                return response;
        }

        private AssistantResponse validateAndMap(
                        GeminiAssistantDraft draft,
                        String query,
                        String persona,
                        String userId,
                        Grounding grounding,
                        boolean agentFlow) {
                if (draft == null) {
                        throw new IllegalStateException(
                                        """
                                                        Gemini returned a null assistant draft.
                                                        """.strip());
                }

                if (isBlank(draft.heading()) ||
                                isBlank(draft.answer())) {
                        throw new IllegalStateException(
                                        """
                                                        Gemini returned an incomplete assistant draft.
                                                        """.strip());
                }

                List<EvidenceSnapshot> verifiedEvidence = resolveVerifiedEvidence(
                                draft,
                                persona,
                                userId,
                                grounding);

                if (requiresEvidence(query) &&
                                verifiedEvidence.isEmpty()) {
                        throw new IllegalStateException(
                                        """
                                                        Gemini did not return verified evidence for
                                                        an evidence-dependent question.
                                                        """.strip());
                }

                List<Citation> citations = verifiedEvidence
                                .stream()
                                .map(this::toCitation)
                                .toList();

                List<ProposedAction> actions = sanitizeActions(
                                draft.actionTypes(),
                                query,
                                persona,
                                userId,
                                grounding);

                boolean approvalIncluded = actions.stream()
                                .anyMatch(action -> "APPROVE_RECOMMENDATION"
                                                .equals(
                                                                action.actionType()));

                String disclaimer = selectDisclaimer(
                                agentFlow,
                                approvalIncluded);

                return new AssistantResponse(
                                draft.heading().strip(),
                                draft.answer().strip(),
                                citations,
                                actions,
                                disclaimer);
        }

        private Grounding extractGrounding(
                        List<AgentToolExecution> executions) {
                JoinerContext joinerContext = null;

                RecommendationSnapshot recommendation = null;

                Set<String> evidenceIds = new LinkedHashSet<>();

                for (AgentToolExecution execution : executions) {
                        if (execution == null ||
                                        !"SUCCESS".equals(
                                                        execution.status())) {
                                continue;
                        }

                        Object result = execution.result();

                        if (result instanceof JoinerContext context) {
                                if (context.found()) {
                                        joinerContext = context;
                                }

                                collectContextEvidence(
                                                context,
                                                evidenceIds);

                                if (context.recommendation() != null &&
                                                context
                                                                .recommendation()
                                                                .found()) {
                                        recommendation = context.recommendation();
                                }

                                continue;
                        }

                        if (result instanceof RecommendationSnapshot recommendationResult) {
                                if (recommendationResult
                                                .found()) {
                                        recommendation = recommendationResult;

                                        evidenceIds.addAll(
                                                        recommendationResult
                                                                        .evidenceIds());
                                }
                        }
                }

                return new Grounding(
                                joinerContext,
                                recommendation,
                                evidenceIds);
        }

        private Grounding groundingFromJoinerContext(
                        JoinerContext context) {
                Set<String> evidenceIds = new LinkedHashSet<>();

                collectContextEvidence(
                                context,
                                evidenceIds);

                RecommendationSnapshot recommendation = context.recommendation() != null &&
                                context.recommendation().found()
                                                ? context.recommendation()
                                                : null;

                return new Grounding(
                                context,
                                recommendation,
                                evidenceIds);
        }

        private void collectContextEvidence(
                        JoinerContext context,
                        Set<String> evidenceIds) {
                if (context == null) {
                        return;
                }

                if (context.evidence() != null) {
                        context.evidence()
                                        .stream()
                                        .map(
                                                        EvidenceSnapshot::evidenceId)
                                        .filter(id -> id != null &&
                                                        !id.isBlank())
                                        .forEach(
                                                        evidenceIds::add);
                }

                if (context.blockers() != null) {
                        context.blockers()
                                        .stream()
                                        .map(
                                                        BlockerSnapshot::evidenceIds)
                                        .filter(ids -> ids != null)
                                        .flatMap(List::stream)
                                        .filter(id -> id != null &&
                                                        !id.isBlank())
                                        .forEach(
                                                        evidenceIds::add);
                }

                if (context.recommendation() != null &&
                                context
                                                .recommendation()
                                                .evidenceIds() != null) {
                        evidenceIds.addAll(
                                        context
                                                        .recommendation()
                                                        .evidenceIds());
                }
        }

        private List<EvidenceSnapshot> resolveVerifiedEvidence(
                        GeminiAssistantDraft draft,
                        String persona,
                        String userId,
                        Grounding grounding) {
                List<String> requestedIds = draft.evidenceIds()
                                .stream()
                                .filter(id -> id != null &&
                                                !id.isBlank())
                                .filter(
                                                grounding
                                                                .allowedEvidenceIds()::contains)
                                .distinct()
                                .toList();

                return knowledgeService
                                .findEvidenceByIds(
                                                persona,
                                                userId,
                                                requestedIds);
        }

        private List<ProposedAction> sanitizeActions(
                        List<String> requestedActionTypes,
                        String query,
                        String persona,
                        String userId,
                        Grounding grounding) {
                Set<String> requestedActions = normalizeActionTypes(
                                requestedActionTypes);

                List<ProposedAction> actions = new ArrayList<>();

                boolean reminderRequest = isReminderRequest(query);

                /*
                 * The model can suggest an approval category,
                 * but only Java can attach a valid recommendation.
                 */
                if (reminderRequest) {
                        addApprovalAction(
                                        actions,
                                        persona,
                                        userId,
                                        grounding);
                }

                boolean shouldOpenJoiner = requestedActions.contains(
                                "OPEN_JOINER")
                                || (requiresEvidence(query) &&
                                                grounding.joinerContext() != null)
                                || reminderRequest;

                if (shouldOpenJoiner) {
                        addOpenJoinerAction(
                                        actions,
                                        persona,
                                        userId,
                                        grounding);
                }

                return List.copyOf(actions);
        }

        private Set<String> normalizeActionTypes(
                        List<String> actionTypes) {
                Set<String> normalized = new LinkedHashSet<>();

                if (actionTypes == null) {
                        return normalized;
                }

                actionTypes.stream()
                                .filter(type -> type != null &&
                                                !type.isBlank())
                                .map(this::normalize)
                                .filter(type -> "OPEN_JOINER".equals(type) ||
                                                "APPROVE_RECOMMENDATION"
                                                                .equals(type))
                                .forEach(
                                                normalized::add);

                return normalized;
        }

        private void addApprovalAction(
                        List<ProposedAction> actions,
                        String persona,
                        String userId,
                        Grounding grounding) {
                if (!"MANAGER".equals(
                                normalizePersona(persona))) {
                        return;
                }

                RecommendationSnapshot recommendation = grounding.recommendation();

                if (recommendation == null ||
                                !recommendation.found()) {
                        return;
                }

                boolean valid = knowledgeService
                                .isPendingRecommendation(
                                                persona,
                                                userId,
                                                recommendation.joinerId(),
                                                recommendation
                                                                .recommendationId());

                if (!valid) {
                        return;
                }

                actions.add(
                                new ProposedAction(
                                                "APPROVE_RECOMMENDATION",
                                                "Approve reminder",
                                                recommendation.joinerId(),
                                                recommendation
                                                                .recommendationId()));
        }

        private void addOpenJoinerAction(
                        List<ProposedAction> actions,
                        String persona,
                        String userId,
                        Grounding grounding) {
                JoinerContext context = grounding.joinerContext();

                if (context == null ||
                                context.joiner() == null) {
                        return;
                }

                String joinerId = context.joiner()
                                .joinerId();

                if (!knowledgeService
                                .canAccessJoiner(
                                                persona,
                                                userId,
                                                joinerId)) {
                        return;
                }

                boolean approvalExists = actions.stream()
                                .anyMatch(action -> "APPROVE_RECOMMENDATION"
                                                .equals(
                                                                action.actionType()));

                String label = approvalExists
                                ? "Review supporting evidence"
                                : "Open " +
                                                context.joiner()
                                                                .displayName()
                                                +
                                                "'s Joiner 360";

                actions.add(
                                new ProposedAction(
                                                "OPEN_JOINER",
                                                label,
                                                joinerId,
                                                null));
        }

        private JoinerContext resolveContext(
                        String query,
                        String persona,
                        String userId) {
                String normalizedQuery = normalize(query);

                if (normalizedQuery.contains("MAYA") ||
                                normalizedQuery.contains("J-1001")) {
                        return knowledgeService
                                        .getJoinerContext(
                                                        persona,
                                                        userId,
                                                        "Maya Sen");
                }

                return knowledgeService
                                .listJoinersNeedingAction(
                                                persona,
                                                userId)
                                .stream()
                                .findFirst()
                                .map(joiner -> knowledgeService
                                                .getJoinerContext(
                                                                persona,
                                                                userId,
                                                                joiner.joinerId()))
                                .orElseGet(() -> knowledgeService
                                                .getJoinerContext(
                                                                persona,
                                                                userId,
                                                                ""));
        }

        private Citation toCitation(
                        EvidenceSnapshot evidence) {
                return new Citation(
                                evidence.evidenceId(),
                                evidence.title(),
                                evidence.sourceSystem(),
                                evidence.sourceReference(),
                                evidence.observedValue(),
                                evidence.capturedAt());
        }

        private String selectDisclaimer(
                        boolean agentFlow,
                        boolean approvalIncluded) {
                if (agentFlow) {
                        return approvalIncluded
                                        ? AGENT_APPROVAL_DISCLAIMER
                                        : AGENT_READINESS_DISCLAIMER;
                }

                return approvalIncluded
                                ? STRUCTURED_APPROVAL_DISCLAIMER
                                : STRUCTURED_READINESS_DISCLAIMER;
        }

        private boolean requiresEvidence(
                        String query) {
                String normalized = normalize(query);

                return normalized.contains("MAYA")
                                || normalized.contains("J-1001")
                                || normalized.contains("READINESS")
                                || normalized.contains("BLOCKER")
                                || normalized.contains("ACCESS")
                                || normalized.contains("MFA")
                                || normalized.contains("TRAINING")
                                || normalized.contains("REMINDER")
                                || normalized.contains("EVIDENCE")
                                || normalized.contains("OWNER");
        }

        private boolean isReminderRequest(
                        String query) {
                String normalized = normalize(query);

                return normalized.contains("REMINDER")
                                || normalized.contains("FOLLOW UP")
                                || normalized.contains("FOLLOW-UP")
                                || normalized.contains("ESCALATE")
                                || normalized.contains("DRAFT");
        }

        private AssistantResponse deterministicFallback(
                        String query,
                        String persona,
                        String userId,
                        String reason) {
                LOGGER.info(
                                """
                                                READY_PATH_ASSISTANT_ENGINE=DETERMINISTIC_FALLBACK
                                                reason={}
                                                persona={}
                                                userId={}
                                                """.strip(),
                                reason,
                                normalizePersona(persona),
                                userId);

                return fallbackService.answer(
                                query,
                                persona,
                                userId);
        }

        private AssistantResponse accessDenied() {
                return new AssistantResponse(
                                "Information unavailable",
                                """
                                                The requested onboarding information is
                                                outside the current user's permitted scope.
                                                """.strip(),
                                List.of(),
                                List.of(),
                                """
                                                ReadyPath only returns readiness information
                                                available to the authenticated user's role.
                                                """.strip());
        }

        private AssistantResponse informationUnavailable(
                        String message) {
                return new AssistantResponse(
                                "Information unavailable",

                                isBlank(message)
                                                ? """
                                                                The available readiness evidence was
                                                                insufficient to answer this request.
                                                                """.strip()
                                                : message.strip(),

                                List.of(),
                                List.of(),
                                """
                                                The available readiness evidence was
                                                insufficient to answer this request.
                                                """.strip());
        }

        private AssistantResponse invalidQuestion() {
                return new AssistantResponse(
                                "Enter a readiness question",
                                """
                                                Ask about onboarding readiness, blockers,
                                                ownership, supporting evidence or follow-up
                                                actions.
                                                """.strip(),
                                List.of(),
                                List.of(),
                                """
                                                No assistant request was sent because the
                                                question was empty.
                                                """.strip());
        }

        private String normalizePersona(
                        String persona) {
                return normalize(persona);
        }

        private String normalize(
                        String value) {
                return value == null
                                ? ""
                                : value
                                                .trim()
                                                .toUpperCase(
                                                                Locale.ROOT);
        }

        private boolean isBlank(
                        String value) {
                return value == null ||
                                value.isBlank();
        }

        private record Grounding(
                        JoinerContext joinerContext,
                        RecommendationSnapshot recommendation,
                        Set<String> allowedEvidenceIds) {

                private Grounding {
                        allowedEvidenceIds = allowedEvidenceIds == null
                                        ? Set.of()
                                        : Set.copyOf(
                                                        allowedEvidenceIds);
                }
        }
}
