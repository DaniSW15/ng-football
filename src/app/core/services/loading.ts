import { signal, computed } from '@angular/core';
import { Service } from '@angular/core';

/**
 * Servicio global de loading — registra peticiones HTTP activas.
 * Lo alimenta el LoadingInterceptor; lo consume el LoadingSpinner.
 */
@Service()
export class LoadingService {
  private readonly _activeRequests = signal(0);

  readonly isLoading = computed(() => this._activeRequests() > 0);

  start(): void {
    this._activeRequests.update((n) => n + 1);
  }

  stop(): void {
    this._activeRequests.update((n) => Math.max(0, n - 1));
  }
}
