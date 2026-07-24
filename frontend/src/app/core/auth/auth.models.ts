export type Persona =
  | 'HR'
  | 'MANAGER'
  | 'JOINER';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthenticatedUser {
  userId: string;
  username: string;
  displayName: string;
  roleName: string;
  persona: Persona;
  subjectJoinerId: string | null;
}

export interface LoginResponse {
  token: string;
  tokenType: 'Bearer';
  expiresAt: string;
  user: AuthenticatedUser;
}

export interface AuthenticationErrorResponse {
  status: string;
  message: string;
}

export function homeRouteForPersona(
  persona: Persona
): string {
  switch (persona) {
    case 'HR':
      return '/hr/overview';

    case 'MANAGER':
      return '/manager/home';

    case 'JOINER':
      return '/me/home';

    default:
      return '/login';
  }
}