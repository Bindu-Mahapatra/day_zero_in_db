import {
  Component,
  computed,
  inject
} from '@angular/core';

import {
  Router
} from '@angular/router';

import {
  AreaStatus,
  JoinerBlocker,
  JoinerTaskDetail,
  ReadinessAreaDetail,
  TaskPriority
} from '../../../core/models/readiness.model';

import {
  DemoSessionService
} from '../../../core/services/demo-session.service';

import {
  ReadinessStoreService
} from '../../../core/services/readiness-store.service';

@Component({
  selector: 'app-joiner-home',
  standalone: true,
  templateUrl: './joiner-home.component.html',
  styleUrl: './joiner-home.component.scss'
})
export class JoinerHome {
  private readonly router =
    inject(Router);

  private readonly session =
    inject(DemoSessionService);

  private readonly readinessStore =
    inject(ReadinessStoreService);

  readonly currentUser =
    this.session.currentUser;

  readonly joinerId = computed(
    () =>
      this.currentUser()
        .subjectJoinerId ??
      'J-1001'
  );

  readonly detail = computed(
    () =>
      this.readinessStore
        .joinerDetails()[
          this.joinerId()
        ]
  );

  readonly myOpenTasks = computed<
    JoinerTaskDetail[]
  >(() =>
    (this.detail()?.tasks ?? [])
      .filter(
        task =>
          task.ownerType === 'JOINER' &&
          task.status === 'OPEN'
      )
      .sort(
        (left, right) =>
          this.priorityOrder(
            left.priority
          ) -
          this.priorityOrder(
            right.priority
          )
      )
  );

  readonly completedMyTasks =
    computed(() =>
      (
        this.detail()?.tasks ?? []
      ).filter(
        task =>
          task.ownerType === 'JOINER' &&
          task.status === 'COMPLETED'
      ).length
    );

  readonly nextBestAction =
    computed(
      () => this.myOpenTasks()[0]
    );

  readonly bankManagedBlockers =
    computed<JoinerBlocker[]>(() => {
      const joiner =
        this.detail();

      if (!joiner) {
        return [];
      }

      return joiner.blockers.filter(
        blocker =>
          blocker.owner !==
          joiner.summary.displayName
      );
    });

  readonly completedAreas =
    computed(() =>
      (
        this.detail()?.areas ?? []
      ).filter(
        area =>
          area.status === 'COMPLETE'
      ).length
    );

  readonly journeyPreview =
    computed<ReadinessAreaDetail[]>(
      () =>
        this.detail()?.areas ?? []
    );

  readonly firstDayPlan = {
    date: '26 Jul 2026',
    arrivalTime: '9:30 AM IST',
    location:
      'Bengaluru Technology Centre',
    manager: 'Arjun Rao',
    buddy: 'Neha Kapoor',
    firstMeeting:
      '10:30 AM · Team introduction'
  };

  openJourney(): void {
    void this.router.navigateByUrl(
      '/me/journey'
    );
  }

  completeTask(
    taskId: string
  ): void {
    this.readinessStore.completeTask(
      this.joinerId(),
      taskId
    );
  }

  areaStatusClass(
    status: AreaStatus
  ): string {
    return `area-${status
      .toLowerCase()
      .replaceAll('_', '-')}`;
  }

  areaStatusLabel(
    status: AreaStatus
  ): string {
    switch (status) {
      case 'COMPLETE':
        return 'Complete';

      case 'IN_PROGRESS':
        return 'In progress';

      case 'BLOCKED':
        return 'Blocked';

      case 'NOT_STARTED':
        return 'Not started';
    }
  }

  priorityClass(
    priority: TaskPriority
  ): string {
    return `priority-${priority
      .toLowerCase()}`;
  }

  private priorityOrder(
    priority: TaskPriority
  ): number {
    const priorityOrder: Record<
      TaskPriority,
      number
    > = {
      HIGH: 0,
      MEDIUM: 1,
      LOW: 2
    };

    return priorityOrder[priority];
  }
}