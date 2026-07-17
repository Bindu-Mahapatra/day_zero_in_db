import { computed, Injectable, signal } from '@angular/core';
import { MOCK_ONBOARDING_CASE } from '../mock-data/onboarding-case.mock';
import { AccessRequest, AgentActivity, OnboardingCase, PolicyChatMessage, Training } from '../models/onboarding.models';

function cloneCase(): OnboardingCase {
  return JSON.parse(JSON.stringify(MOCK_ONBOARDING_CASE)) as OnboardingCase;
}

@Injectable({ providedIn: 'root' })
export class OnboardingStateService {
  private readonly caseSignal = signal<OnboardingCase>(cloneCase());

  readonly caseState = computed(() => this.caseSignal());
  readonly dashboardSummary = computed(() => {
    const state = this.caseSignal();
    return {
      profile: state.profile,
      readiness: state.readiness,
      completedSteps: state.journey.filter(s => s.status === 'Completed').length,
      inProgressSteps: state.journey.filter(s => s.status === 'In Progress').length,
      pendingSteps: state.journey.filter(s => s.status === 'Pending').length,
      blockedSteps: state.journey.filter(s => s.status === 'Blocked').length,
      openTasks: state.tasks.filter(t => !t.completed).length,
      highRiskRequests: state.accessRequests.filter(r => r.riskLevel === 'High' && r.status !== 'Approved').length
    };
  });

  resetDemo(): void {
    this.caseSignal.set(cloneCase());
  }

  analyseProfile(): void {
    this.caseSignal.update(state => ({
      ...state,
      profileAnalysed: true,
      profileConfidence: 94,
      agentActivity: [this.activity('Profile analysis completed', 'Joiner profile extracted with 94% confidence. Missing fields were identified.', 'AI Agent', 'analysis'), ...state.agentActivity]
    }));
  }

  generateJourney(): void {
    this.caseSignal.update(state => ({
      ...state,
      agentActivity: [this.activity('10-step journey generated', 'AI generated a personalised journey based on role, team, location and access needs.', 'AI Agent', 'recommendation'), ...state.agentActivity]
    }));
  }

  completeTraining(trainingId: string): void {
    this.caseSignal.update(state => {
      const trainings = state.trainings.map(training =>
        training.id === trainingId ? { ...training, status: 'Completed' as Training['status'] } : training
      );
      const readiness = {
        ...state.readiness,
        overall: Math.max(state.readiness.overall, 78),
        training: 100,
        blockers: state.readiness.blockers.filter(b => !b.toLowerCase().includes('training'))
      };
      return {
        ...state,
        trainings,
        readiness,
        agentActivity: [this.activity('Training completed', 'Training blocker resolved and readiness score recalculated.', 'AI Agent', 'analysis'), ...state.agentActivity]
      };
    });
  }

  assignReviewer(): void {
    this.caseSignal.update(state => {
      const missingInformation = state.missingInformation.map(item =>
        item.id === 'access-reviewer' ? { ...item, resolved: true } : item
      );
      const journey = state.journey.map(step => {
        if (step.key !== 'github-access') return step;
        return {
          ...step,
          actions: step.actions.map(action => action.id === 'a6' ? { ...action, completed: true } : action),
          aiAnalysis: [...step.aiAnalysis.filter(a => a !== 'Access reviewer missing.'), 'Access reviewer assigned.']
        };
      });
      return {
        ...state,
        missingInformation,
        journey,
        agentActivity: [this.activity('Access reviewer assigned', 'GitHub access can now move to manager approval.', 'Manager', 'approval'), ...state.agentActivity]
      };
    });
  }

