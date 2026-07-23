import {
  BlockerAggregate,
  DepartmentDistribution,
  HrOverviewSnapshot,
  JoinerSummary,
  PipelineStage,
  ReadinessDistribution,
  ReadinessStatus,
  ReadinessTrendPoint
} from '../models/readiness.model';

const FIRST_NAMES = [
  'Maya',
  'Rohit',
  'Ananya',
  'Vikram',
  'Priya',
  'Arjun',
  'Meera',
  'Siddharth',
  'Neha',
  'Kabir',
  'Ishita',
  'Nikhil',
  'Aarav',
  'Diya',
  'Karan',
  'Rhea'
];

const LAST_NAMES = [
  'Sen',
  'Sharma',
  'Iyer',
  'Nair',
  'Menon',
  'Singh',
  'Joshi',
  'Verma',
  'Kapoor',
  'Bose',
  'Rao',
  'Mehta',
  'Desai',
  'Gupta',
  'Malhotra',
  'Kulkarni'
];

const ROLES = [
  'TDI Java Engineer',
  'Data Analyst',
  'DevOps Engineer',
  'Business Analyst',
  'Product Owner',
  'QA Engineer',
  'Finance Analyst',
  'Cloud Engineer',
  'Risk Analyst',
  'UI/UX Designer'
];

const DEPARTMENTS = [
  'Technology',
  'Operations',
  'Risk',
  'Finance',
  'Corporate Bank',
  'Investment Bank'
];

const LOCATIONS = [
  'Bengaluru, India',
  'Pune, India',
  'Mumbai, India',
  'Frankfurt, Germany',
  'London, UK',
  'Berlin, Germany'
];

const MANAGERS = [
  {
    id: 'manager-001',
    name: 'Arjun Rao'
  },
  {
    id: 'manager-002',
    name: 'Sarah Klein'
  },
  {
    id: 'manager-003',
    name: 'Daniel Weber'
  },
  {
    id: 'manager-004',
    name: 'Priya Sharma'
  }
];

const ATTENTION_ITEMS = [
  {
    item: 'Role access fulfilment',
    owner: 'Access Management'
  },
  {
    item: 'Mandatory training',
    owner: 'Learning Team'
  },
  {
    item: 'MFA setup',
    owner: 'IT Security'
  },
  {
    item: 'Workplace access',
    owner: 'Facilities'
  },
  {
    item: 'Manager role plan',
    owner: 'Hiring Manager'
  }
];

const CRITICAL_ITEMS = [
  {
    item: 'Primary identity creation',
    owner: 'Identity Operations'
  },
  {
    item: 'HR profile information',
    owner: 'HR Operations'
  },
  {
    item: 'Device allocation',
    owner: 'Local IT Support'
  },
  {
    item: 'Critical role access approval',
    owner: 'Application Owner'
  }
];

const PIPELINE: PipelineStage[] = [
  {
    id: 'OFFER_ACCEPTED',
    label: 'Offer accepted',
    joinerCount: 124,
    conversionPercentage: 100
  },
  {
    id: 'HR_PROFILE',
    label: 'HR profile completed',
    joinerCount: 119,
    conversionPercentage: 96
  },
  {
    id: 'PRIMARY_IDENTITY',
    label: 'Primary identity created',
    joinerCount: 109,
    conversionPercentage: 88
  },
  {
    id: 'PROVISIONING',
    label: 'Provisioning initiated',
    joinerCount: 98,
    conversionPercentage: 79
  },
  {
    id: 'FULLY_READY',
    label: 'Fully ready for Day 1',
    joinerCount: 89,
    conversionPercentage: 72
  }
];

const BLOCKERS: BlockerAggregate[] = [
  {
    id: 'HR_PROFILE_INCOMPLETE',
    label: 'HR profile missing or incomplete',
    affectedJoiners: 18,
    owner: 'HR Operations',
    severity: 'HIGH'
  },
  {
    id: 'IDENTITY_PENDING',
    label: 'Primary identity pending',
    affectedJoiners: 14,
    owner: 'Identity Operations',
    severity: 'CRITICAL'
  },
  {
    id: 'MANAGER_INPUT_MISSING',
    label: 'Manager role input missing',
    affectedJoiners: 10,
    owner: 'Hiring Manager',
    severity: 'HIGH'
  },
  {
    id: 'WORKPLACE_ACCESS',
    label: 'Workplace access pending',
    affectedJoiners: 7,
    owner: 'Facilities',
    severity: 'MEDIUM'
  },
  {
    id: 'TRAINING_INCOMPLETE',
    label: 'Mandatory training incomplete',
    affectedJoiners: 6,
    owner: 'Learning Team',
    severity: 'MEDIUM'
  }
];

const TREND: ReadinessTrendPoint[] = [
  {
    label: '16-22 Jun',
    ready: 54,
    attention: 29,
    critical: 10
  },
  {
    label: '23-29 Jun',
    ready: 61,
    attention: 27,
    critical: 9
  },
  {
    label: '30 Jun-6 Jul',
    ready: 69,
    attention: 26,
    critical: 9
  },
  {
    label: '7-13 Jul',
    ready: 77,
    attention: 25,
    critical: 8
  },
  {
    label: '14-20 Jul',
    ready: 83,
    attention: 26,
    critical: 8
  },
  {
    label: '21-27 Jul',
    ready: 89,
    attention: 27,
    critical: 8
  }
];

