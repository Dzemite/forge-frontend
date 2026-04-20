import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import type { Session, User } from './models/auth.models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);

  readonly session = signal<Session | null>(null);
  readonly status = signal<'idle' | 'loading' | 'authenticated' | 'anonymous'>('idle');

  readonly user = computed<User | null>(() => this.session()?.user ?? null);
  readonly isAuthenticated = computed(() => !!this.user());

  async bootstrap(): Promise<void> {
    this.status.set('loading');
    try {
      const session = await firstValueFrom(this.http.get<Session>('/api/auth/me'));
      this.session.set(session);
      this.status.set('authenticated');
    } catch {
      this.session.set(null);
      this.status.set('anonymous');
    }
  }

  async login(): Promise<void> {
    // MVP: backend will set HttpOnly cookies. This endpoint just triggers that.
    this.status.set('loading');
    await firstValueFrom(this.http.post('/api/auth/login', {}, { responseType: 'text' }));
    await this.bootstrap();
  }

  async register(): Promise<void> {
    this.status.set('loading');
    await firstValueFrom(this.http.post('/api/auth/register', {}, { responseType: 'text' }));
    await this.bootstrap();
  }

  async logout(): Promise<void> {
    await firstValueFrom(this.http.post('/api/auth/logout', {}, { responseType: 'text' }));
    this.session.set(null);
    this.status.set('anonymous');
  }
}
