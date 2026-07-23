import {
  AiRecommendation,
  AreaStatus,
  EvidenceRecord,
  JoinerDetail,
  JoinerSummary,
  ReadinessAreaCode,
  ReadinessAreaDetail
} from '../models/readiness.model';

interface AreaDefinition {
  code: ReadinessAreaCode;
  title: string;
  description: string;
  owner: string;
  weight: number;
}

const AREA_DEFINITIONS: AreaDefinition[] = [
  {
    code: 'HR_PROFILE',
    title: 'HR Profile',
    description:
      'Core employment, location and organisational information.',
    owner: 'HR Operations',
    weight: 10
  },
  {
    code: 'PRIMARY_IDENTITY',
    title: 'Primary Identity',
    description:
      'Employee identity, corporate account and identity verification.',
    owner: 'Identity Operations',
    weight: 12
  },
  {
    code: 'DEVICE_TECH',
    title: 'Device & Technology',
    description:
      'Laptop allocation, standard software and technology setup.',
    owner: 'Local IT Support',
    weight: 12
  },
  {
    code: 'MFA_REMOTE_ACCESS',
    title: 'MFA & Remote Access',
    description:
      'Multi-factor authentication and approved remote connectivity.',
    owner: 'IT Security',
    weight: 10
  },
  {
    code: 'ROLE_ACCESS',
    title: 'Role Access',
    description:
      'Role-specific applications, repositories and entitlements.',
    owner: 'Access Management',
    weight: 18
  },
  {
    code: 'WORKPLACE_ACCESS',
    title: 'Workplace Access',
    description:
      'Office, building and physical workplace access.',
    owner: 'Facilities',
    weight: 8
  },
  {
    code: 'TRAINING',
    title: 'Training',
    description:
      'Mandatory and role-specific learning assignments.',
    owner: 'Learning Team',
    weight: 10
  },
  {
    code: 'COMPLIANCE',
    title: 'Compliance',
    description:
      'Required declarations and regulatory onboarding checks.',
    owner: 'Compliance Operations',
    weight: 8
  },
  {
    code: 'TEAM_INTEGRATION',
    title: 'Team Integration',
    description:
      'Buddy, team introduction and first-week plan.',
    owner: 'Hiring Manager',
    weight: 5
  },
  {
    code: 'ROLE_READY',
    title: 'Role Ready',
    description:
      'Final confirmation that critical dependencies are complete.',
    owner: 'Hiring Manager',
    weight: 7
  }
];

export function createJoinerDetails(
  joiners: JoinerSummary[]
): Record<string, JoinerDetail> {
  return Object.fromEntries(
    joiners.map(joiner => [
      joiner.id,
      joiner.id === 'J-1001'
        ? createMayaDetail(joiner)
        : createGenericDetail(joiner)
    ])
  );
}

