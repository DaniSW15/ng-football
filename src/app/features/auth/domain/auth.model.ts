export type UserRole = 'viewer' | 'analyst' | 'editor' | 'operator' | 'admin';

export const USER_ROLES: readonly UserRole[] = [
  'viewer',
  'analyst',
  'editor',
  'operator',
  'admin',
] as const;

/** Entidad de usuario autenticada */
export interface User {
  readonly id: string;
  readonly email: string;
  readonly fullName: string;
  readonly role: UserRole;
  readonly isActive: boolean;
  readonly createdAt: string;
}

/** Par de tokens JWT emitido por /auth/login y /auth/refresh */
export interface AuthTokens {
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly tokenType: string;
  readonly expiresIn: number;
}

/** Resultado completo de autenticación */
export interface AuthSessionResult {
  readonly tokens: AuthTokens;
  readonly user: User;
}

/** Sesión activa devuelta por GET /auth/sessions */
export interface AuthSession {
  readonly id: string;
  readonly userId: string;
  readonly userAgent: string;
  readonly ipAddress: string;
  readonly expiresAt: string;
  readonly revokedAt: string | null;
  readonly createdAt: string;
  readonly isActive: boolean;
}

/** Payload de registro (POST /auth/register) */
export interface RegisterPayload {
  readonly email: string;
  readonly password: string;
  readonly fullName: string;
  readonly role: UserRole;
}

/** Payload de inicio de sesión (POST /auth/login) */
export interface LoginPayload {
  readonly email: string;
  readonly password: string;
}
