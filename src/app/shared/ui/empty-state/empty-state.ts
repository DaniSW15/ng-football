import { Component, input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  template: `
    <div class="empty-state">
      <span class="icon">{{ icon() }}</span>
      <p>{{ message() }}</p>
      <ng-content />
    </div>
  `,
  styles: [
    `
      .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 3rem 1rem;
        color: #888;
        text-align: center;
      }
      .icon {
        font-size: 3rem;
        margin-bottom: 0.5rem;
      }
      p {
        margin: 0;
        font-size: 1.1rem;
      }
    `,
  ],
})
export class EmptyState {
  readonly message = input('No hay datos para mostrar.');
  readonly icon = input('📭');
}
