import {
  email,
  maxLength,
  minLength,
  required,
  schema,
} from '@angular/forms/signals';
import { LoginPayload, RegisterPayload } from '../../domain/auth.model';

/**
 * Esquema Signal Forms para Inicio de Sesión (POST /api/v1/auth/login)
 */
export const loginSchema = schema<LoginPayload>((login) => {
  required(login.email, { message: 'El correo electrónico es obligatorio' });
  email(login.email, { message: 'Ingresa un correo electrónico válido' });
  maxLength(login.email, 255, { message: 'Máximo 255 caracteres' });

  required(login.password, { message: 'La contraseña es obligatoria' });
  minLength(login.password, 1, { message: 'La contraseña es obligatoria' });
  maxLength(login.password, 128, { message: 'Máximo 128 caracteres' });
});

/**
 * Esquema Signal Forms para Registro de Usuario (POST /api/v1/auth/register)
 */
export const registerSchema = schema<RegisterPayload>((reg) => {
  required(reg.fullName, { message: 'El nombre completo es obligatorio' });
  minLength(reg.fullName, 1, { message: 'Mínimo 1 caracter' });
  maxLength(reg.fullName, 120, { message: 'Máximo 120 caracteres' });

  required(reg.email, { message: 'El correo electrónico es obligatorio' });
  email(reg.email, { message: 'Ingresa un correo electrónico válido' });
  maxLength(reg.email, 255, { message: 'Máximo 255 caracteres' });

  required(reg.password, { message: 'La contraseña es obligatoria' });
  minLength(reg.password, 8, {
    message: 'La contraseña debe tener al menos 8 caracteres',
  });
  maxLength(reg.password, 128, { message: 'Máximo 128 caracteres' });

  required(reg.role, { message: 'Selecciona un rol' });
});
