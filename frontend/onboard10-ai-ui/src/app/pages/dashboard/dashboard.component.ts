import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OnboardingStateService } from '../../core/services/onboarding-state.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  private readonly stateService = inject(OnboardingStateService);
  state = this.stateService.caseState;
  summary = this.stateService.dashboardSummary;

  generateJourney(): void {
    this.stateService.generateJourney();
  }
}
