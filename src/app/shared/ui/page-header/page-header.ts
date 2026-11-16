import { Component, input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  standalone: true,
  template: `
    <header class="page-header">
      <h1>{{ title() }}</h1>
      @if (subtitle(); as sub) {
        <p class="subtitle">{{ sub }}</p>
      }
      <ng-content />
    </header>
  `,
  styles: [
    `
      .page-header {
        margin-bottom: 1.5rem;
        border-bottom: 2px solid #e0e0e0;
        padding-bottom: 0.75rem;
      }
      h1 {
        margin: 0;
        font-size: 1.75rem;
        color: #1a1a2e;
      }
      .subtitle {
        margin: 0.25rem 0 0;
        color: #666;
        font-size: 0.95rem;
      }
    `,
  ],
})
export class PageHeader {
  readonly title = input.required<string>();
  readonly subtitle = input<string>();
}
