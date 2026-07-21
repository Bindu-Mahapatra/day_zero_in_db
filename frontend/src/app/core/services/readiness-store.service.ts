import {
  Injectable,
  computed,
  signal
} from '@angular/core';

import {
  createHrOverview,
  createSyntheticJoiners
} from '../mock-data/readiness.seed';

import {
  createJoinerDetails
} from '../mock-data/joiner-details.seed';

import {
  JoinerDetail,
  JoinerSummary,
  ReadinessAreaDetail,
  ReadinessScoreExplanation,
  ReadinessStatus
} from '../models/readiness.model';

@Injectable({
  providedIn: 'root'
})
export class ReadinessStoreService {
  private actionSequence = 1;

  private readonly joinerState =
    signal<JoinerSummary[]>(
      createSyntheticJoiners()
    );

  private readonly detailState =
    signal<Record<string, JoinerDetail>>(
      createJoinerDetails(this.joinerState())
    );

  readonly joiners =
    this.joinerState.asReadonly();

  readonly joinerDetails =
    this.detailState.asReadonly();

  readonly hrOverview = computed(() =>
    createHrOverview(this.joinerState())
  );

  getJoiner(
    joinerId: string
  ): JoinerSummary | undefined {
    return this.joinerState().find(
      joiner => joiner.id === joinerId
    );
  }

  getJoinerDetail(
    joinerId: string
  ): JoinerDetail | undefined {
    return this.detailState()[joinerId];
  }

  findByStatus(
    status: ReadinessStatus
  ): JoinerSummary[] {
    return this.joinerState().filter(
      joiner => joiner.status === status
    );
  }

  approveRecommendation(
    joinerId: string
  ): void {
    this.updateDetail(
      joinerId,
      detail => {
        if (
          detail.aiRecommendation
            .approvalStatus !==
          'PENDING_APPROVAL'
        ) {
          return detail;
        }

        return {
          ...detail,

          aiRecommendation: {
            ...detail.aiRecommendation,
            approvalStatus: 'APPROVED'
          },

          timeline: [
            {
              id:
                `EVT-ACTION-${
                  this.actionSequence++
                }`,
              occurredAt:
                '21 Jul 2026, 8:45 PM',
              title:
                'AI recommendation approved',
              description:
                `Reminder to ${
                  detail.aiRecommendation.recipient
                } approved for sending.`,
              actor: 'Priya Mehta',
              eventType: 'ACTION'
            },
            ...detail.timeline
          ]
        };
      }
    );
  }

  dismissRecommendation(
    joinerId: string
  ): void {
    this.updateDetail(
      joinerId,
      detail => ({
        ...detail,

        aiRecommendation: {
          ...detail.aiRecommendation,
          approvalStatus: 'DISMISSED'
        },

        timeline: [
          {
            id:
              `EVT-ACTION-${
                this.actionSequence++
              }`,
            occurredAt:
              '21 Jul 2026, 8:45 PM',
            title:
              'AI recommendation dismissed',
            description:
              'The proposed reminder was dismissed after human review.',
            actor: 'Priya Mehta',
            eventType: 'ACTION'
          },
          ...detail.timeline
        ]
      })
    );
  }

  completeTask(
    joinerId: string,
    taskId: string
  ): void {
    let updatedScore: number | undefined;

    this.updateDetail(
      joinerId,
      detail => {
        const selectedTask =
          detail.tasks.find(
            task => task.id === taskId
          );

        if (
          !selectedTask ||
          selectedTask.status === 'COMPLETED'
        ) {
          return detail;
        }

        const updatedTasks =
          detail.tasks.map(task =>
            task.id === taskId
              ? {
                  ...task,
                  status: 'COMPLETED' as const
                }
              : task
          );

        const areaStillHasOpenTasks =
          updatedTasks.some(
            task =>
              task.areaCode ===
                selectedTask.areaCode &&
              task.status === 'OPEN'
          );

        const updatedAreas =
          detail.areas.map(area => {
            if (
              area.code !==
              selectedTask.areaCode
            ) {
              return area;
            }

            return {
              ...area,

              status: areaStillHasOpenTasks
                ? area.status
                : 'COMPLETE' as const,

              progress: areaStillHasOpenTasks
                ? area.progress
                : 100,

              blockerReason:
                areaStillHasOpenTasks
                  ? area.blockerReason
                  : null,

              lastUpdated:
                '21 Jul 2026, 9:10 PM'
            };
          });

        const scoreIncrease =
          selectedTask.priority === 'HIGH'
            ? 6
            : selectedTask.priority === 'MEDIUM'
              ? 4
              : 2;

        updatedScore = Math.min(
          100,
          detail.summary.readinessScore +
            scoreIncrease
        );

        return {
          ...detail,

          summary: {
            ...detail.summary,
            readinessScore: updatedScore
          },

          tenAreaProgress: updatedScore,

          scoreExplanation:
            this.calculateScoreExplanation(
              updatedAreas
            ),

          tasks: updatedTasks,
          areas: updatedAreas,

          timeline: [
            {
              id:
                `EVT-ACTION-${
                  this.actionSequence++
                }`,
              occurredAt:
                '21 Jul 2026, 9:10 PM',
              title: 'Task completed',
              description:
                selectedTask.title,
              actor: selectedTask.owner,
              eventType: 'ACTION'
            },
            ...detail.timeline
          ]
        };
      }
    );

    /*
    * Keep the portfolio and manager summary
    * in sync with JoinerDetail.
    */
    if (updatedScore !== undefined) {
      this.joinerState.update(
        currentJoiners =>
          currentJoiners.map(joiner =>
            joiner.id === joinerId
              ? {
                  ...joiner,
                  readinessScore:
                    updatedScore as number
                }
              : joiner
          )
      );
    }
  }

  resetDemoData(): void {
    const joiners =
      createSyntheticJoiners();

    this.joinerState.set(joiners);

    this.detailState.set(
      createJoinerDetails(joiners)
    );

    this.actionSequence = 1;
  }

  private calculateScoreExplanation(
    areas: ReadinessAreaDetail[]
  ): ReadinessScoreExplanation {
    return {
      completedAreas: areas.filter(
        area => area.status === 'COMPLETE'
      ).length,

      inProgressAreas: areas.filter(
        area =>
          area.status === 'IN_PROGRESS'
      ).length,

      blockedAreas: areas.filter(
        area => area.status === 'BLOCKED'
      ).length,

      pendingAreas: areas.filter(
        area =>
          area.status === 'NOT_STARTED'
      ).length,

      criticalBlockedWeight: areas
        .filter(
          area => area.status === 'BLOCKED'
        )
        .reduce(
          (total, area) =>
            total + area.weight,
          0
        )
    };
  }

  private updateDetail(
    joinerId: string,
    updater: (
      detail: JoinerDetail
    ) => JoinerDetail
  ): void {
    this.detailState.update(current => {
      const selected =
        current[joinerId];

      if (!selected) {
        return current;
      }

      return {
        ...current,
        [joinerId]: updater(selected)
      };
    });
  }
}