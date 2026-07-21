export type Persona =
  | 'HR'
  | 'MANAGER'
  | 'JOINER';

export interface DemoUser {
  id: string;
  displayName: string;
  roleName: string;
  persona: Persona;
  initials: string;

  /**
   * Used only by the synthetic Joiner persona.
   * Links the demo login user to the onboarding case.
   */
  subjectJoinerId?: string;
}