function createMayaDetail(
  summary: JoinerSummary
): JoinerDetail {
  const evidence: EvidenceRecord[] = [
    {
      id: 'EVD-HR-1001',
      title: 'HR profile completed',
      sourceSystem: 'Workday',
      sourceReference: 'WD-EMP-1001',
      status: 'VERIFIED',
      observedValue:
        'Employment profile complete and validated',
      capturedAt: '17 Jul 2026, 10:12 AM',
      capturedBy: 'HR Profile Adapter',
      description:
        'Readiness  evidence showing employee, location, role and manager information.'
    },
    {
      id: 'EVD-ID-1001',
      title: 'Primary identity created',
      sourceSystem: 'Identity Management',
      sourceReference: 'IDENTITY-MS-4821',
      status: 'VERIFIED',
      observedValue:
        'Corporate identity active',
      capturedAt: '18 Jul 2026, 9:40 AM',
      capturedBy: 'Identity Adapter',
      description:
        'Synthetic identity record confirming creation of the corporate account.'
    },
    {
      id: 'EVD-DEVICE-1001',
      title: 'Laptop allocated',
      sourceSystem: 'dbServiceNow',
      sourceReference: 'INC-TECH-78421',
      status: 'VERIFIED',
      observedValue:
        'Windows engineering laptop assigned',
      capturedAt: '19 Jul 2026, 2:20 PM',
      capturedBy: 'Technology Fulfilment Adapter',
      description:
        'Synthetic fulfilment record showing device allocation and standard software installation.'
    },
    {
      id: 'EVD-MFA-1001',
      title: 'MFA registration pending',
      sourceSystem: 'Security Registration',
      sourceReference: 'MFA-REG-29018',
      status: 'PENDING',
      observedValue:
        'Registration initiated; confirmation pending',
      capturedAt: '20 Jul 2026, 11:05 AM',
      capturedBy: 'Security Adapter',
      description:
        'The joiner has started registration but has not completed the verification step.'
    },
    {
      id: 'EVD-ACCESS-1001',
      title: 'Role access request pending',
      sourceSystem: 'dbAccessGate',
      sourceReference: 'AG-3812',
      status: 'PENDING',
      observedValue:
        'Awaiting Access Management fulfilment',
      capturedAt: '21 Jul 2026, 4:20 PM',
      capturedBy: 'Access Gate Adapter',
      description:
        'Synthetic request for GitHub, JIRA and development-environment access. The request has exceeded its expected fulfilment time.'
    },
    {
      id: 'EVD-WORKPLACE-1001',
      title: 'Building access approved',
      sourceSystem: 'Workplace Services',
      sourceReference: 'FAC-22910',
      status: 'VERIFIED',
      observedValue:
        'Bengaluru campus access approved',
      capturedAt: '19 Jul 2026, 4:05 PM',
      capturedBy: 'Facilities Adapter',
      description:
        "Physical access has been approved for the joiner's primary office."
    },
    {
      id: 'EVD-TRAINING-1001',
      title: 'Mandatory training incomplete',
      sourceSystem: 'LearningHub',
      sourceReference: 'LH-ASSIGN-6214',
      status: 'PENDING',
      observedValue:
        'Two of three mandatory courses completed',
      capturedAt: '21 Jul 2026, 3:05 PM',
      capturedBy: 'Learning Adapter',
      description:
        'Data Privacy and Protection training remains incomplete.'
    },
    {
      id: 'EVD-COMP-1001',
      title: 'Compliance declarations completed',
      sourceSystem: 'Compliance Portal',
      sourceReference: 'COMP-DEC-4108',
      status: 'VERIFIED',
      observedValue:
        'All required declarations submitted',
      capturedAt: '20 Jul 2026, 5:10 PM',
      capturedBy: 'Compliance Adapter',
      description:
        'Required synthetic onboarding declarations have been completed.'
    },
    {
      id: 'EVD-TEAM-1001',
      title: 'Buddy assigned',
      sourceSystem: 'ReadyPath',
      sourceReference: 'TEAM-PLAN-1001',
      status: 'PENDING',
      observedValue:
        'Buddy assigned; first-week plan pending',
      capturedAt: '21 Jul 2026, 1:45 PM',
      capturedBy: 'Manager Workspace',
      description:
        'The manager assigned a buddy but has not completed the first-week role plan.'
    }
  ];

  const areas: ReadinessAreaDetail[] = [
    createArea(
      1,
      'HR_PROFILE',
      'COMPLETE',
      100,
      ['EVD-HR-1001'],
      [],
      null,
      '17 Jul 2026, 10:12 AM'
    ),
    createArea(
      2,
      'PRIMARY_IDENTITY',
      'COMPLETE',
      100,
      ['EVD-ID-1001'],
      ['HR_PROFILE'],
      null,
      '18 Jul 2026, 9:40 AM'
    ),
    createArea(
      3,
      'DEVICE_TECH',
      'COMPLETE',
      100,
      ['EVD-DEVICE-1001'],
      ['PRIMARY_IDENTITY'],
      null,
      '19 Jul 2026, 2:20 PM'
    ),
    createArea(
      4,
      'MFA_REMOTE_ACCESS',
      'IN_PROGRESS',
      50,
      ['EVD-MFA-1001'],
      ['PRIMARY_IDENTITY'],
      'MFA registration requires joiner confirmation.',
      '20 Jul 2026, 11:05 AM'
    ),
    createArea(
      5,
      'ROLE_ACCESS',
      'BLOCKED',
      10,
      ['EVD-ACCESS-1001'],
      [
        'PRIMARY_IDENTITY',
        'DEVICE_TECH',
        'MFA_REMOTE_ACCESS'
      ],
      'Access request AG-3812 has exceeded its expected fulfilment time by four days.',
      '21 Jul 2026, 4:20 PM'
    ),
    createArea(
      6,
      'WORKPLACE_ACCESS',
      'COMPLETE',
      100,
      ['EVD-WORKPLACE-1001'],
      ['HR_PROFILE'],
      null,
      '19 Jul 2026, 4:05 PM'
    ),
    createArea(
      7,
      'TRAINING',
      'IN_PROGRESS',
      40,
      ['EVD-TRAINING-1001'],
      ['PRIMARY_IDENTITY'],
      'Data Privacy and Protection training remains incomplete.',
      '21 Jul 2026, 3:05 PM'
    ),
    createArea(
      8,
      'COMPLIANCE',
      'COMPLETE',
      100,
      ['EVD-COMP-1001'],
      ['HR_PROFILE'],
      null,
      '20 Jul 2026, 5:10 PM'
    ),
    createArea(
      9,
      'TEAM_INTEGRATION',
      'IN_PROGRESS',
      20,
      ['EVD-TEAM-1001'],
      ['HR_PROFILE'],
      'First-week role plan has not been completed.',
      '21 Jul 2026, 1:45 PM'
    ),
    createArea(
      10,
      'ROLE_READY',
      'BLOCKED',
      10,
      [
        'EVD-ACCESS-1001',
        'EVD-TRAINING-1001',
        'EVD-TEAM-1001'
      ],
      [
        'MFA_REMOTE_ACCESS',
        'ROLE_ACCESS',
        'TRAINING',
        'TEAM_INTEGRATION'
      ],
      'Critical role access and mandatory training dependencies are incomplete.',
      '21 Jul 2026, 4:20 PM'
    )
  ];

  return {
    summary,

    overallAssessment:
      'Maya is progressing, but she is not yet operationally ready. Role access is the primary blocker, while MFA confirmation, one mandatory training course and the first-week plan remain incomplete.',

    tenAreaProgress: 64,

    scoreExplanation: {
      completedAreas: 5,
      inProgressAreas: 3,
      blockedAreas: 2,
      pendingAreas: 0,
      criticalBlockedWeight: 25
    },

    areas,

    blockers: [
      {
        id: 'BLK-ACCESS-1001',
        title: 'Role access fulfilment overdue',
        description:
          'Access request AG-3812 has exceeded the expected fulfilment time by four days.',
        severity: 'CRITICAL',
        owner: 'Access Management',
        areaCode: 'ROLE_ACCESS',
        openedAt: '17 Jul 2026',
        ageInDays: 4,
        evidenceIds: ['EVD-ACCESS-1001'],
        recommendedAction:
          'Send an evidence-grounded reminder to Access Management and escalate if unresolved within one business day.'
      },
      {
        id: 'BLK-TRAINING-1001',
        title: 'Mandatory training incomplete',
        description:
          'Data Privacy and Protection training must be completed before Day 1 readiness can be confirmed.',
        severity: 'MEDIUM',
        owner: 'Maya Sen',
        areaCode: 'TRAINING',
        openedAt: '20 Jul 2026',
        ageInDays: 1,
        evidenceIds: ['EVD-TRAINING-1001'],
        recommendedAction:
          'Complete the remaining LearningHub assignment.'
      }
    ],

    tasks: [
      {
        id: 'TASK-MFA-1001',
        title: 'Complete MFA verification',
        description:
          'Finish the confirmation step for secure remote access.',
        owner: 'Maya Sen',
        ownerType: 'JOINER',
        areaCode: 'MFA_REMOTE_ACCESS',
        status: 'OPEN',
        priority: 'HIGH',
        dueDate: '23 Jul 2026'
      },
      {
        id: 'TASK-TRAIN-1001',
        title: 'Complete Data Privacy Training',
        description:
          'Complete the remaining mandatory LearningHub course.',
        owner: 'Maya Sen',
        ownerType: 'JOINER',
        areaCode: 'TRAINING',
        status: 'OPEN',
        priority: 'MEDIUM',
        dueDate: '24 Jul 2026'
      },
      {
        id: 'TASK-TEAM-1001',
        title: 'Complete first-week role plan',
        description:
          'Confirm initial responsibilities, meetings and onboarding support.',
        owner: 'Arjun Rao',
        ownerType: 'MANAGER',
        areaCode: 'TEAM_INTEGRATION',
        status: 'OPEN',
        priority: 'MEDIUM',
        dueDate: '23 Jul 2026'
      }
    ],

    evidence,

    timeline: [
      {
        id: 'EVT-1007',
        occurredAt: '21 Jul 2026, 4:20 PM',
        title: 'Role access blocker detected',
        description:
          'ReadyPath identified that AG-3812 exceeded its expected fulfilment time.',
        actor: 'Deterministic Readiness Engine',
        eventType: 'STATUS_CHANGE'
      },
      {
        id: 'EVT-1006',
        occurredAt: '21 Jul 2026, 4:21 PM',
        title: 'Reminder recommendation generated',
        description:
          'A reminder was drafted for human review using the associated access evidence.',
        actor: 'ReadyPath AI',
        eventType: 'AI_RECOMMENDATION'
      },
      {
        id: 'EVT-1005',
        occurredAt: '21 Jul 2026, 3:05 PM',
        title: 'Learning status refreshed',
        description:
          'Two of three mandatory training assignments are complete.',
        actor: 'LearningHub Adapter',
        eventType: 'EVIDENCE'
      },
      {
        id: 'EVT-1004',
        occurredAt: '20 Jul 2026, 11:05 AM',
        title: 'MFA registration started',
        description:
          'MFA registration was initiated and awaits joiner confirmation.',
        actor: 'Security Registration',
        eventType: 'EVIDENCE'
      },
      {
        id: 'EVT-1003',
        occurredAt: '19 Jul 2026, 2:20 PM',
        title: 'Laptop allocated',
        description:
          'Engineering laptop and standard software were assigned.',
        actor: 'Technology Fulfilment',
        eventType: 'EVIDENCE'
      },
      {
        id: 'EVT-1002',
        occurredAt: '18 Jul 2026, 9:40 AM',
        title: 'Primary identity created',
        description:
          'Corporate account and identity were created successfully.',
        actor: 'Identity Operations',
        eventType: 'STATUS_CHANGE'
      },
      {
        id: 'EVT-1001',
        occurredAt: '17 Jul 2026, 10:12 AM',
        title: 'Onboarding case created',
        description:
          'Synthetic employee profile was received and validated.',
        actor: 'HR Profile Adapter',
        eventType: 'STATUS_CHANGE'
      }
    ],

    aiRecommendation: createMayaRecommendation()
  };
}

