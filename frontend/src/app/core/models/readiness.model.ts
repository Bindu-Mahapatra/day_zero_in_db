export type ReadinessStatus =
  | 'READY'
  | 'ATTENTION'
  | 'CRITICAL'
  | 'NOT_STARTED';

export type ReadinessAreaCode =
  | 'HR_PROFILE'
  | 'PRIMARY_IDENTITY'
  | 'DEVICE_TECH'
  | 'MFA_REMOTE_ACCESS'
  | 'ROLE_ACCESS'
  | 'WORKPLACE_ACCESS'
  | 'TRAINING'
  | 'COMPLIANCE'
  | 'TEAM_INTEGRATION'
  | 'ROLE_READY';

export interface JoinerSummary {
  id: string;
  displayName: string;
  email: string;
  role: string;
  department: string;
  division: string;
  location: string;
  managerId: string;
  managerName: string;
  joiningDate: string;
  daysToJoining: number;
  readinessScore: number;
  status: ReadinessStatus;
  topPendingItem: string;
  pendingOwner: string;
}

export interface PipelineStage {
  id: string;
  label: string;
  joinerCount: number;
  conversionPercentage: number;
}

export interface BlockerAggregate {
  id: string;
  label: string;
  affectedJoiners: number;
  owner: string;
  severity: 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

export interface ReadinessTrendPoint {
  label: string;
  ready: number;
  attention: number;
  critical: number;
}

export interface DepartmentDistribution {
  department: string;
  joinerCount: number;
  percentage: number;
}

export interface ReadinessDistribution {
  status: ReadinessStatus;
  label: string;
  count: number;
  percentage: number;
}

export interface HrOverviewSnapshot {
  totalJoiners: number;
  fullyReady: number;
  attentionRequired: number;
  criticalRisk: number;
  notStarted: number;

  pipeline: PipelineStage[];
  distribution: ReadinessDistribution[];
  blockers: BlockerAggregate[];
  trend: ReadinessTrendPoint[];
  departments: DepartmentDistribution[];
  upcomingJoiners: JoinerSummary[];

  lastUpdated: string;
  aiInsight: {
    title: string;
    summary: string;
    riskFactors: string[];
  };
}

export const READINESS_STATUS_LABELS: Record<ReadinessStatus, string> = {
  READY: 'Ready',
  ATTENTION: 'Attention required',
  CRITICAL: 'Critical',
  NOT_STARTED: 'Not started'
};

export type AreaStatus =
  | 'COMPLETE'
  | 'IN_PROGRESS'
  | 'BLOCKED'
  | 'NOT_STARTED';

export type EvidenceStatus =
  | 'VERIFIED'
  | 'PENDING'
  | 'STALE';

export type BlockerSeverity =
  | 'MEDIUM'
  | 'HIGH'
  | 'CRITICAL';

export type TaskStatus =
  | 'OPEN'
  | 'COMPLETED';

export type TaskPriority =
  | 'LOW'
  | 'MEDIUM'
  | 'HIGH';

export type ApprovalStatus =
  | 'PENDING_APPROVAL'
  | 'APPROVED'
  | 'DISMISSED';

export interface ReadinessAreaDetail {
  code: ReadinessAreaCode;
  sequence: number;
  title: string;
  description: string;
  owner: string;
  status: AreaStatus;
  progress: number;
  weight: number;
  lastUpdated: string;
  blockerReason: string | null;
  evidenceIds: string[];
  dependencyCodes: ReadinessAreaCode[];
}

export interface EvidenceRecord {
  id: string;
  title: string;
  sourceSystem: string;
  sourceReference: string;
  status: EvidenceStatus;
  observedValue: string;
  capturedAt: string;
  capturedBy: string;
  description: string;
}

export interface JoinerBlocker {
  id: string;
  title: string;
  description: string;
  severity: BlockerSeverity;
  owner: string;
  areaCode: ReadinessAreaCode;
  openedAt: string;
  ageInDays: number;
  evidenceIds: string[];
  recommendedAction: string;
}

export interface JoinerTaskDetail {
  id: string;
  title: string;
  description: string;
  owner: string;
  ownerType: 'JOINER' | 'MANAGER' | 'HR' | 'SERVICE_TEAM';
  areaCode: ReadinessAreaCode;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
}

export interface TimelineEvent {
  id: string;
  occurredAt: string;
  title: string;
  description: string;
  actor: string;
  eventType:
    | 'STATUS_CHANGE'
    | 'EVIDENCE'
    | 'ACTION'
    | 'AI_RECOMMENDATION';
}

export interface AiRecommendation {
  id: string;
  title: string;
  summary: string;
  recommendedAction: string;
  recipient: string;
  confidence: number;
  approvalStatus: ApprovalStatus;
  evidenceIds: string[];
  generatedAt: string;
  disclaimer: string;
}

export interface ReadinessScoreExplanation {
  completedAreas: number;
  inProgressAreas: number;
  blockedAreas: number;
  pendingAreas: number;
  criticalBlockedWeight: number;
}

export interface JoinerDetail {
  summary: JoinerSummary;
  overallAssessment: string;
  tenAreaProgress: number;
  scoreExplanation: ReadinessScoreExplanation;
  areas: ReadinessAreaDetail[];
  blockers: JoinerBlocker[];
  tasks: JoinerTaskDetail[];
  evidence: EvidenceRecord[];
  timeline: TimelineEvent[];
  aiRecommendation: AiRecommendation;
}