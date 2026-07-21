import {
  Component,
  computed,
  inject,
  signal
} from '@angular/core';

import {
  Router
} from '@angular/router';

import {
  AreaStatus,
  EvidenceRecord,
  JoinerTaskDetail,
  ReadinessAreaCode,
  ReadinessAreaDetail,
  TaskPriority
} from '../../../core/models/readiness.model';

import {
  DemoSessionService
} from '../../../core/services/demo-session.service';

import {
  ReadinessStoreService
} from '../../../core/services/readiness-store.service';

interface JourneyStage {
  id: string;
  title: string;
  description: string;
  areaCodes: ReadinessAreaCode[];
}

@Component({
  selector: 'app-joiner-journey',
  standalone: true,
  templateUrl: './joiner-journey.component.html',
  styleUrl: './joiner-journey.component.scss'
})
export class JoinerJourney {
  private readonly router =
    inject(Router);

  private readonly session =
    inject(DemoSessionService);

  private readonly readinessStore =
    inject(ReadinessStoreService);

  readonly joinerId = computed(
    () =>
      this.session.currentUser()
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

  readonly selectedAreaCode =
    signal<ReadinessAreaCode>(
      'ROLE_ACCESS'
    );

  readonly stages: JourneyStage[] = [
    {
      id: 'FOUNDATION',
      title: '1. Foundation',
      description:
        'Your profile, identity, device and secure connectivity.',
      areaCodes: [
        'HR_PROFILE',
        'PRIMARY_IDENTITY',
        'DEVICE_TECH',
        'MFA_REMOTE_ACCESS'
      ]
    },
    {
      id: 'ACCESS_OBLIGATIONS',
      title: '2. Access and obligations',
      description:
        'Role access, workplace access, training and compliance.',
      areaCodes: [
        'ROLE_ACCESS',
        'WORKPLACE_ACCESS',
        'TRAINING',
        'COMPLIANCE'
      ]
    },
    {
      id: 'TEAM_READY',
      title: '3. Team and role readiness',
      description:
        'Team integration and final confirmation for your role.',
      areaCodes: [
        'TEAM_INTEGRATION',
        'ROLE_READY'
      ]
    }
  ];

  readonly selectedArea =
    computed<ReadinessAreaDetail | undefined>(
      () =>
        this.detail()?.areas.find(
          area =>
            area.code ===
            this.selectedAreaCode()
        )
    );

  readonly selectedTasks =
    computed<JoinerTaskDetail[]>(() =>
      (
        this.detail()?.tasks ?? []
      ).filter(
        task =>
          task.areaCode ===
          this.selectedAreaCode()
      )
    );

  readonly selectedEvidence =
    computed<EvidenceRecord[]>(() => {
      const joiner =
        this.detail();

      const area =
        this.selectedArea();

      if (!joiner || !area) {
        return [];
      }

      return area.evidenceIds
        .map(
          evidenceId =>
            joiner.evidence.find(
              evidence =>
                evidence.id === evidenceId
            )
        )
        .filter(
          (
            evidence
          ): evidence is EvidenceRecord =>
            Boolean(evidence)
        );
    });

  areaForCode(
    areaCode: ReadinessAreaCode
  ): ReadinessAreaDetail | undefined {
    return this.detail()?.areas.find(
      area => area.code === areaCode
    );
  }

  dependencyArea(
    areaCode: ReadinessAreaCode
  ): ReadinessAreaDetail | undefined {
    return this.detail()?.areas.find(
      area => area.code === areaCode
    );
  }

  selectArea(
    areaCode: ReadinessAreaCode
  ): void {
    this.selectedAreaCode.set(areaCode);
  }

  completeTask(
    taskId: string
  ): void {
    this.readinessStore.completeTask(
      this.joinerId(),
      taskId
    );
  }

  returnHome(): void {
    void this.router.navigateByUrl(
      '/me/home'
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

  evidenceStatusClass(
    status: EvidenceRecord['status']
  ): string {
    return `evidence-${status
      .toLowerCase()}`;
  }
}