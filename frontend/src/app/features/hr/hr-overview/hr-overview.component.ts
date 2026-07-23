import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  ReadinessStoreService
} from '../../../core/services/readiness-store.service';
import {
  ReadinessStatus
} from '../../../core/models/readiness.model';

@Component({
  selector: 'app-hr-overview',
  standalone: true,
  templateUrl: './hr-overview.component.html',
  styleUrl: './hr-overview.component.scss'
})
export class HrOverviewComponent {
  private readonly router = inject(Router);
  private readonly readinessStore = inject(ReadinessStoreService);

  readonly overview = this.readinessStore.hrOverview;

  readonly distributionGradient = computed(() => {
    const overview = this.overview();
    const total = overview.totalJoiners || 1;

    const readyEnd =
      (overview.fullyReady / total) * 100;

    const attentionEnd =
      readyEnd +
      (overview.attentionRequired / total) * 100;

    const criticalEnd =
      attentionEnd +
      (overview.criticalRisk / total) * 100;

    return `conic-gradient(
      #27855f 0% ${readyEnd}%,
      #d48b19 ${readyEnd}% ${attentionEnd}%,
      #c53b4b ${attentionEnd}% ${criticalEnd}%,
      #b7bec8 ${criticalEnd}% 100%
    )`;
  });

  readonly readyTrendPoints = computed(() =>
    this.toPolyline(
      this.overview().trend.map(point => point.ready)
    )
  );

  readonly attentionTrendPoints = computed(() =>
    this.toPolyline(
      this.overview().trend.map(point => point.attention)
    )
  );

  readonly criticalTrendPoints = computed(() =>
    this.toPolyline(
      this.overview().trend.map(point => point.critical)
    )
  );

  openPortfolio(status?: ReadinessStatus): void {
    void this.router.navigate(
      ['/hr/joiners'],
      {
        queryParams: status
          ? { status }
          : {}
      }
    );
  }

  openJoiner(joinerId: string): void {
    void this.router.navigate([
      '/hr/joiners',
      joinerId
    ]);
  }

  statusClass(status: ReadinessStatus): string {
    return `status-${status.toLowerCase().replace('_', '-')}`;
  }

  blockerClass(
    severity: 'MEDIUM' | 'HIGH' | 'CRITICAL'
  ): string {
    return `severity-${severity.toLowerCase()}`;
  }

  private toPolyline(values: number[]): string {
    if (values.length === 0) {
      return '';
    }

    const width = 420;
    const height = 130;
    const padding = 10;
    const maximum = Math.max(...values, 1);
    const minimum = Math.min(...values);
    const range = Math.max(maximum - minimum, 1);

    return values
      .map((value, index) => {
        const x =
          padding +
          (index * (width - padding * 2)) /
            Math.max(values.length - 1, 1);

        const y =
          height -
          padding -
          ((value - minimum) / range) *
            (height - padding * 2);

        return `${x},${y}`;
      })
      .join(' ');
  }
}
