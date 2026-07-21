import {
  Injectable,
  inject
} from '@angular/core';

import {
  AssistantAction,
  AssistantCitation,
  AssistantMessage
} from '../models/assistant.model';

import {
  Persona
} from '../models/persona.model';

import {
  JoinerDetail,
  JoinerSummary,
  ReadinessStatus
} from '../models/readiness.model';

import {
  ReadinessStoreService
} from './readiness-store.service';

@Injectable({
  providedIn: 'root'
})
export class ReadypathAssistantService {
  private readonly readinessStore =
    inject(ReadinessStoreService);

  private messageSequence = 1;

  createWelcomeMessage(
    displayName: string
  ): AssistantMessage {
    return this.createAssistantMessage({
      heading: `Welcome, ${displayName}`,
      content:
        'I can explain onboarding readiness, identify evidence-backed blockers, locate owners and prepare actions for human approval. My answers use only the synthetic records available in ReadyPath.',
      citations: [],
      actions: [],
      disclaimer:
        'ReadyPath explains deterministic readiness results. It does not independently grant access, approve exceptions or make employment decisions.'
    });
  }

  createUserMessage(
    query: string
  ): AssistantMessage {
    return {
      id: this.nextMessageId('USER'),
      role: 'USER',
      content: query,
      createdAt: 'Just now',
      citations: [],
      actions: []
    };
  }

  createActionConfirmation(
    content: string
  ): AssistantMessage {
    return this.createAssistantMessage({
      heading: 'Action recorded',
      content,
      citations: [],
      actions: [],
      disclaimer:
        'The action was recorded in the synthetic in-memory demo state.'
    });
  }

  answer(
    query: string,
    persona: Persona,
    currentUserId: string
  ): AssistantMessage {
    const normalizedQuery = query
      .trim()
      .toLowerCase();

    const scopedJoiners =
      this.getScopedJoiners(
        persona,
        currentUserId
      );

    if (
      normalizedQuery.includes('why') &&
      (
        normalizedQuery.includes('maya') ||
        normalizedQuery.includes(
          'not ready'
        )
      )
    ) {
      return this.explainMayaReadiness();
    }

    if (
      normalizedQuery.includes(
        'highest'
      ) &&
      normalizedQuery.includes(
        'blocker'
      )
    ) {
      return this.explainHighestPriorityBlocker(
        scopedJoiners
      );
    }

    if (
      normalizedQuery.includes(
        'bengaluru'
      ) &&
      (
        normalizedQuery.includes('mfa') ||
        normalizedQuery.includes(
          'remote access'
        )
      )
    ) {
      return this.findBengaluruMfaCases(
        scopedJoiners
      );
    }

    if (
      normalizedQuery.includes(
        'draft'
      ) &&
      (
        normalizedQuery.includes(
          'reminder'
        ) ||
        normalizedQuery.includes(
          'access'
        )
      )
    ) {
      return this.draftAccessReminder(
        scopedJoiners
      );
    }

    if (
      normalizedQuery.includes(
        'action today'
      ) ||
      normalizedQuery.includes(
        'need action'
      ) ||
      normalizedQuery.includes(
        'needs attention'
      )
    ) {
      return this.explainJoinersNeedingAction(
        scopedJoiners
      );
    }

    if (
      normalizedQuery.includes(
        'pending approval'
      ) ||
      normalizedQuery.includes(
        'approval queue'
      )
    ) {
      return this.explainPendingApprovals(
        scopedJoiners
      );
    }

    return this.createFallbackAnswer(
      scopedJoiners
    );
  }

  private explainMayaReadiness():
    AssistantMessage {
    const detail =
      this.getDetail('J-1001');

    if (!detail) {
      return this.noDataMessage(
        'Maya Sen could not be found in the synthetic dataset.'
      );
    }

    const blockers = detail.blockers;

    const blockerSummary = blockers
      .map(
        blocker =>
          `${blocker.title} — owned by ${blocker.owner}`
      )
      .join('\n');

    return this.createAssistantMessage({
      heading:
        'Maya is not yet operationally ready',
      content:
        `Maya’s readiness is ${detail.summary.readinessScore}%. ` +
        `Five of ten readiness areas are complete, three are in progress and two are blocked.\n\n` +
        `The main blockers are:\n${blockerSummary}\n\n` +
        `Role Access is the most urgent issue because request AG-3812 has exceeded its expected fulfilment time by four days. MFA verification, one mandatory training course and the manager’s first-week role plan also remain incomplete.`,
      citations:
        this.createCitations(
          detail,
          [
            'EVD-ACCESS-1001',
            'EVD-MFA-1001',
            'EVD-TRAINING-1001',
            'EVD-TEAM-1001'
          ]
        ),
      actions: [
        {
          id: 'OPEN-MAYA',
          label: 'Open Maya’s Joiner 360',
          actionType: 'OPEN_JOINER',
          joinerId: detail.summary.id
        }
      ],
      disclaimer:
        'This explanation is grounded in deterministic readiness status and synthetic evidence records.'
    });
  }

