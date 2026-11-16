import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

/**
 * Interceptor: manejo global de errores HTTP.
 * Transforma errores del servidor en mensajes legibles para el usuario.
 */
export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message: string;

      if (error.status === 0) {
        message = 'No se pudo conectar con el servidor. Verifica tu conexión.';
      } else if (error.status === 404) {
        message = 'Recurso no encontrado.';
      } else if (error.status === 422) {
        message = error.error?.detail ?? 'Datos de entrada inválidos.';
      } else if (error.status >= 500) {
        message = 'Error interno del servidor. Intenta más tarde.';
      } else {
        message = error.error?.message ?? `Error inesperado (${error.status}).`;
      }

      console.error(`[HTTP ${error.status}] ${req.method} ${req.url}`, error);

      return throwError(() => new Error(message));
    })
  );
};
