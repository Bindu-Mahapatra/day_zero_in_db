import { Component, inject } from '@angular/core';
import { OnboardingStateService } from '../../core/services/onboarding-state.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {
  private readonly stateService = inject(OnboardingStateService);
  state = this.stateService.caseState;
}