function createMayaRecommendation(): AiRecommendation {
  return {
    id: 'REC-ACCESS-1001',
    title: 'Role access escalation recommended',
    summary:
      'Maya joins in five days. Her role-access request is still pending and has exceeded the expected fulfilment time by four days.',
    recommendedAction:
      'Send a reminder to Access Management referencing request AG-3812. Escalate to the service owner if it remains unresolved after one business day.',
    recipient: 'Access Management',
    confidence: 94,
    approvalStatus: 'PENDING_APPROVAL',
    evidenceIds: ['EVD-ACCESS-1001'],
    generatedAt: '21 Jul 2026, 4:21 PM',
    disclaimer:
      'AI-generated recommendation grounded in readiness evidence. Human approval is required before any action.'
  };
}

function createArea(
  sequence: number,
  code: ReadinessAreaCode,
  status: AreaStatus,
  progress: number,
  evidenceIds: string[],
  dependencyCodes: ReadinessAreaCode[],
  blockerReason: string | null,
  lastUpdated: string
): ReadinessAreaDetail {
  const definition = AREA_DEFINITIONS.find(
    item => item.code === code
  );

  if (!definition) {
    throw new Error(
      `Missing readiness-area definition for ${code}`
    );
  }

  return {
    code,
    sequence,
    title: definition.title,
    description: definition.description,
    owner: definition.owner,
    status,
    progress,
    weight: definition.weight,
    lastUpdated,
    blockerReason,
    evidenceIds,
    dependencyCodes
  };
}

