import { Component, inject } from '@angular/core';
import { OnboardingStateService } from '../../core/services/onboarding-state.service';

@Component({
  selector: 'app-manager-view',
  standalone: true,
  imports: [],
  templateUrl: './manager-view.component.html',
  styleUrl: './manager-view.component.scss'
})
export class ManagerViewComponent {
  private readonly stateService = inject(OnboardingStateService);
  state = this.stateService.caseState;

  approve(requestId: string): void {
    this.stateService.approveAccess(requestId);
  }

  requestInfo(requestId: string): void {
    this.stateService.requestMoreInfo(requestId);
  }
}
