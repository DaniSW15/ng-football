import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { API_CONFIG } from '../config/api.config';

/**
 * Interceptor: antepone la URL base del API a peticiones relativas.
 * Las features usan rutas como '/teams' y este interceptor las convierte
 * a 'http://localhost:8000/api/teams'.
 */
export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const { baseUrl } = inject(API_CONFIG);

  // Solo intercepta rutas relativas que empiezan con '/'
  if (req.url.startsWith('/')) {
    const apiReq = req.clone({ url: `${baseUrl}${req.url}` });
    return next(apiReq);
  }

  return next(req);
};