  private explainJoinersNeedingAction(
    scopedJoiners: JoinerSummary[]
  ): AssistantMessage {
    const needingAction = scopedJoiners
      .filter(
        joiner =>
          joiner.status !== 'READY'
      )
      .sort(
        (left, right) =>
          this.statusPriority(
            left.status
          ) -
            this.statusPriority(
              right.status
            ) ||
          left.daysToJoining -
            right.daysToJoining
      )
      .slice(0, 5);

    if (needingAction.length === 0) {
      return this.createAssistantMessage({
        heading:
          'No assigned joiners need action',
        content:
          'All joiners in your current scope are operationally ready.',
        citations: [],
        actions: []
      });
    }

    const lines = needingAction.map(
      (joiner, index) =>
        `${index + 1}. ${joiner.displayName} — ` +
        `${joiner.readinessScore}% ready, ` +
        `${joiner.daysToJoining} days to joining. ` +
        `Next issue: ${joiner.topPendingItem}. ` +
        `Owner: ${joiner.pendingOwner}.`
    );

    const details = needingAction
      .map(joiner =>
        this.getDetail(joiner.id)
      )
      .filter(
        (
          detail
        ): detail is JoinerDetail =>
          Boolean(detail)
      );

    const evidenceIds = details.flatMap(
      detail =>
        detail.blockers.flatMap(
          blocker => blocker.evidenceIds
        )
    );

    return this.createAssistantMessage({
      heading:
        `${needingAction.length} priority joiners need attention`,
      content:
        `The current priority order is based on readiness status and proximity to joining date:\n\n${lines.join('\n')}`,
      citations:
        this.createCitationsAcrossDetails(
          details,
          evidenceIds
        ),
      actions: needingAction.map(
        joiner => ({
          id: `OPEN-${joiner.id}`,
          label:
            `Open ${joiner.displayName}`,
          actionType:
            'OPEN_JOINER' as const,
          joinerId: joiner.id
        })
      ),
      disclaimer:
        'Priority is determined from structured status and joining-date data, not from employee performance.'
    });
  }

  private explainHighestPriorityBlocker(
    scopedJoiners: JoinerSummary[]
  ): AssistantMessage {
    const scopedIds = new Set(
      scopedJoiners.map(
        joiner => joiner.id
      )
    );

    const blockerItems =
      Object.values(
        this.readinessStore
          .joinerDetails()
      )
        .filter(detail =>
          scopedIds.has(
            detail.summary.id
          )
        )
        .flatMap(detail =>
          detail.blockers.map(
            blocker => ({
              detail,
              blocker
            })
          )
        )
        .sort(
          (left, right) =>
            this.severityPriority(
              left.blocker.severity
            ) -
              this.severityPriority(
                right.blocker.severity
              ) ||
            right.blocker.ageInDays -
              left.blocker.ageInDays
        );

    const highest =
      blockerItems[0];

    if (!highest) {
      return this.noDataMessage(
        'No active evidence-backed blockers were found in your current scope.'
      );
    }

    return this.createAssistantMessage({
      heading:
        'Access Management owns the highest-priority blocker',
      content:
        `${highest.detail.summary.displayName} is blocked by “${highest.blocker.title}”. ` +
        `The blocker is classified as ${highest.blocker.severity}, has been open for ${highest.blocker.ageInDays} days and is owned by ${highest.blocker.owner}.\n\n` +
        `Recommended action: ${highest.blocker.recommendedAction}`,
      citations:
        this.createCitations(
          highest.detail,
          highest.blocker.evidenceIds
        ),
      actions: [
        {
          id:
            `OPEN-${highest.detail.summary.id}`,
          label:
            `Open ${highest.detail.summary.displayName}`,
          actionType: 'OPEN_JOINER',
          joinerId:
            highest.detail.summary.id
        }
      ],
      disclaimer:
        'Blocker priority is calculated from deterministic severity and blocker-age rules.'
    });
  }

