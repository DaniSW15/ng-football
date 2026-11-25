import { Component, inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { EmptyState, ErrorMessage, PageHeader } from '@shared';
import { AuthStore } from '../../state/auth-store';

@Component({
  selector: 'app-sessions-page',
  standalone: true,
  imports: [DatePipe, PageHeader, ErrorMessage, EmptyState],
  templateUrl: './sessions.page.html',
  styleUrl: './sessions.page.scss',
})
export class SessionsPage implements OnInit {
  protected readonly store = inject(AuthStore);

  ngOnInit(): void {
    this.store.loadMe();
    this.store.loadSessions();
  }

  onRevoke(sessionId: string): void {
    if (confirm('¿Revocar esta sesión? El token dejará de ser válido.')) {
      this.store.revokeSession(sessionId);
    }
  }

  onLogout(): void {
    this.store.logout();
  }
}