function createGenericDetail(
  summary: JoinerSummary
): JoinerDetail {
  const statusByArea = getGenericAreaStatus(
    summary.status
  );

  const areas = AREA_DEFINITIONS.map(
    (definition, index) =>
      createArea(
        index + 1,
        definition.code,
        statusByArea[index],
        progressForStatus(statusByArea[index]),
        [],
        index === 0
          ? []
          : [AREA_DEFINITIONS[index - 1].code],
        statusByArea[index] === 'BLOCKED'
          ? summary.topPendingItem
          : null,
        '21 Jul 2026, 5:00 PM'
      )
  );

  return {
    summary,
    overallAssessment:
      summary.status === 'READY'
        ? 'This synthetic joiner is operationally ready.'
        : `This synthetic joiner requires action related to ${summary.topPendingItem.toLowerCase()}.`,
    tenAreaProgress: summary.readinessScore,
    scoreExplanation: {
      completedAreas: areas.filter(
        area => area.status === 'COMPLETE'
      ).length,
      inProgressAreas: areas.filter(
        area => area.status === 'IN_PROGRESS'
      ).length,
      blockedAreas: areas.filter(
        area => area.status === 'BLOCKED'
      ).length,
      pendingAreas: areas.filter(
        area => area.status === 'NOT_STARTED'
      ).length,
      criticalBlockedWeight: areas
        .filter(area => area.status === 'BLOCKED')
        .reduce(
          (total, area) => total + area.weight,
          0
        )
    },
    areas,
    blockers: [],
    tasks: [],
    evidence: [],
    timeline: [],
    aiRecommendation: {
      id: `REC-${summary.id}`,
      title:
        summary.status === 'READY'
          ? 'No operational intervention required'
          : 'Operational follow-up recommended',
      summary:
        summary.status === 'READY'
          ? 'The deterministic readiness checks are complete.'
          : `${summary.topPendingItem} requires attention from ${summary.pendingOwner}.`,
      recommendedAction:
        summary.status === 'READY'
          ? 'Continue normal onboarding monitoring.'
          : `Contact ${summary.pendingOwner} and confirm the expected resolution date.`,
      recipient: summary.pendingOwner,
      confidence: 88,
      approvalStatus: 'PENDING_APPROVAL',
      evidenceIds: [],
      generatedAt: '21 Jul 2026, 5:00 PM',
      disclaimer:
        'Recommendation generated from readiness records.'
    }
  };
}

function getGenericAreaStatus(
  status: JoinerSummary['status']
): AreaStatus[] {
  if (status === 'READY') {
    return Array<AreaStatus>(10).fill('COMPLETE');
  }

  if (status === 'CRITICAL') {
    return [
      'COMPLETE',
      'COMPLETE',
      'BLOCKED',
      'NOT_STARTED',
      'NOT_STARTED',
      'IN_PROGRESS',
      'NOT_STARTED',
      'IN_PROGRESS',
      'NOT_STARTED',
      'BLOCKED'
    ];
  }

  if (status === 'NOT_STARTED') {
    return Array<AreaStatus>(10).fill('NOT_STARTED');
  }

  return [
    'COMPLETE',
    'COMPLETE',
    'COMPLETE',
    'IN_PROGRESS',
    'BLOCKED',
    'COMPLETE',
    'IN_PROGRESS',
    'COMPLETE',
    'IN_PROGRESS',
    'BLOCKED'
  ];
}

function progressForStatus(
  status: AreaStatus
): number {
  switch (status) {
    case 'COMPLETE':
      return 100;

    case 'IN_PROGRESS':
      return 50;

    case 'BLOCKED':
      return 15;

    case 'NOT_STARTED':
      return 0;
  }
}
