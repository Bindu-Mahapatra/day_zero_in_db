import {
  Injectable,
  inject
} from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable,
  map
} from 'rxjs';

import {
  AssistantMessage
} from '../models/assistant.model';

import {
  API_BASE_URL
} from '../config/api.config';

import {
  AgentPlanResponse,
  BackendApprovalRequest,
  BackendApprovalResponse,
  BackendAssistantQueryRequest,
  BackendAssistantResponse,
  BackendAuditEvent,
  BackendHealthResponse
} from '../models/backend-api.model';

import {
  ReadinessStoreService
} from './readiness-store.service';

@Injectable({
  providedIn: 'root'
})
export class ReadypathBackendService {
  private readonly http =
    inject(HttpClient);

  private readonly readinessStore =
    inject(ReadinessStoreService);

  private messageSequence = 1;

  health(): Observable<BackendHealthResponse> {
    return this.http.get<BackendHealthResponse>(
      `${API_BASE_URL}/health`
    );
  }

  ask(
    query: string
  ): Observable<AssistantMessage> {
    const request:
      BackendAssistantQueryRequest = {
        query
      };

    return this.http
      .post<BackendAssistantResponse>(
        `${API_BASE_URL}/assistant/query`,
        request
      )
      .pipe(
        map(response =>
          this.mapAssistantResponse(response)
        )
      );
  }

  plan(
    question: string
  ): Observable<AgentPlanResponse> {
    return this.http
      .post<AgentPlanResponse>(
        `${API_BASE_URL}/agent/plan`,
        {
          question
        }
      );
  }

  approveRecommendation(
    request: BackendApprovalRequest
  ): Observable<BackendApprovalResponse> {
    return this.http
      .post<BackendApprovalResponse>(
        `${API_BASE_URL}/actions/approve`,
        request
      );
  }

  getAuditEvents():
    Observable<BackendAuditEvent[]> {
    return this.http.get<BackendAuditEvent[]>(
      `${API_BASE_URL}/audit-events`
    );
  }

  private mapAssistantResponse(
    response: BackendAssistantResponse
  ): AssistantMessage {
    /*
     * The current Java assistant is scoped to
     * the golden Maya scenario.
     *
     * Use the response action to identify the
     * cited joiner. Fall back to J-1001.
     */
    const primaryJoinerId =
      response.actions.find(
        action => Boolean(action.joinerId)
      )?.joinerId ?? 'J-1001';

    const joinerName =
      this.readinessStore
        .getJoiner(primaryJoinerId)
        ?.displayName ??
      primaryJoinerId;

    return {
      id:
        `BACKEND-ASSISTANT-${
          this.messageSequence++
        }`,

      role: 'ASSISTANT',

      heading: response.heading,

      content: response.answer,

      createdAt: 'Just now',

      citations:
        response.citations.map(
          citation => ({
            id:
              `${primaryJoinerId}-${citation.evidenceId}`,

            joinerId:
              primaryJoinerId,

            joinerName,

            evidenceId:
              citation.evidenceId,

            title:
              citation.title,

            sourceSystem:
              citation.sourceSystem,

            sourceReference:
              citation.sourceReference,

            observedValue:
              citation.observedValue,

            capturedAt:
              citation.capturedAt
          })
        ),

      actions:
        response.actions.map(
          (
            action,
            index
          ) => ({
            id:
              `BACKEND-ACTION-${index}-${action.joinerId}`,

            label:
              action.label,

            actionType:
              action.actionType,

            joinerId:
              action.joinerId,

            recommendationId:
              action.recommendationId ??
              undefined
          })
        ),

      disclaimer:
        response.disclaimer
    };
  }
}
