import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OnboardingStateService } from '../../core/services/onboarding-state.service';

@Component({
  selector: 'app-journey',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './journey.component.html',
  styleUrl: './journey.component.scss'
})
export class JourneyComponent {
  private readonly stateService = inject(OnboardingStateService);
  state = this.stateService.caseState;
}
