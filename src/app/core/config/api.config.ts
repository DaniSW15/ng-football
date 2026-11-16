import { InjectionToken } from '@angular/core';
import { environment } from '@environment';

export interface ApiConfig {
  readonly baseUrl: string;
}

/**
 * Token de configuración global para la URL base del API.
 * Se provee una sola vez en app.config.ts — las features nunca hardcodean URLs.
 */
export const API_CONFIG = new InjectionToken<ApiConfig>('API_CONFIG', {
  factory: () => ({
    baseUrl: environment.apiUrl,
  }),
});
