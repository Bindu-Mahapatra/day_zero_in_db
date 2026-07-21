import { Injectable, computed, signal } from '@angular/core';
import {
  createHrOverview,
  createSyntheticJoiners
} from '../mock-data/readiness.seed';
import {
  JoinerSummary,
  ReadinessStatus
} from '../models/readiness.model';

@Injectable({
  providedIn: 'root'
})
export class ReadinessStoreService {
  private readonly joinerState = signal<JoinerSummary[]>(
    createSyntheticJoiners()
  );

  readonly joiners = this.joinerState.asReadonly();

  readonly hrOverview = computed(() =>
    createHrOverview(this.joinerState())
  );

  getJoiner(joinerId: string): JoinerSummary | undefined {
    return this.joinerState().find(joiner => joiner.id === joinerId);
  }

  findByStatus(status: ReadinessStatus): JoinerSummary[] {
    return this.joinerState().filter(joiner => joiner.status === status);
  }

  resetDemoData(): void {
    this.joinerState.set(createSyntheticJoiners());
  }
}