import { Component, inject } from '@angular/core';
import { OnboardingStateService } from '../../core/services/onboarding-state.service';

@Component({
  selector: 'app-trainings',
  standalone: true,
  imports: [],
  templateUrl: './trainings.component.html',
  styleUrl: './trainings.component.scss'
})
export class TrainingsComponent {
  private readonly stateService = inject(OnboardingStateService);
  state = this.stateService.caseState;

  completeTraining(id: string): void { this.stateService.completeTraining(id); }
}
