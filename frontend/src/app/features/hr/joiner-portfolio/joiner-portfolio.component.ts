import {
  Component,
  DestroyRef,
  computed,
  inject,
  signal
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import {
  JoinerSummary,
  ReadinessStatus
} from '../../../core/models/readiness.model';
import {
  ReadinessStoreService
} from '../../../core/services/readiness-store.service';

type StatusFilter = ReadinessStatus | 'ALL';

interface PortfolioSummary {
  total: number;
  ready: number;
  attention: number;
  critical: number;
  averageDaysToReady: number;
}

@Component({
  selector: 'app-joiner-portfolio',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './joiner-portfolio.component.html',
  styleUrl: './joiner-portfolio.component.scss'
})
export class JoinerPortfolio {
  private readonly readinessStore = inject(ReadinessStoreService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly searchTerm = signal('');
  readonly statusFilter = signal<StatusFilter>('ALL');
  readonly departmentFilter = signal('ALL');
  readonly locationFilter = signal('ALL');

  readonly currentPage = signal(1);
  readonly pageSize = 8;

  readonly joiners = this.readinessStore.joiners;

  readonly summary = computed<PortfolioSummary>(() => {
    const joiners = this.joiners();

    const averageDaysToReady =
      joiners.length === 0
        ? 0
        : joiners.reduce(
            (total, joiner) => total + joiner.daysToJoining,
            0
          ) / joiners.length;

    return {
      total: joiners.length,
      ready: joiners.filter(
        joiner => joiner.status === 'READY'
      ).length,
      attention: joiners.filter(
        joiner => joiner.status === 'ATTENTION'
      ).length,
      critical: joiners.filter(
        joiner => joiner.status === 'CRITICAL'
      ).length,
      averageDaysToReady: Number(
        averageDaysToReady.toFixed(1)
      )
    };
  });

  readonly departments = computed(() =>
    this.uniqueSorted(
      this.joiners().map(joiner => joiner.department)
    )
  );

  readonly locations = computed(() =>
    this.uniqueSorted(
      this.joiners().map(joiner => joiner.location)
    )
  );

  readonly filteredJoiners = computed(() => {
    const search = this.searchTerm()
      .trim()
      .toLowerCase();

    const status = this.statusFilter();
    const department = this.departmentFilter();
    const location = this.locationFilter();

    return this.joiners()
      .filter(joiner => {
        if (status !== 'ALL' && joiner.status !== status) {
          return false;
        }

        if (
          department !== 'ALL' &&
          joiner.department !== department
        ) {
          return false;
        }

        if (
          location !== 'ALL' &&
          joiner.location !== location
        ) {
          return false;
        }

        if (!search) {
          return true;
        }

        const searchableText = [
          joiner.displayName,
          joiner.email,
          joiner.role,
          joiner.department,
          joiner.division,
          joiner.location,
          joiner.managerName,
          joiner.topPendingItem,
          joiner.pendingOwner
        ]
          .join(' ')
          .toLowerCase();

        return searchableText.includes(search);
      })
      .sort((left, right) => {
        const statusDifference =
          this.statusPriority(left.status) -
          this.statusPriority(right.status);

        if (statusDifference !== 0) {
          return statusDifference;
        }

        return left.joiningDate.localeCompare(
          right.joiningDate
        );
      });
  });

  readonly totalPages = computed(() =>
    Math.max(
      1,
      Math.ceil(
        this.filteredJoiners().length / this.pageSize
      )
    )
  );

  readonly paginatedJoiners = computed(() => {
    const validPage = Math.min(
      this.currentPage(),
      this.totalPages()
    );

    const startIndex =
      (validPage - 1) * this.pageSize;

    return this.filteredJoiners().slice(
      startIndex,
      startIndex + this.pageSize
    );
  });

  readonly rangeStart = computed(() => {
    if (this.filteredJoiners().length === 0) {
      return 0;
    }

    return (
      (this.currentPage() - 1) * this.pageSize + 1
    );
  });

  readonly rangeEnd = computed(() =>
    Math.min(
      this.currentPage() * this.pageSize,
      this.filteredJoiners().length
    )
  );

  readonly pageNumbers = computed(() => {
    const total = this.totalPages();
    const current = this.currentPage();

    const start = Math.max(
      1,
      Math.min(current - 2, total - 4)
    );

    const end = Math.min(total, start + 4);

    return Array.from(
      { length: end - start + 1 },
      (_, index) => start + index
    );
  });

  constructor() {
    this.route.queryParamMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(parameters => {
        this.searchTerm.set(parameters.get('q') ?? '');

        this.statusFilter.set(
          this.parseStatus(parameters.get('status'))
        );

        this.departmentFilter.set(
          parameters.get('department') ?? 'ALL'
        );

        this.locationFilter.set(
          parameters.get('location') ?? 'ALL'
        );

        const requestedPage = Number(
          parameters.get('page') ?? '1'
        );

        this.currentPage.set(
          Number.isInteger(requestedPage) &&
          requestedPage > 0
            ? requestedPage
            : 1
        );

        queueMicrotask(() => {
          if (this.currentPage() > this.totalPages()) {
            this.setPage(this.totalPages());
          }
        });

      });
  }

  setSearch(value: string): void {
    this.searchTerm.set(value);
    this.currentPage.set(1);
    this.updateQueryParameters();
  }

  setStatus(value: StatusFilter): void {
    this.statusFilter.set(value);
    this.currentPage.set(1);
    this.updateQueryParameters();
  }

  setDepartment(value: string): void {
    this.departmentFilter.set(value);
    this.currentPage.set(1);
    this.updateQueryParameters();
  }

  setLocation(value: string): void {
    this.locationFilter.set(value);
    this.currentPage.set(1);
    this.updateQueryParameters();
  }

  setPage(page: number): void {
    const validPage = Math.min(
      Math.max(page, 1),
      this.totalPages()
    );

    this.currentPage.set(validPage);
    this.updateQueryParameters();
  }

  resetFilters(): void {
    this.searchTerm.set('');
    this.statusFilter.set('ALL');
    this.departmentFilter.set('ALL');
    this.locationFilter.set('ALL');
    this.currentPage.set(1);

    void this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: {},
        replaceUrl: true
      }
    );
  }

  openJoiner(joinerId: string): void {
    void this.router.navigate([
      '/hr/joiners',
      joinerId
    ]);
  }

  statusClass(status: StatusFilter): string {
    if (status === 'ALL') {
      return 'status-all';
    }

    return `status-${status
      .toLowerCase()
      .replaceAll('_', '-')}`;
  }

  statusLabel(status: StatusFilter): string {
    switch (status) {
      case 'ALL':
        return 'All statuses';

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

  trackJoiner(
    _index: number,
    joiner: JoinerSummary
  ): string {
    return joiner.id;
  }

  private updateQueryParameters(): void {
    void this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: {
          q: this.searchTerm() || null,
          status:
            this.statusFilter() === 'ALL'
              ? null
              : this.statusFilter(),
          department:
            this.departmentFilter() === 'ALL'
              ? null
              : this.departmentFilter(),
          location:
            this.locationFilter() === 'ALL'
              ? null
              : this.locationFilter(),
          page:
            this.currentPage() === 1
              ? null
              : this.currentPage()
        },
        queryParamsHandling: 'merge',
        replaceUrl: true
      }
    );
  }

  private parseStatus(
    value: string | null
  ): StatusFilter {
    const validStatuses: ReadinessStatus[] = [
      'READY',
      'ATTENTION',
      'CRITICAL',
      'NOT_STARTED'
    ];

    if (
      value &&
      validStatuses.includes(
        value as ReadinessStatus
      )
    ) {
      return value as ReadinessStatus;
    }

    return 'ALL';
  }

  private uniqueSorted(
    values: string[]
  ): string[] {
    return Array
      .from(new Set(values))
      .sort((left, right) =>
        left.localeCompare(right)
      );
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
}