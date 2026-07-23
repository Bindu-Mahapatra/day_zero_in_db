import {
  Component,
  computed,
  inject
} from '@angular/core';
import { Router } from '@angular/router';

import {
  AiRecommendation,
  BlockerSeverity,
  JoinerBlocker,
  JoinerDetail,
  JoinerSummary,
  ReadinessStatus
} from '../../../core/models/readiness.model';

import {
  DemoSessionService
} from '../../../core/services/demo-session.service';

import {
  ReadinessStoreService
} from '../../../core/services/readiness-store.service';

interface ManagerSummary {
  totalJoiners: number;
  fullyReady: number;
  attentionRequired: number;
  criticalRisk: number;
  averageReadiness: number;
  joiningWithinSevenDays: number;
  pendingApprovals: number;
}

interface ApprovalQueueItem {
  joiner: JoinerSummary;
  recommendation: AiRecommendation;
}

interface ManagerBlockerView {
  joinerId: string;
  joinerName: string;
  role: string;
  blocker: JoinerBlocker;
}

interface ManagerActivityView {
  id: string;
  joinerId: string;
  joinerName: string;
  occurredAt: string;
  title: string;
  description: string;
  actor: string;
}

@Component({
  selector: 'app-manager-home',
  standalone: true,
  templateUrl: './manager-home.component.html',
  styleUrl: './manager-home.component.scss'
})
export class ManagerHome {
  private readonly router = inject(Router);
  private readonly session = inject(DemoSessionService);
  private readonly readinessStore = inject(
    ReadinessStoreService
  );

  readonly currentUser = this.session.currentUser;

  readonly assignedJoiners = computed(() => {
    const managerId = this.currentUser().id;

    return this.readinessStore
      .joiners()
      .filter(joiner => joiner.managerId === managerId)
      .sort((left, right) => {
        if (left.id === 'J-1001') {
          return -1;
        }

        if (right.id === 'J-1001') {
          return 1;
        }

        const priorityDifference =
          this.statusPriority(left.status) -
          this.statusPriority(right.status);

        if (priorityDifference !== 0) {
          return priorityDifference;
        }

        return left.joiningDate.localeCompare(
          right.joiningDate
        );
      });
  });

  readonly assignedDetails = computed<JoinerDetail[]>(
    () =>
      this.assignedJoiners()
        .map(joiner =>
          this.readinessStore.joinerDetails()[
            joiner.id
          ]
        )
        .filter(
          (detail): detail is JoinerDetail =>
            Boolean(detail)
        )
  );

  readonly summary = computed<ManagerSummary>(() => {
    const joiners = this.assignedJoiners();

    const averageReadiness =
      joiners.length === 0
        ? 0
        : joiners.reduce(
            (total, joiner) =>
              total + joiner.readinessScore,
            0
          ) / joiners.length;

    const pendingApprovals =
      this.assignedDetails().filter(
        detail =>
          detail.summary.status !== 'READY' &&
          detail.aiRecommendation.approvalStatus ===
            'PENDING_APPROVAL'
      ).length;

    return {
      totalJoiners: joiners.length,

      fullyReady: joiners.filter(
        joiner => joiner.status === 'READY'
      ).length,

      attentionRequired: joiners.filter(
        joiner => joiner.status === 'ATTENTION'
      ).length,

      criticalRisk: joiners.filter(
        joiner => joiner.status === 'CRITICAL'
      ).length,

      averageReadiness: Number(
        averageReadiness.toFixed(0)
      ),

      joiningWithinSevenDays: joiners.filter(
        joiner => joiner.daysToJoining <= 7
      ).length,

      pendingApprovals
    };
  });

  readonly priorityJoiners = computed(() =>
    this.assignedJoiners()
      .filter(joiner => joiner.status !== 'READY')
      .slice(0, 6)
  );

  readonly approvalQueue = computed<
    ApprovalQueueItem[]
  >(() =>
    this.assignedDetails()
      .filter(
        detail =>
          detail.summary.status !== 'READY' &&
          detail.aiRecommendation.approvalStatus ===
            'PENDING_APPROVAL'
      )
      .sort((left, right) => {
        if (left.summary.id === 'J-1001') {
          return -1;
        }

        if (right.summary.id === 'J-1001') {
          return 1;
        }

        return (
          this.statusPriority(
            left.summary.status
          ) -
          this.statusPriority(
            right.summary.status
          )
        );
      })
      .slice(0, 5)
      .map(detail => ({
        joiner: detail.summary,
        recommendation:
          detail.aiRecommendation
      }))
  );

  readonly topBlockers = computed<
    ManagerBlockerView[]
  >(() =>
    this.assignedDetails()
      .flatMap(detail =>
        detail.blockers.map(blocker => ({
          joinerId: detail.summary.id,
          joinerName:
            detail.summary.displayName,
          role: detail.summary.role,
          blocker
        }))
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
      )
      .slice(0, 6)
  );

  readonly recentActivity = computed<
    ManagerActivityView[]
  >(() =>
    this.assignedDetails()
      .flatMap(detail =>
        detail.timeline
          .slice(0, 3)
          .map(event => ({
            id: `${detail.summary.id}-${event.id}`,
            joinerId: detail.summary.id,
            joinerName:
              detail.summary.displayName,
            occurredAt: event.occurredAt,
            title: event.title,
            description: event.description,
            actor: event.actor
          }))
      )
      .slice(0, 7)
  );

  readonly featuredJoiner = computed(
    () =>
      this.assignedDetails().find(
        detail => detail.summary.id === 'J-1001'
      ) ??
      this.assignedDetails().find(
        detail =>
          detail.summary.status !== 'READY'
      )
  );

  openJoiner(joinerId: string): void {
    void this.router.navigate([
      '/manager/joiners',
      joinerId
    ]);
  }

  openAssistant(): void {
    void this.router.navigateByUrl(
      '/manager/assistant'
    );
  }

  approveRecommendation(
    joinerId: string
  ): void {
    this.readinessStore.approveRecommendation(
      joinerId
    );
  }

  dismissRecommendation(
    joinerId: string
  ): void {
    this.readinessStore.dismissRecommendation(
      joinerId
    );
  }

  statusClass(
    status: ReadinessStatus
  ): string {
    return `status-${status
      .toLowerCase()
      .replaceAll('_', '-')}`;
  }

  statusLabel(
    status: ReadinessStatus
  ): string {
    switch (status) {
      case 'READY':
        return 'Ready';

      case 'ATTENTION':
        return 'Attention';

      case 'CRITICAL':
        return 'Critical';

      case 'NOT_STARTED':
        return 'Not started';
    }
  }

  blockerClass(
    severity: BlockerSeverity
  ): string {
    return `severity-${severity.toLowerCase()}`;
  }

  private statusPriority(
    status: ReadinessStatus
  ): number {
    const priority: Record<
      ReadinessStatus,
      number
    > = {
      CRITICAL: 0,
      ATTENTION: 1,
      NOT_STARTED: 2,
      READY: 3
    };

    return priority[status];
  }

  private severityPriority(
    severity: BlockerSeverity
  ): number {
    const priority: Record<
      BlockerSeverity,
      number
    > = {
      CRITICAL: 0,
      HIGH: 1,
      MEDIUM: 2
    };

    return priority[severity];
  }
}
