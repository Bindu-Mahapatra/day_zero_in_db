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