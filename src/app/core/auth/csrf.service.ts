import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

const CSRF_COOKIE = 'XSRF-TOKEN';

function readCookie(doc: Document, name: string): string | null {
  const match = doc.cookie.match(new RegExp('(^|;\\s*)' + name + '=([^;]*)'));
  return match ? decodeURIComponent(match[2] ?? '') : null;
}

function randomToken(): string {
  // Not cryptographically strong, but fine for dev fallback.
  return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
}

@Injectable({ providedIn: 'root' })
export class CsrfService {
  private readonly http = inject(HttpClient);
  private readonly doc = inject(DOCUMENT);

  /**
   * Current CSRF token (read from cookie or fetched).
   *
   * Server contract (future):
   * - GET /api/auth/csrf sets cookie XSRF-TOKEN (NOT HttpOnly)
   * - Frontend reads it and sends header X-CSRF-Token on mutating requests
   */
  readonly token = signal<string | null>(null);

  async init(): Promise<void> {
    const fromCookie = readCookie(this.doc, CSRF_COOKIE);
    if (fromCookie) {
      this.token.set(fromCookie);
      return;
    }

    try {
      await firstValueFrom(this.http.get('/api/auth/csrf', { responseType: 'text' }));
      const after = readCookie(this.doc, CSRF_COOKIE);
      this.token.set(after);
    } catch {
      // Dev fallback: no backend yet.
      const dev = randomToken();
      // expose token through a cookie so interceptor + other code path matches future behaviour
      this.doc.cookie = `${CSRF_COOKIE}=${encodeURIComponent(dev)}; path=/; SameSite=Lax`;
      this.token.set(dev);
    }
  }
}
