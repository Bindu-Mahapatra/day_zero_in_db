import {
  Component,
  DestroyRef,
  computed,
  inject,
  signal
} from '@angular/core';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import {
  takeUntilDestroyed
} from '@angular/core/rxjs-interop';

import {
  AreaStatus,
  BlockerSeverity,
  EvidenceRecord,
  TaskPriority
} from '../../../core/models/readiness.model';

import {
  ReadinessStoreService
} from '../../../core/services/readiness-store.service';

@Component({
  selector: 'app-joiner-360',
  standalone: true,
  templateUrl: './joiner-360.component.html',
  styleUrl: './joiner-360.component.scss'
})
export class Joiner360 {
  private readonly route =
    inject(ActivatedRoute);

  private readonly router =
    inject(Router);

  private readonly destroyRef =
    inject(DestroyRef);

  private readonly readinessStore =
    inject(ReadinessStoreService);

  readonly joinerId = signal('');

  readonly selectedEvidence =
    signal<EvidenceRecord | null>(null);

  readonly detail = computed(() =>
    this.readinessStore
      .joinerDetails()[this.joinerId()]
  );

  constructor() {
    this.route.paramMap
      .pipe(
        takeUntilDestroyed(
          this.destroyRef
        )
      )
      .subscribe(parameters => {
        this.joinerId.set(
          parameters.get('id') ?? ''
        );
      });
  }

  goBack(): void {
    const destination =
      this.router.url.startsWith(
        '/manager/'
      )
        ? '/manager/home'
        : '/hr/joiners';

    void this.router.navigateByUrl(
      destination
    );
  }

  approveRecommendation(): void {
    this.readinessStore
      .approveRecommendation(
        this.joinerId()
      );
  }

  dismissRecommendation(): void {
    this.readinessStore
      .dismissRecommendation(
        this.joinerId()
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

  openEvidenceById(
    evidenceId: string | undefined
  ): void {
    if (!evidenceId) {
      return;
    }

    const evidence =
      this.detail()?.evidence.find(
        record => record.id === evidenceId
      );

    if (evidence) {
      this.selectedEvidence.set(
        evidence
      );
    }
  }

  closeEvidence(): void {
    this.selectedEvidence.set(null);
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

  blockerClass(
    severity: BlockerSeverity
  ): string {
    return `severity-${severity.toLowerCase()}`;
  }

  priorityClass(
    priority: TaskPriority
  ): string {
    return `priority-${priority.toLowerCase()}`;
  }
}