export function createSyntheticJoiners(): JoinerSummary[] {
  const statuses: ReadinessStatus[] = [
    ...Array<JoinerSummary['status']>(89).fill('READY'),
    ...Array<JoinerSummary['status']>(27).fill('ATTENTION'),
    ...Array<JoinerSummary['status']>(8).fill('CRITICAL')
  ];

  // Keep the golden demo joiner as an attention case while preserving counts.
  [statuses[0], statuses[89]] = [statuses[89], statuses[0]];

  const baseJoiningDate = new Date('2026-07-23T00:00:00');

  return statuses.map((status, index) => {
    const firstName = FIRST_NAMES[index % FIRST_NAMES.length];
    const lastName =
      LAST_NAMES[Math.floor(index / FIRST_NAMES.length) % LAST_NAMES.length];

    const manager = MANAGERS[index % MANAGERS.length];
    const daysToJoining = 2 + ((index * 3) % 28);

    const joiningDate = new Date(baseJoiningDate);
    joiningDate.setDate(joiningDate.getDate() + daysToJoining);

    const readinessScore = calculateScore(status, index);
    const pending = calculatePendingItem(status, index);

    const joiner: JoinerSummary = {
      id: `J-${String(index + 1001).padStart(4, '0')}`,
      displayName: `${firstName} ${lastName}`,
      email: `${firstName}.${lastName}.${index + 1}`
        .toLowerCase()
        .replaceAll(' ', '') + '@example.test',
      role: ROLES[index % ROLES.length],
      department: DEPARTMENTS[index % DEPARTMENTS.length],
      division:
        index % 2 === 0
          ? 'Technology, Data & Innovation'
          : 'Corporate Functions',
      location: LOCATIONS[index % LOCATIONS.length],
      managerId: manager.id,
      managerName: manager.name,
      joiningDate: joiningDate.toISOString().slice(0, 10),
      daysToJoining,
      readinessScore,
      status,
      topPendingItem: pending.item,
      pendingOwner: pending.owner
    };

    if (index === 0) {
      return {
        ...joiner,
        id: 'J-1001',
        displayName: 'Maya Sen',
        email: 'maya.sen@example.test',
        role: 'TDI Java Engineer',
        department: 'Technology',
        division: 'Technology, Data & Innovation',
        location: 'Bengaluru, India',
        managerId: 'manager-001',
        managerName: 'Arjun Rao',
        joiningDate: '2026-07-26',
        daysToJoining: 5,
        readinessScore: 64,
        status: 'ATTENTION',
        topPendingItem: 'Role access fulfilment',
        pendingOwner: 'Access Management'
      };
    }

    return joiner;
  });
}

export function createHrOverview(
  joiners: JoinerSummary[]
): HrOverviewSnapshot {
  const totalJoiners = joiners.length;
  const fullyReady = countStatus(joiners, 'READY');
  const attentionRequired = countStatus(joiners, 'ATTENTION');
  const criticalRisk = countStatus(joiners, 'CRITICAL');
  const notStarted = countStatus(joiners, 'NOT_STARTED');

  return {
    totalJoiners,
    fullyReady,
    attentionRequired,
    criticalRisk,
    notStarted,

    pipeline: PIPELINE,
    distribution: createDistribution(joiners),
    blockers: BLOCKERS,
    trend: TREND,
    departments: createDepartmentDistribution(joiners),

    upcomingJoiners: [...joiners]
      .sort((left, right) =>
        left.joiningDate.localeCompare(right.joiningDate)
      )
      .slice(0, 8),

    lastUpdated: '24 Jul 2026, 10:00 AM IST',

    aiInsight: {
      title: 'Readiness deterioration detected',
      summary:
        'Twenty-seven joiners currently need attention. Role-access fulfilment and incomplete HR profiles are the strongest operational risk factors.',
      riskFactors: [
        'Role-access requests approaching joining date',
        'Incomplete HR profile information',
        'Mandatory training not yet started'
      ]
    }
  };
}

function calculateScore(
  status: ReadinessStatus,
  index: number
): number {
  switch (status) {
    case 'READY':
      return 86 + ((index * 7) % 15);

    case 'ATTENTION':
      return 56 + ((index * 11) % 29);

    case 'CRITICAL':
      return 28 + ((index * 13) % 22);

    case 'NOT_STARTED':
      return 0;
  }
}

function calculatePendingItem(
  status: ReadinessStatus,
  index: number
): { item: string; owner: string } {
  if (status === 'READY') {
    return {
      item: 'No blocking item',
      owner: 'None'
    };
  }

  if (status === 'CRITICAL') {
    return CRITICAL_ITEMS[index % CRITICAL_ITEMS.length];
  }

  return ATTENTION_ITEMS[index % ATTENTION_ITEMS.length];
}

function countStatus(
  joiners: JoinerSummary[],
  status: ReadinessStatus
): number {
  return joiners.filter(joiner => joiner.status === status).length;
}

function createDistribution(
  joiners: JoinerSummary[]
): ReadinessDistribution[] {
  const total = joiners.length;

  const createItem = (
    status: ReadinessStatus,
    label: string
  ): ReadinessDistribution => {
    const count = countStatus(joiners, status);

    return {
      status,
      label,
      count,
      percentage: total === 0
        ? 0
        : Number(((count / total) * 100).toFixed(1))
    };
  };

  return [
    createItem('READY', 'Fully ready'),
    createItem('ATTENTION', 'Attention required'),
    createItem('CRITICAL', 'Critical risk'),
    createItem('NOT_STARTED', 'Not started')
  ];
}

function createDepartmentDistribution(
  joiners: JoinerSummary[]
): DepartmentDistribution[] {
  const counts = joiners.reduce<Record<string, number>>(
    (result, joiner) => {
      result[joiner.department] =
        (result[joiner.department] ?? 0) + 1;

      return result;
    },
    {}
  );

  return Object.entries(counts)
    .map(([department, joinerCount]) => ({
      department,
      joinerCount,
      percentage: Number(
        ((joinerCount / joiners.length) * 100).toFixed(1)
      )
    }))
    .sort((left, right) => right.joinerCount - left.joinerCount);
}
