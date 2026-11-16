import { Component, inject } from '@angular/core';
import { LoadingService } from '@core/services/loading';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  template: `
    @if (loading.isLoading()) {
      <div class="overlay">
        <div class="spinner"></div>
      </div>
    }
  `,
  styles: [
    `
      .overlay {
        position: fixed;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.6);
        z-index: 9999;
      }
      .spinner {
        width: 48px;
        height: 48px;
        border: 4px solid #e0e0e0;
        border-top-color: #1976d2;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
      }
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    `,
  ],
})
export class LoadingSpinner {
  protected readonly loading = inject(LoadingService);
}