  private findBengaluruMfaCases(
    scopedJoiners: JoinerSummary[]
  ): AssistantMessage {
    const matches = scopedJoiners
      .map(joiner =>
        this.getDetail(joiner.id)
      )
      .filter(
        (
          detail
        ): detail is JoinerDetail =>
          Boolean(detail)
      )
      .filter(
        detail =>
          detail.summary.location
            .toLowerCase()
            .includes('bengaluru') &&
          detail.areas.some(
            area =>
              area.code ===
                'MFA_REMOTE_ACCESS' &&
              area.status !== 'COMPLETE'
          )
      );

    if (matches.length === 0) {
      return this.createAssistantMessage({
        heading:
          'No matching Bengaluru cases',
        content:
          'No joiners in your current scope are both based in Bengaluru and missing MFA or remote-access readiness.',
        citations: [],
        actions: []
      });
    }

    const lines = matches.map(
      detail =>
        `${detail.summary.displayName} — ` +
        `${detail.summary.readinessScore}% ready. ` +
        `MFA status: ${
          detail.areas.find(
            area =>
              area.code ===
              'MFA_REMOTE_ACCESS'
          )?.status ?? 'UNKNOWN'
        }.`
    );

    return this.createAssistantMessage({
      heading:
        `${matches.length} Bengaluru joiner requires MFA follow-up`,
      content: lines.join('\n'),
      citations:
        this.createCitationsAcrossDetails(
          matches,
          matches.flatMap(
            detail =>
              detail.areas
                .find(
                  area =>
                    area.code ===
                    'MFA_REMOTE_ACCESS'
                )
                ?.evidenceIds ?? []
          )
        ),
      actions: matches.map(
        detail => ({
          id:
            `OPEN-${detail.summary.id}`,
          label:
            `Open ${detail.summary.displayName}`,
          actionType:
            'OPEN_JOINER' as const,
          joinerId:
            detail.summary.id
        })
      ),
      disclaimer:
        'Location and MFA status are read from synthetic onboarding records.'
    });
  }

  private draftAccessReminder(
    scopedJoiners: JoinerSummary[]
  ): AssistantMessage {
    const candidate = scopedJoiners
      .map(joiner =>
        this.getDetail(joiner.id)
      )
      .filter(
        (
          detail
        ): detail is JoinerDetail =>
          Boolean(detail)
      )
      .find(
        detail =>
          detail.aiRecommendation
            .approvalStatus ===
            'PENDING_APPROVAL' &&
          detail.areas.some(
            area =>
              area.code ===
                'ROLE_ACCESS' &&
              area.status === 'BLOCKED'
          )
      );

    if (!candidate) {
      return this.noDataMessage(
        'No pending role-access reminder was found in your current scope.'
      );
    }

    const recommendation =
      candidate.aiRecommendation;

    const draft =
      `Subject: Follow-up required for onboarding access request AG-3812\n\n` +
      `Hello ${recommendation.recipient},\n\n` +
      `${candidate.summary.displayName} joins in ${candidate.summary.daysToJoining} days. ` +
      `The role-access request remains pending and has exceeded its expected fulfilment time.\n\n` +
      `Please confirm the current status and expected resolution date. ` +
      `If additional information is required, route the request back to the hiring manager.\n\n` +
      `Regards,\n${candidate.summary.managerName}`;

    return this.createAssistantMessage({
      heading:
        'Reminder draft ready for approval',
      content: draft,
      citations:
        this.createCitations(
          candidate,
          recommendation.evidenceIds
        ),
      actions: [
        {
          id:
            `APPROVE-${candidate.summary.id}`,
          label:
            'Approve reminder',
          actionType:
            'APPROVE_RECOMMENDATION',
          joinerId:
            candidate.summary.id
        },
        {
          id:
            `OPEN-${candidate.summary.id}`,
          label:
            'Review supporting evidence',
          actionType:
            'OPEN_JOINER',
          joinerId:
            candidate.summary.id
        }
      ],
      disclaimer:
        'This is an AI-generated draft using synthetic evidence. A human must approve it before sending.'
    });
  }

  private explainPendingApprovals(
    scopedJoiners: JoinerSummary[]
  ): AssistantMessage {
    const pending = scopedJoiners
      .map(joiner =>
        this.getDetail(joiner.id)
      )
      .filter(
        (
          detail
        ): detail is JoinerDetail =>
          Boolean(detail)
      )
      .filter(
        detail =>
          detail.summary.status !==
            'READY' &&
          detail.aiRecommendation
            .approvalStatus ===
            'PENDING_APPROVAL'
      );

    if (pending.length === 0) {
      return this.createAssistantMessage({
        heading:
          'No approvals are pending',
        content:
          'There are no AI-proposed actions awaiting human review in your current scope.',
        citations: [],
        actions: []
      });
    }

    const lines = pending.map(
      detail =>
        `${detail.summary.displayName}: ` +
        `${detail.aiRecommendation.title} ` +
        `(${detail.aiRecommendation.confidence}% confidence)`
    );

    return this.createAssistantMessage({
      heading:
        `${pending.length} recommendations await review`,
      content: lines.join('\n'),
      citations:
        this.createCitationsAcrossDetails(
          pending,
          pending.flatMap(
            detail =>
              detail.aiRecommendation
                .evidenceIds
          )
        ),
      actions: pending.flatMap(
        detail => [
          {
            id:
              `APPROVE-${detail.summary.id}`,
            label:
              `Approve for ${detail.summary.displayName}`,
            actionType:
              'APPROVE_RECOMMENDATION' as const,
            joinerId:
              detail.summary.id
          },
          {
            id:
              `OPEN-${detail.summary.id}`,
            label:
              `Review ${detail.summary.displayName}`,
            actionType:
              'OPEN_JOINER' as const,
            joinerId:
              detail.summary.id
          }
        ]
      ),
      disclaimer:
        'No proposed action is executed without explicit human approval.'
    });
  }

