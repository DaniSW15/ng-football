import { UserRole } from '@auth/domain/auth.model';

/**
 * Request DTOs — el backend usa extra="forbid",
 * no se deben incluir campos adicionales.
 */
export interface RegisterRequestDto {
  email: string;
  password: string;
  full_name: string;
  role?: UserRole;
}

export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface RefreshTokenRequestDto {
  refresh_token: string;
}

/**
 * Response DTOs — espejo exacto de schemas/auth.py en FastAPI
 */
export interface UserResponseDto {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  is_active: boolean;
  created_at: string;
}

export interface AuthTokenResponseDto {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  user: UserResponseDto;
}

export interface SessionResponseDto {
  id: string;
  user_id: string;
  user_agent: string | null;
  ip_address: string | null;
  expires_at: string;
  revoked_at: string | null;
  created_at: string;
  is_active: boolean;
}
