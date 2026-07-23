import {
  AssistantActionType
} from './assistant.model';

export interface BackendHealthResponse {
  status: string;
  service: string;
  version: string;
  timestamp: string;
}

export interface BackendAssistantQueryRequest {
  query: string;
  persona: string;
  userId: string;
}

export interface BackendAssistantCitation {
  evidenceId: string;
  title: string;
  sourceSystem: string;
  sourceReference: string;
  observedValue: string;
  capturedAt: string;
}

export interface BackendProposedAction {
  actionType: AssistantActionType;
  label: string;
  joinerId: string;
  recommendationId: string | null;
}

export interface BackendAssistantResponse {
  heading: string;
  answer: string;
  citations: BackendAssistantCitation[];
  actions: BackendProposedAction[];
  disclaimer: string;
}

export interface BackendApprovalRequest {
  joinerId: string;
  recommendationId: string;
  approvedBy: string;
}

export interface BackendApprovalResponse {
  status:
    | 'APPROVED'
    | 'ALREADY_APPROVED';

  auditEventId: string;
  notificationId: string | null;
  approvedAt: string;
}

export interface BackendAuditEvent {
  eventId: string;
  eventType: string;
  actor: string;
  joinerId: string;
  description: string;
  occurredAt: string;
  metadata: Record<string, string>;
}
