import { Component, inject } from '@angular/core';
import { OnboardingStateService } from '../../core/services/onboarding-state.service';

@Component({
  selector: 'app-missing-info',
  standalone: true,
  imports: [],
  templateUrl: './missing-info.component.html',
  styleUrl: './missing-info.component.scss'
})
export class MissingInfoComponent {
  private readonly stateService = inject(OnboardingStateService);
  state = this.stateService.caseState;

  assignReviewer(): void {
    this.stateService.assignReviewer();
  }
}
