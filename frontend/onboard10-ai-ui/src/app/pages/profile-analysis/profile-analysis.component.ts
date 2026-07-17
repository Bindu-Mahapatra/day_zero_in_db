import { Component, inject } from '@angular/core';
import { OnboardingStateService } from '../../core/services/onboarding-state.service';

@Component({
  selector: 'app-profile-analysis',
  standalone: true,
  imports: [],
  templateUrl: './profile-analysis.component.html',
  styleUrl: './profile-analysis.component.scss'
})
export class ProfileAnalysisComponent {
  private readonly stateService = inject(OnboardingStateService);
  state = this.stateService.caseState;

  analyseProfile(): void {
    this.stateService.analyseProfile();
  }
}
