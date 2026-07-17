export type RiskLevel = 'Low' | 'Medium' | 'High';
export type StepStatus = 'Completed' | 'In Progress' | 'Pending' | 'Blocked';
export type AccessStatus = 'Approved' | 'In Progress' | 'Pending' | 'Rejected' | 'Needs Info';
export type TrainingStatus = 'Completed' | 'In Progress' | 'Pending';
export type ActorType = 'AI Agent' | 'Joiner' | 'Manager' | 'IAM Team' | 'System';

export interface JoinerProfile {
  profileId: string;
  fullName: string;
  role: string;
  team: string;
  application: string;
  location: string;
  manager: string;
  managerEmail: string;
  employmentType: string;
  startDate: string;
}

export interface ExtractedField {
  label: string;
  value: string;
  confidence: number;
  source: string;
}

export interface MissingInformation {
  id: string;
  title: string;
  description: string;
  severity: RiskLevel;
  owner: string;
  resolved: boolean;
}

export interface JourneyAction {
  id: string;
  title: string;
  completed: boolean;
}

export interface JourneyStep {
  id: number;
  key: string;
  title: string;
  description: string;
  status: StepStatus;
  riskLevel: RiskLevel;
  owner: string;
  dueDate: string;
  dependency: string;
  aiGenerated: boolean;
  requirements: string[];
  aiAnalysis: string[];
  policyEvidence: string[];
  actions: JourneyAction[];
  recommendation: string;
}

export interface Training {
  id: string;
  title: string;
  type: 'Mandatory' | 'Recommended';
  duration: string;
  status: TrainingStatus;
  dueDate: string;
}

export interface AccessRequest {
  id: string;
  system: string;
  accessType: string;
  status: AccessStatus;
  requestedOn: string;
  riskLevel: RiskLevel;
  requestedBy: string;
  recommendedAction: 'Approve' | 'Request Info' | 'Reject' | 'Manual Review';
  justification?: string;
}

export interface TaskItem {
  id: string;
  title: string;
  priority: RiskLevel;
  dueDate: string;
  assignedTo: string;
  completed: boolean;
}

export interface ReadinessScore {
  overall: number;
  training: number;
  access: number;
  compliance: number;
  documentation: number;
  teamOnboarding: number;
  blockers: string[];
}

export interface AgentActivity {
  id: string;
  title: string;
  description: string;
  actor: ActorType;
  timestamp: string;
  type: 'analysis' | 'recommendation' | 'approval' | 'blocker' | 'notification';
}

export interface PolicyChatMessage {
  id: string;
  role: 'user' | 'assistant';
  message: string;
  sources?: string[];
  confidence?: 'Low' | 'Medium' | 'High';
}

export interface OnboardingCase {
  caseId: string;
  profile: JoinerProfile;
  profileAnalysed: boolean;
  profileConfidence: number;
  extractedFields: ExtractedField[];
  missingInformation: MissingInformation[];
  journey: JourneyStep[];
  trainings: Training[];
  accessRequests: AccessRequest[];
  tasks: TaskItem[];
  readiness: ReadinessScore;
  agentActivity: AgentActivity[];
  chatMessages: PolicyChatMessage[];
}
