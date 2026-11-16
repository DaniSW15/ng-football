import { Component, input } from '@angular/core';

@Component({
  selector: 'app-error-message',
  standalone: true,
  template: `
    <div class="error-box" role="alert">
      <span class="icon">⚠️</span>
      <p>{{ message() }}</p>
    </div>
  `,
  styles: [
    `
      .error-box {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1rem;
        background: #fdecea;
        border: 1px solid #f5c6cb;
        border-radius: 6px;
        color: #721c24;
        margin: 0.5rem 0;
      }
      .icon {
        font-size: 1.25rem;
      }
      p {
        margin: 0;
      }
    `,
  ],
})
export class ErrorMessage {
  readonly message = input.required<string>();
}
