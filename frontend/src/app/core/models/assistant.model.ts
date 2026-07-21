export type AssistantMessageRole =
  | 'USER'
  | 'ASSISTANT';

export type AssistantActionType =
  | 'OPEN_JOINER'
  | 'APPROVE_RECOMMENDATION';

export interface AssistantCitation {
  id: string;
  joinerId: string;
  joinerName: string;
  evidenceId: string;
  title: string;
  sourceSystem: string;
  sourceReference: string;
  observedValue: string;
  capturedAt: string;
}

export interface AssistantAction {
  id: string;
  label: string;
  actionType: AssistantActionType;
  joinerId: string;
}

export interface AssistantMessage {
  id: string;
  role: AssistantMessageRole;
  heading?: string;
  content: string;
  createdAt: string;
  citations: AssistantCitation[];
  actions: AssistantAction[];
  disclaimer?: string;
}

export interface AssistantSuggestion {
  id: string;
  label: string;
  query: string;
}