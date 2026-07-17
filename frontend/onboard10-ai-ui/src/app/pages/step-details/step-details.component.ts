import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OnboardingStateService } from '../../core/services/onboarding-state.service';

@Component({
  selector: 'app-step-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './step-details.component.html',
  styleUrl: './step-details.component.scss'
})
export class StepDetailsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly stateService = inject(OnboardingStateService);
  state = this.stateService.caseState;
  stepId = Number(this.route.snapshot.paramMap.get('id') ?? 3);
  step = computed(() => this.state().journey.find(s => s.id === this.stepId) ?? this.state().journey[2]);

  assignReviewer(): void {
    this.stateService.assignReviewer();
  }
}
