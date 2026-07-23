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
  catchError,
  finalize,
  of,
  timeout
} from 'rxjs';

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

import {
  ReadypathBackendService
} from '../../../core/services/readypath-backend.service';

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

  private readonly backend = 
    inject(ReadypathBackendService);

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
          "Draft Maya's access reminder",
        query:
          "Draft a reminder for Maya's access request."
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

  readonly backendStatus =
    signal<
      'CHECKING' |
      'CONNECTED' |
      'FALLBACK'
    >('CHECKING');

  readonly approvalInProgress =
    signal<string | null>(null);

  constructor() {
    this.resetConversation();
    this.checkBackendConnection();
  }

  submitQuery(): void {
    const query =
      this.queryText().trim();

    if (!query || this.isThinking()) {
      return;
    }

    const persona =
      this.currentPersona();

    const userId =
      this.currentUser().id;

    this.messages.update(
      current => [
        ...current,
        this.assistant
          .createUserMessage(query)
      ]
    );

    this.queryText.set('');
    this.isThinking.set(true);

    this.backend
      .ask(
        query,
        persona,
        userId
      )
      .pipe(
        timeout(5000),

        catchError(() => {
          /*
          * Keep the demo usable if the backend
          * is temporarily unavailable.
          */
          this.backendStatus.set(
            'FALLBACK'
          );

          return of(
            this.assistant.answer(
              query,
              persona,
              userId
            )
          );
        }),

        finalize(() => {
          this.isThinking.set(false);
        })
      )
      .subscribe(answer => {
        this.messages.update(
          current => [
            ...current,
            answer
          ]
        );
      });
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
          action.joinerId,
          action.recommendationId
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
    joinerId: string,
    recommendationId?: string
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

    const resolvedRecommendationId =
      recommendationId ??
      detail.aiRecommendation.id;

    this.approvalInProgress.set(
      joinerId
    );

    this.backend
      .approveRecommendation({
        joinerId,
        recommendationId:
          resolvedRecommendationId,
        approvedBy:
          this.currentUser().displayName
      })
      .pipe(
        timeout(5000),

        catchError(() => {
          this.backendStatus.set(
            'FALLBACK'
          );

          return of(null);
        }),

        finalize(() => {
          this.approvalInProgress.set(
            null
          );
        })
      )
      .subscribe(response => {
        if (!response) {
          /*
          * Preserve UI functionality, but do
          * not pretend that a notification was
          * sent through the backend.
          */
          this.readinessStore
            .approveRecommendation(
              joinerId
            );

          this.messages.update(
            current => [
              ...current,

              this.assistant
                .createActionConfirmation(
                  `The approval was recorded only in the local demo state because the backend was unavailable. No backend notification was sent.`
                )
            ]
          );

          return;
        }

        /*
        * Synchronise the Angular state so the
        * Manager Home and Joiner 360 update.
        */
        if (
          detail.aiRecommendation
            .approvalStatus ===
          'PENDING_APPROVAL'
        ) {
          this.readinessStore
            .approveRecommendation(
              joinerId
            );
        }

        const resultMessage =
          response.status ===
          'ALREADY_APPROVED'
            ? `The backend reports that this recommendation was already approved. Audit reference: ${response.auditEventId}.`
            : `The reminder was approved and sent through the Spring Boot notification adapter. Notification reference: ${response.notificationId}. Audit reference: ${response.auditEventId}.`;

        this.messages.update(
          current => [
            ...current,

            this.assistant
              .createActionConfirmation(
                resultMessage
              )
          ]
        );
      });
  }

  private checkBackendConnection(): void {
    this.backend
      .health()
      .pipe(
        timeout(3000),

        catchError(() => {
          this.backendStatus.set(
            'FALLBACK'
          );

          return of(null);
        })
      )
      .subscribe(response => {
        if (
          response?.status
            .toLowerCase() === 'ok'
        ) {
          this.backendStatus.set(
            'CONNECTED'
          );
        }
      });
  }
}