  approveAccess(requestId: string): void {
    this.caseSignal.update(state => {
      const accessRequests = state.accessRequests.map(request =>
        request.id === requestId ? { ...request, status: 'Approved' as AccessRequest['status'] } : request
      );

      const journey = state.journey.map(step => {
        if (requestId === 'ar-1' && step.key === 'github-access') {
          return {
            ...step,
            status: 'Completed' as const,
            actions: step.actions.map(action => ({ ...action, completed: true })),
            recommendation: 'GitHub access approved. Proceed with application onboarding.'
          };
        }
        if (requestId === 'ar-1' && step.key === 'application-onboarding') {
          return { ...step, status: 'In Progress' as const };
        }
        return step;
      });

      const tasks = state.tasks.map(task =>
        task.title.toLowerCase().includes('github') ? { ...task, completed: true } : task
      );

      const readiness = {
        ...state.readiness,
        overall: 86,
        access: 85,
        blockers: state.readiness.blockers.filter(b => !b.toLowerCase().includes('github'))
      };

      return {
        ...state,
        accessRequests,
        journey,
        tasks,
        readiness,
        agentActivity: [this.activity('GitHub access approved', 'Manager approved GitHub access. Readiness increased from 73% to 86%.', 'Manager', 'approval'), ...state.agentActivity]
      };
    });
  }

  requestMoreInfo(requestId: string): void {
    this.caseSignal.update(state => {
      const accessRequests = state.accessRequests.map(request =>
        request.id === requestId ? { ...request, status: 'Needs Info' as AccessRequest['status'] } : request
      );
      return {
        ...state,
        accessRequests,
        agentActivity: [this.activity('More information requested', 'High-risk production access requires a documented business justification.', 'Manager', 'blocker'), ...state.agentActivity]
      };
    });
  }

  sendPolicyQuestion(question: string): void {
    const userMessage: PolicyChatMessage = {
      id: `chat-${Date.now()}-user`,
      role: 'user',
      message: question
    };

    const answer = this.answerPolicyQuestion(question);
    const assistantMessage: PolicyChatMessage = {
      id: `chat-${Date.now()}-assistant`,
      role: 'assistant',
      message: answer.message,
      sources: answer.sources,
      confidence: 'High'
    };

    this.caseSignal.update(state => ({
      ...state,
      chatMessages: [...state.chatMessages, userMessage, assistantMessage],
      agentActivity: [this.activity('Policy answer generated', 'Policy Assistant answered a user question with cited evidence.', 'AI Agent', 'analysis'), ...state.agentActivity]
    }));
  }

  private answerPolicyQuestion(question: string): { message: string; sources: string[] } {
    const q = question.toLowerCase();
    if (q.includes('production') || q.includes('privileged')) {
      return {
        message: 'Production access requires manager approval, application-owner approval, completed mandatory security training, documented business justification and access reviewer validation. The AI recommendation is to request more information when justification is missing.',
        sources: ['Production Access Policy v2.3 §4.1', 'Privileged Access Standard §2.6']
      };
    }
    if (q.includes('jira')) {
      return {
        message: 'JIRA project access is part of the low-risk developer baseline when the manager has approved the onboarding path and the project key is linked to the joiner team.',
        sources: ['Collaboration Access Baseline §2.4']
      };
    }
    if (q.includes('training')) {
      return {
        message: 'For a developer persona, mandatory trainings include Secure SDLC, Data Privacy & Protection, and Information Security Awareness. GitHub Advanced Security is recommended for source-code contributors.',
        sources: ['Training Standard §2.1', 'Secure SDLC Policy §3.1']
      };
    }
    return {
      message: 'The onboarding control tower uses role, location, employment type, team and requested access to generate a 10-step journey. High-risk actions remain human-approved and every recommendation is logged with evidence.',
      sources: ['Joiner Control Standard §1.2', 'Responsible AI Control Note §5.1']
    };
  }

  private activity(title: string, description: string, actor: AgentActivity['actor'], type: AgentActivity['type']): AgentActivity {
    return {
      id: `act-${Date.now()}`,
      title,
      description,
      actor,
      type,
      timestamp: new Date().toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })
    };
  }
}
