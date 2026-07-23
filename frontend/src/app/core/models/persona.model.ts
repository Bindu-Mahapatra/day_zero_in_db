export type Persona =
  | 'HR'
  | 'MANAGER'
  | 'JOINER';

export interface DemoUser {
  id: string;
  username: string;
  displayName: string;
  roleName: string;
  persona: Persona;
  initials: string;
  subjectJoinerId?: string;
}
