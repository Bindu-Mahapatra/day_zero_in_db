import { OnboardingCase } from '../models/onboarding.models';

export const MOCK_ONBOARDING_CASE: OnboardingCase = {
  caseId: 'ONB-10-2025-001',
  profileAnalysed: true,
  profileConfidence: 94,
  profile: {
    profileId: 'profile-101',
    fullName: 'John Smith',
    role: 'Developer',
    team: 'GEMU Squad',
    application: 'Trading Portal',
    location: 'Pune, India',
    manager: 'Priya Sharma',
    managerEmail: 'priya.sharma@db.com',
    employmentType: 'Permanent',
    startDate: '12 May 2025'
  },
  extractedFields: [
    { label: 'Full Name', value: 'John Smith', confidence: 98, source: 'Offer letter' },
    { label: 'Role', value: 'Developer', confidence: 96, source: 'HR profile' },
    { label: 'Team', value: 'GEMU Squad', confidence: 93, source: 'Manager input' },
    { label: 'Application', value: 'Trading Portal', confidence: 91, source: 'Onboarding request' },
    { label: 'Location', value: 'Pune, India', confidence: 97, source: 'HR profile' },
    { label: 'Manager', value: 'Priya Sharma', confidence: 92, source: 'Org hierarchy' },
    { label: 'Employment Type', value: 'Permanent', confidence: 96, source: 'HR profile' },
    { label: 'Start Date', value: '12 May 2025', confidence: 99, source: 'Offer letter' }
  ],
  missingInformation: [
    {
      id: 'prod-justification',
      title: 'Production access justification missing',
      description: 'Business justification is mandatory before production access can be reviewed.',
      severity: 'High',
      owner: 'Manager',
      resolved: false
    },
    {
      id: 'access-reviewer',
      title: 'Access reviewer not assigned',
      description: 'Assign an access reviewer to validate GitHub and application access.',
      severity: 'Medium',
      owner: 'Manager',
      resolved: false
    },
    {
      id: 'security-training-preference',
      title: 'Security training preference missing',
      description: 'Select a training schedule or preferred learning window.',
      severity: 'Low',
      owner: 'Joiner',
      resolved: false
    },
    {
      id: 'cost-center',
      title: 'Cost center pending validation',
      description: 'Cost center was extracted but awaits finance-system confirmation.',
      severity: 'Low',
      owner: 'System',
      resolved: false
    }
  ],
  journey: [
    {
      id: 1,
      key: 'mandatory-trainings',
      title: 'Complete Mandatory Trainings',
      description: 'Complete baseline compliance and security trainings required for all joiners.',
      status: 'Completed',
      riskLevel: 'Low',
      owner: 'Joiner',
      dueDate: '12 May 2025',
      dependency: 'Profile validation',
      aiGenerated: true,
      requirements: ['Secure SDLC training', 'Information Security Awareness', 'Data Privacy & Protection'],
      aiAnalysis: ['Mandatory training pack selected based on role and location.', 'Secure SDLC is required for developer persona.'],
      policyEvidence: ['Training Standard §2.1', 'Secure SDLC Policy §3.1'],
      actions: [
        { id: 'a1', title: 'Secure SDLC completed', completed: true },
        { id: 'a2', title: 'Information Security completed', completed: true }
      ],
      recommendation: 'Keep Data Privacy training as next priority to increase readiness.'
    },
    {
      id: 2,
      key: 'manager-approval',
      title: 'Manager Approval',
      description: 'Manager validates profile, team assignment and onboarding path.',
      status: 'Completed',
      riskLevel: 'Medium',
      owner: 'Manager',
      dueDate: '12 May 2025',
      dependency: 'Joiner profile extracted',
      aiGenerated: true,
      requirements: ['Manager assigned', 'Role confirmed', 'Team confirmed'],
      aiAnalysis: ['Manager identified from org hierarchy.', 'Role and team match HR record.'],
      policyEvidence: ['Joiner Control Standard §1.2'],
      actions: [{ id: 'a3', title: 'Manager approved onboarding path', completed: true }],
      recommendation: 'Proceed with developer access planning.'
    },
    {
      id: 3,
      key: 'github-access',
      title: 'Request GitHub Access',
      description: 'Request access to GitHub repositories and organisations required for the role.',
      status: 'In Progress',
      riskLevel: 'Medium',
      owner: 'IAM Team',
      dueDate: '15 May 2025',
      dependency: 'Manager Approval',
      aiGenerated: true,
      requirements: ['Manager approval', 'Secure SDLC training completed', 'Business justification', 'Access reviewer validation'],
      aiAnalysis: ['Role requires repository write access.', 'Secure SDLC training completed.', 'Manager approved.', 'Access reviewer missing.', 'Production access not recommended.'],
      policyEvidence: ['Developer Access Standard §4.2', 'Secure SDLC Policy §3.1'],
      actions: [
        { id: 'a4', title: 'Submit access request form', completed: true },
        { id: 'a5', title: 'Manager approval', completed: true },
        { id: 'a6', title: 'Access reviewer validation', completed: false },
        { id: 'a7', title: 'Access provisioned', completed: false }
      ],
      recommendation: 'Assign an access reviewer to proceed with the GitHub access request.'
    },
    {
      id: 4,
      key: 'jira-access',
      title: 'Request JIRA Access',
      description: 'Request project tracking access for the Trading Portal delivery board.',
      status: 'Completed',
      riskLevel: 'Low',
      owner: 'Service Desk',
      dueDate: '12 May 2025',
      dependency: 'Manager Approval',
      aiGenerated: true,
      requirements: ['Project key', 'Manager approval'],
      aiAnalysis: ['JIRA project access is part of developer baseline.'],
      policyEvidence: ['Collaboration Access Baseline §2.4'],
      actions: [{ id: 'a8', title: 'JIRA project access provisioned', completed: true }],
      recommendation: 'No further action required.'
    },
    {
      id: 5,
      key: 'application-onboarding',
      title: 'Application Onboarding',
      description: 'Complete Trading Portal application onboarding checklist.',
      status: 'Pending',
      riskLevel: 'Medium',
      owner: 'Application Owner',
      dueDate: '16 May 2025',
      dependency: 'GitHub Access',
      aiGenerated: true,
      requirements: ['Application owner intro', 'Repository documentation', 'Local setup guide'],
      aiAnalysis: ['Application-specific onboarding is blocked until GitHub write access is reviewed.'],
      policyEvidence: ['Application Onboarding Checklist §1.1'],
      actions: [
        { id: 'a9', title: 'Application owner intro scheduled', completed: false },
        { id: 'a10', title: 'Local setup guide shared', completed: false }
      ],
      recommendation: 'Resolve GitHub access blocker first.'
    },
    {
      id: 6,
      key: 'environment-setup',
      title: 'Environment Setup',
      description: 'Set up laptop, developer tools and standard environment prerequisites.',
      status: 'Pending',
      riskLevel: 'Low',
      owner: 'Workplace & IT',
      dueDate: '17 May 2025',
      dependency: 'Workplace request',
      aiGenerated: true,
      requirements: ['Laptop issued', 'VPN configured', 'Developer tools installed'],
      aiAnalysis: ['Standard developer environment pack selected for Pune developer persona.'],
      policyEvidence: ['Workplace Setup Standard §5.1'],
      actions: [
        { id: 'a11', title: 'Laptop issued', completed: false },
        { id: 'a12', title: 'VPN configured', completed: false }
      ],
      recommendation: 'Track workplace ticket and escalate if not completed before start date.'
    },
    {
      id: 7,
      key: 'security-compliance',
      title: 'Security & Compliance Check',
      description: 'Validate that access requests comply with bank security controls.',
      status: 'Pending',
      riskLevel: 'High',
      owner: 'Control Owner',
      dueDate: '18 May 2025',
      dependency: 'Access requests submitted',
      aiGenerated: true,
      requirements: ['Least privilege check', 'Production access justification', 'Training completion'],
      aiAnalysis: ['Production Kubernetes admin access is outside baseline developer role.', 'Business justification is missing.'],
      policyEvidence: ['Production Access Policy v2.3 §4.1', 'Privileged Access Standard §2.6'],
      actions: [
        { id: 'a13', title: 'Least privilege checked', completed: false },
        { id: 'a14', title: 'Production justification received', completed: false }
      ],
      recommendation: 'Do not auto-approve production access. Request more information.'
    },
    {
      id: 8,
      key: 'data-tool-access',
      title: 'Data & Tool Access',
      description: 'Validate data access requirements and tool subscriptions.',
      status: 'Pending',
      riskLevel: 'Medium',
      owner: 'Data Owner',
      dueDate: '19 May 2025',
      dependency: 'Security check',
      aiGenerated: true,
      requirements: ['Data classification review', 'Need-to-know justification'],
      aiAnalysis: ['No restricted data need has been confirmed yet.'],
      policyEvidence: ['Data Access Control §3.3'],
      actions: [{ id: 'a15', title: 'Data access review', completed: false }],
      recommendation: 'Keep this step pending until application owner confirms data needs.'
    },
    {
      id: 9,
      key: 'team-documentation',
      title: 'Team & Documentation Onboarding',
      description: 'Provide documentation, runbooks and team-specific operating model.',
      status: 'Pending',
      riskLevel: 'Low',
      owner: 'Team Buddy',
      dueDate: '20 May 2025',
      dependency: 'Application onboarding',
      aiGenerated: true,
      requirements: ['Team buddy assigned', 'Runbook shared', 'Support rota explained'],
      aiAnalysis: ['Team documentation is recommended based on developer persona.'],
      policyEvidence: ['Engineering Onboarding Guide §2.2'],
      actions: [{ id: 'a16', title: 'Team buddy assigned', completed: false }],
      recommendation: 'Assign team buddy once GitHub access is approved.'
    },
    {
      id: 10,
      key: 'day-one-readiness',
      title: 'Day-One Readiness Confirmation',
      description: 'Confirm joiner is productive, access is controlled and evidence is captured.',
      status: 'Pending',
      riskLevel: 'Medium',
      owner: 'Manager',
      dueDate: '21 May 2025',
      dependency: 'All critical steps complete',
      aiGenerated: true,
      requirements: ['Critical access complete', 'Training complete', 'Evidence summary generated'],
      aiAnalysis: ['Readiness is 73%; two blockers remain before day-one confirmation.'],
      policyEvidence: ['Joiner Evidence Standard §6.1'],
      actions: [{ id: 'a17', title: 'Evidence pack generated', completed: false }],
      recommendation: 'Resolve GitHub approval and production justification blockers.'
    }
  ],
  trainings: [
    { id: 'tr-1', title: 'Secure SDLC Training', type: 'Mandatory', duration: '2h 30m', status: 'Completed', dueDate: '12 May 2025' },
    { id: 'tr-2', title: 'Data Privacy & Protection', type: 'Mandatory', duration: '1h 15m', status: 'Pending', dueDate: '18 May 2025' },
    { id: 'tr-3', title: 'Information Security Awareness', type: 'Mandatory', duration: '1h', status: 'Completed', dueDate: '12 May 2025' },
    { id: 'tr-4', title: 'GitHub Advanced Security', type: 'Recommended', duration: '1h 45m', status: 'In Progress', dueDate: '20 May 2025' }
  ],
  accessRequests: [
    { id: 'ar-1', system: 'GitHub', accessType: 'Repository write & org access', status: 'In Progress', requestedOn: '12 May 2025', riskLevel: 'Medium', requestedBy: 'John Smith', recommendedAction: 'Approve', justification: 'Required for developer onboarding.' },
    { id: 'ar-2', system: 'JIRA', accessType: 'Project access', status: 'Approved', requestedOn: '11 May 2025', riskLevel: 'Low', requestedBy: 'John Smith', recommendedAction: 'Approve' },
    { id: 'ar-3', system: 'Confluence', accessType: 'Space access', status: 'Pending', requestedOn: '12 May 2025', riskLevel: 'Low', requestedBy: 'John Smith', recommendedAction: 'Approve' },
    { id: 'ar-4', system: 'Prod Kubernetes', accessType: 'Admin access', status: 'Pending', requestedOn: '12 May 2025', riskLevel: 'High', requestedBy: 'John Smith', recommendedAction: 'Request Info', justification: '' },
    { id: 'ar-5', system: 'ServiceNow', accessType: 'Application access', status: 'Approved', requestedOn: '10 May 2025', riskLevel: 'Low', requestedBy: 'John Smith', recommendedAction: 'Approve' }
  ],
  tasks: [
    { id: 'task-1', title: 'Submit production access justification', priority: 'High', dueDate: '15 May 2025', assignedTo: 'John Smith', completed: false },
    { id: 'task-2', title: 'Complete Data Privacy Training', priority: 'Medium', dueDate: '18 May 2025', assignedTo: 'John Smith', completed: false },
    { id: 'task-3', title: 'Review GitHub access approval', priority: 'Medium', dueDate: '20 May 2025', assignedTo: 'Priya Sharma', completed: false }
  ],
  readiness: {
    overall: 73,
    training: 80,
    access: 60,
    compliance: 70,
    documentation: 90,
    teamOnboarding: 70,
    blockers: ['GitHub access approval pending', 'Production access justification missing']
  },
  agentActivity: [
    { id: 'act-1', title: 'Training completed: Secure SDLC', description: 'AI marked training gate as complete.', actor: 'AI Agent', timestamp: '12 May, 10:15 AM', type: 'analysis' },
    { id: 'act-2', title: 'Access requested: JIRA', description: 'Low-risk project access request submitted.', actor: 'System', timestamp: '12 May, 09:40 AM', type: 'notification' },
    { id: 'act-3', title: 'Manager approval completed', description: 'Profile and onboarding journey approved by Priya Sharma.', actor: 'Manager', timestamp: '11 May, 03:30 PM', type: 'approval' }
  ],
  chatMessages: [
    {
      id: 'chat-1',
      role: 'assistant',
      message: 'Ask me about access policies, onboarding blockers, training requirements or approval rules. I will answer with policy-backed responses.',
      confidence: 'High'
    }
  ]
};
