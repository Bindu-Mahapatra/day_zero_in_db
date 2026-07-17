import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OnboardingStateService } from '../../core/services/onboarding-state.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent {
  private readonly stateService = inject(OnboardingStateService);
  state = this.stateService.caseState;
}