  private createFallbackAnswer(
    scopedJoiners: JoinerSummary[]
  ): AssistantMessage {
    const needingAttention =
      scopedJoiners.filter(
        joiner =>
          joiner.status !== 'READY'
      ).length;

    return this.createAssistantMessage({
      heading:
        'I need a more specific readiness question',
      content:
        `Your current scope contains ${scopedJoiners.length} joiners, of whom ${needingAttention} need attention.\n\n` +
        `Try asking:\n` +
        `• Which joiners need action today?\n` +
        `• Why is Maya not ready?\n` +
        `• Who owns the highest-priority blocker?\n` +
        `• Show Bengaluru joiners missing MFA.\n` +
        `• Draft a reminder for Maya’s access request.`,
      citations: [],
      actions: [],
      disclaimer:
        'This hackathon version uses deterministic intent matching. A local language model will replace the matcher later.'
    });
  }

  private getScopedJoiners(
    persona: Persona,
    currentUserId: string
  ): JoinerSummary[] {
    const joiners =
      this.readinessStore.joiners();

    if (persona === 'MANAGER') {
      return joiners.filter(
        joiner =>
          joiner.managerId ===
          currentUserId
      );
    }

    return joiners;
  }

  private getDetail(
    joinerId: string
  ): JoinerDetail | undefined {
    return this.readinessStore
      .joinerDetails()[joinerId];
  }

  private createCitations(
    detail: JoinerDetail,
    evidenceIds: string[]
  ): AssistantCitation[] {
    const uniqueIds = Array.from(
      new Set(evidenceIds)
    );

    return uniqueIds
      .map(evidenceId => {
        const evidence =
          detail.evidence.find(
            item =>
              item.id === evidenceId
          );

        if (!evidence) {
          return undefined;
        }

        return {
          id:
            `${detail.summary.id}-${evidence.id}`,
          joinerId:
            detail.summary.id,
          joinerName:
            detail.summary.displayName,
          evidenceId: evidence.id,
          title: evidence.title,
          sourceSystem:
            evidence.sourceSystem,
          sourceReference:
            evidence.sourceReference,
          observedValue:
            evidence.observedValue,
          capturedAt:
            evidence.capturedAt
        };
      })
      .filter(
        (
          citation
        ): citation is AssistantCitation =>
          Boolean(citation)
      );
  }

  private createCitationsAcrossDetails(
    details: JoinerDetail[],
    evidenceIds: string[]
  ): AssistantCitation[] {
    const requestedIds = new Set(
      evidenceIds
    );

    return details
      .flatMap(detail =>
        this.createCitations(
          detail,
          detail.evidence
            .filter(evidence =>
              requestedIds.has(
                evidence.id
              )
            )
            .map(evidence =>
              evidence.id
            )
        )
      )
      .slice(0, 6);
  }

  private createAssistantMessage(
    message: {
      heading?: string;
      content: string;
      citations: AssistantCitation[];
      actions: AssistantAction[];
      disclaimer?: string;
    }
  ): AssistantMessage {
    return {
      id:
        this.nextMessageId(
          'ASSISTANT'
        ),
      role: 'ASSISTANT',
      heading: message.heading,
      content: message.content,
      createdAt: 'Just now',
      citations: message.citations,
      actions: message.actions,
      disclaimer: message.disclaimer
    };
  }

  private noDataMessage(
    content: string
  ): AssistantMessage {
    return this.createAssistantMessage({
      heading: 'No matching data',
      content,
      citations: [],
      actions: []
    });
  }

  private nextMessageId(
    prefix: string
  ): string {
    return `${prefix}-${this.messageSequence++}`;
  }

  private statusPriority(
    status: ReadinessStatus
  ): number {
    const priorities: Record<
      ReadinessStatus,
      number
    > = {
      CRITICAL: 0,
      ATTENTION: 1,
      NOT_STARTED: 2,
      READY: 3
    };

    return priorities[status];
  }

  private severityPriority(
    severity:
      | 'MEDIUM'
      | 'HIGH'
      | 'CRITICAL'
  ): number {
    const priorities = {
      CRITICAL: 0,
      HIGH: 1,
      MEDIUM: 2
    };

    return priorities[severity];
  }
}