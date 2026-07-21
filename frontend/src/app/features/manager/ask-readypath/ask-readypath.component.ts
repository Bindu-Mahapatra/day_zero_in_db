import {
  Component,
  computed,
  inject,
  signal
} from '@angular/core';

import {
  FormsModule
} from '@angular/forms';

import {
  Router
} from '@angular/router';

import {
  AssistantAction,
  AssistantMessage,
  AssistantSuggestion
} from '../../../core/models/assistant.model';

import {
  DemoSessionService
} from '../../../core/services/demo-session.service';

import {
  ReadinessStoreService
} from '../../../core/services/readiness-store.service';

import {
  ReadypathAssistantService
} from '../../../core/services/readypath-assistant.service';

@Component({
  selector: 'app-ask-readypath',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './ask-readypath.component.html',
  styleUrl: './ask-readypath.component.scss'
})
export class AskReadypath {
  private readonly router =
    inject(Router);

  private readonly session =
    inject(DemoSessionService);

  private readonly readinessStore =
    inject(ReadinessStoreService);

  private readonly assistant =
    inject(ReadypathAssistantService);

  readonly currentUser =
    this.session.currentUser;

  readonly currentPersona =
    this.session.currentPersona;

  readonly queryText = signal('');

  readonly isThinking = signal(false);

  readonly messages =
    signal<AssistantMessage[]>([]);

  readonly suggestions:
    AssistantSuggestion[] = [
      {
        id: 'ACTION-TODAY',
        label:
          'Which joiners need action today?',
        query:
          'Which joiners need action today?'
      },
      {
        id: 'WHY-MAYA',
        label:
          'Why is Maya not ready?',
        query:
          'Why is Maya not ready?'
      },
      {
        id: 'TOP-BLOCKER',
        label:
          'Who owns the highest-priority blocker?',
        query:
          'Who owns the highest-priority blocker?'
      },
      {
        id: 'MFA',
        label:
          'Show Bengaluru joiners missing MFA',
        query:
          'Show Bengaluru joiners missing MFA.'
      },
      {
        id: 'DRAFT',
        label:
          'Draft Maya’s access reminder',
        query:
          'Draft a reminder for Maya’s access request.'
      }
    ];

  readonly assignedJoiners =
    computed(() => {
      const user =
        this.currentUser();

      if (
        this.currentPersona() !==
        'MANAGER'
      ) {
        return this.readinessStore
          .joiners();
      }

      return this.readinessStore
        .joiners()
        .filter(
          joiner =>
            joiner.managerId ===
            user.id
        );
    });

  readonly scopedDetails =
    computed(() =>
      this.assignedJoiners()
        .map(joiner =>
          this.readinessStore
            .joinerDetails()[
              joiner.id
            ]
        )
        .filter(detail =>
          Boolean(detail)
        )
    );

  readonly openBlockerCount =
    computed(() =>
      this.scopedDetails().reduce(
        (total, detail) =>
          total +
          (
            detail?.blockers.length ??
            0
          ),
        0
      )
    );

  readonly pendingApprovalCount =
    computed(() =>
      this.scopedDetails().filter(
        detail =>
          detail?.summary.status !==
            'READY' &&
          detail?.aiRecommendation
            .approvalStatus ===
            'PENDING_APPROVAL'
      ).length
    );

  readonly evidenceCount =
    computed(() =>
      this.scopedDetails().reduce(
        (total, detail) =>
          total +
          (
            detail?.evidence.length ??
            0
          ),
        0
      )
    );

  readonly priorityJoiners =
    computed(() =>
      this.assignedJoiners()
        .filter(
          joiner =>
            joiner.status !== 'READY'
        )
        .sort(
          (left, right) =>
            left.daysToJoining -
            right.daysToJoining
        )
        .slice(0, 4)
    );

  constructor() {
    this.resetConversation();
  }

  submitQuery(): void {
    const query =
      this.queryText().trim();

    if (!query || this.isThinking()) {
      return;
    }

    this.messages.update(
      current => [
        ...current,
        this.assistant
          .createUserMessage(query)
      ]
    );

    this.queryText.set('');
    this.isThinking.set(true);

    setTimeout(() => {
      const answer =
        this.assistant.answer(
          query,
          this.currentPersona(),
          this.currentUser().id
        );

      this.messages.update(
        current => [
          ...current,
          answer
        ]
      );

      this.isThinking.set(false);
    }, 450);
  }

  askSuggestion(
    suggestion: AssistantSuggestion
  ): void {
    this.queryText.set(
      suggestion.query
    );

    this.submitQuery();
  }

  handleAction(
    action: AssistantAction
  ): void {
    switch (action.actionType) {
      case 'OPEN_JOINER':
        this.openJoiner(
          action.joinerId
        );
        return;

      case 'APPROVE_RECOMMENDATION':
        this.approveRecommendation(
          action.joinerId
        );
        return;
    }
  }

  resetConversation(): void {
    this.messages.set([
      this.assistant
        .createWelcomeMessage(
          this.currentUser()
            .displayName
        )
    ]);

    this.queryText.set('');
    this.isThinking.set(false);
  }

  openJoiner(
    joinerId: string
  ): void {
    const route =
      this.currentPersona() ===
        'MANAGER'
        ? '/manager/joiners'
        : '/hr/joiners';

    void this.router.navigate([
      route,
      joinerId
    ]);
  }

  private approveRecommendation(
    joinerId: string
  ): void {
    const detail =
      this.readinessStore
        .getJoinerDetail(joinerId);

    if (!detail) {
      return;
    }

    if (
      detail.aiRecommendation
        .approvalStatus !==
      'PENDING_APPROVAL'
    ) {
      this.messages.update(
        current => [
          ...current,
          this.assistant
            .createActionConfirmation(
              'This recommendation has already been reviewed.'
            )
        ]
      );

      return;
    }

    this.readinessStore
      .approveRecommendation(
        joinerId
      );

    this.messages.update(
      current => [
        ...current,
        this.assistant
          .createActionConfirmation(
            `The reminder for ${detail.summary.displayName} was approved. An audit entry was added to the Joiner 360 timeline.`
          )
      ]
    );
  }
}