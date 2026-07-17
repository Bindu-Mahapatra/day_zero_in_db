import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OnboardingStateService } from '../../core/services/onboarding-state.service';

@Component({
  selector: 'app-policy-assistant',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './policy-assistant.component.html',
  styleUrl: './policy-assistant.component.scss'
})
export class PolicyAssistantComponent {
  private readonly stateService = inject(OnboardingStateService);
  state = this.stateService.caseState;
  question = '';

  suggestedQuestions = [
    'What approval is required for production access?',
    'How do I request JIRA access?',
    'What trainings are mandatory for my role?',
    'What is the process for privileged access?',
    'How is access reviewed and revoked?'
  ];

  ask(question = this.question): void {
    const trimmed = question.trim();
    if (!trimmed) return;
    this.stateService.sendPolicyQuestion(trimmed);
    this.question = '';
  }
}
