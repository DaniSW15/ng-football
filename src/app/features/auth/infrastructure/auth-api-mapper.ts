import {
  AuthSession,
  AuthSessionResult,
  LoginPayload,
  RegisterPayload,
  User,
} from '../domain/auth.model';
import {
  AuthTokenResponseDto,
  LoginRequestDto,
  RefreshTokenRequestDto,
  RegisterRequestDto,
  SessionResponseDto,
  UserResponseDto,
} from './dtos/auth-api.dto';

/**
 * Mapper puro entre DTOs snake_case del API y modelos camelCase del dominio.
 */
export class AuthApiMapper {
  static userToDomain(dto: UserResponseDto): User {
    return {
      id: dto.id,
      email: dto.email,
      fullName: dto.full_name,
      role: dto.role,
      isActive: dto.is_active,
      createdAt: dto.created_at,
    };
  }

  static authTokenToDomain(dto: AuthTokenResponseDto): AuthSessionResult {
    return {
      tokens: {
        accessToken: dto.access_token,
        refreshToken: dto.refresh_token,
        tokenType: dto.token_type,
        expiresIn: dto.expires_in,
      },
      user: AuthApiMapper.userToDomain(dto.user),
    };
  }

  static sessionToDomain(dto: SessionResponseDto): AuthSession {
    return {
      id: dto.id,
      userId: dto.user_id,
      userAgent: dto.user_agent ?? 'Dispositivo desconocido',
      ipAddress: dto.ip_address ?? 'N/A',
      expiresAt: dto.expires_at,
      revokedAt: dto.revoked_at,
      createdAt: dto.created_at,
      isActive: dto.is_active,
    };
  }

  static toRegisterDto(payload: RegisterPayload): RegisterRequestDto {
    return {
      email: payload.email.trim(),
      password: payload.password,
      full_name: payload.fullName.trim(),
      role: payload.role,
    };
  }

  static toLoginDto(payload: LoginPayload): LoginRequestDto {
    return {
      email: payload.email.trim(),
      password: payload.password,
    };
  }

  static toRefreshDto(refreshToken: string): RefreshTokenRequestDto {
    return {
      refresh_token: refreshToken,
    };
  }
}
