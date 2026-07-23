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
  BackendApprovalRequest,
  BackendApprovalResponse,
  BackendAssistantQueryRequest,
  BackendAssistantResponse,
  BackendAuditEvent,
  BackendHealthResponse
} from '../models/backend-api.model';

import {
  Persona
} from '../models/persona.model';

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

  private readonly apiBaseUrl =
    'http://localhost:8081/api/v1';

  private messageSequence = 1;

  health(): Observable<BackendHealthResponse> {
    return this.http.get<BackendHealthResponse>(
      `${this.apiBaseUrl}/health`
    );
  }

  ask(
    query: string,
    persona: Persona,
    userId: string
  ): Observable<AssistantMessage> {
    const request:
      BackendAssistantQueryRequest = {
        query,
        persona,
        userId
      };

    return this.http
      .post<BackendAssistantResponse>(
        `${this.apiBaseUrl}/assistant/query`,
        request
      )
      .pipe(
        map(response =>
          this.mapAssistantResponse(response)
        )
      );
  }

  approveRecommendation(
    request: BackendApprovalRequest
  ): Observable<BackendApprovalResponse> {
    return this.http
      .post<BackendApprovalResponse>(
        `${this.apiBaseUrl}/actions/approve`,
        request
      );
  }

  getAuditEvents():
    Observable<BackendAuditEvent[]> {
    return this.http.get<BackendAuditEvent[]>(
      `${this.apiBaseUrl}/audit-events`
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
