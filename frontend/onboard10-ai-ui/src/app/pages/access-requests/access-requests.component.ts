import { Component, inject } from '@angular/core';
import { OnboardingStateService } from '../../core/services/onboarding-state.service';

@Component({
  selector: 'app-access-requests',
  standalone: true,
  imports: [],
  templateUrl: './access-requests.component.html',
  styleUrl: './access-requests.component.scss'
})
export class AccessRequestsComponent {
  private readonly stateService = inject(OnboardingStateService);
  state = this.stateService.caseState;
}
