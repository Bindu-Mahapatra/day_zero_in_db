import { Component, inject } from '@angular/core';
import { OnboardingStateService } from '../../core/services/onboarding-state.service';

@Component({
  selector: 'app-readiness-score',
  standalone: true,
  imports: [],
  templateUrl: './readiness-score.component.html',
  styleUrl: './readiness-score.component.scss'
})
export class ReadinessScoreComponent {
  private readonly stateService = inject(OnboardingStateService);
  state = this.stateService.caseState;
}
