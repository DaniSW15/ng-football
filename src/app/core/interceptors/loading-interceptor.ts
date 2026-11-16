import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoadingService } from '../services/loading';

/**
 * Interceptor: tracking automático de peticiones activas.
 * Incrementa/decrementa el contador global del LoadingService.
 */
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loading = inject(LoadingService);

  loading.start();

  return next(req).pipe(finalize(() => loading.stop()));
};
