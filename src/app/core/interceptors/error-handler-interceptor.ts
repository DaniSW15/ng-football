import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

function extractFastApiDetail(error: HttpErrorResponse): string | null {
  const detail = error.error?.detail;
  if (typeof detail === 'string' && detail.trim().length > 0) {
    return detail;
  }
  if (Array.isArray(detail)) {
    const messages = detail
      .map((item) => (typeof item?.msg === 'string' ? item.msg : null))
      .filter((msg): msg is string => msg !== null);
    if (messages.length > 0) {
      return messages.join(' · ');
    }
  }
  return null;
}

/**
 * Interceptor: manejo global de errores HTTP.
 * Transforma errores del servidor FastAPI en mensajes legibles para el usuario.
 */
export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: unknown) => {
      if (!(error instanceof HttpErrorResponse)) {
        return throwError(() =>
          error instanceof Error ? error : new Error('Error inesperado.')
        );
      }

      const apiDetail = extractFastApiDetail(error);
      let message: string;

      if (error.status === 0) {
        message = 'No se pudo conectar con el servidor. Verifica tu conexión.';
      } else if (error.status === 401) {
        message = apiDetail ?? 'Credenciales inválidas o sesión expirada.';
      } else if (error.status === 403) {
        message = apiDetail ?? 'No tienes permiso para realizar esta acción.';
      } else if (error.status === 404) {
        message = apiDetail ?? 'Recurso no encontrado.';
      } else if (error.status === 409) {
        message = apiDetail ?? 'Conflicto: el recurso ya existe.';
      } else if (error.status === 422) {
        message = apiDetail ?? 'Datos de entrada inválidos.';
      } else if (error.status === 429) {
        message =
          apiDetail ??
          'Has superado el límite de solicitudes. Espera un momento.';
      } else if (error.status >= 500) {
        message = 'Error interno del servidor. Intenta más tarde.';
      } else {
        message =
          apiDetail ??
          error.error?.message ??
          `Error inesperado (${error.status}).`;
      }

      console.error(`[HTTP ${error.status}] ${req.method} ${req.url}`, error);

      return throwError(() => new Error(message));
    })
  );
};
