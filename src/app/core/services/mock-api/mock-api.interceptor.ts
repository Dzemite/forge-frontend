import {
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

// Very small in-app mock layer so we can build auth/CSRF flows before backend exists.
// This should be removed once real API is available.

const SESSION_KEY = 'forge_mock_session';

function setCookie(name: string, value: string): void {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; SameSite=Lax`;
}

function clearCookie(name: string): void {
  document.cookie = `${name}=; path=/; Max-Age=0; SameSite=Lax`;
}

function getLocalSession(): any | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function setLocalSession(session: any | null): void {
  if (!session) {
    localStorage.removeItem(SESSION_KEY);
    return;
  }
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function mockApiInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  // Only mock /api calls.
  if (!req.url.startsWith('/api/')) return next(req);

  // CSRF endpoint: set a readable cookie token.
  if (req.method === 'GET' && req.url === '/api/auth/csrf') {
    const token = Math.random().toString(36).slice(2);
    setCookie('XSRF-TOKEN', token);
    return of(new HttpResponse({ status: 204 })).pipe(delay(100));
  }

  if (req.method === 'GET' && req.url === '/api/auth/me') {
    const session = getLocalSession();
    if (!session) return throwError(() => ({ status: 401 }));
    return of(new HttpResponse({ status: 200, body: session })).pipe(delay(150));
  }

  if (req.method === 'POST' && req.url === '/api/auth/login') {
    const session = {
      user: {
        id: 'u_mock',
        name: 'Робо-инженер',
        role: 'child',
      },
    };

    // Simulate HttpOnly cookie on backend: we cannot set HttpOnly from JS.
    // Instead we store session in localStorage but keep API contract the same.
    setLocalSession(session);
    return of(new HttpResponse({ status: 204 })).pipe(delay(250));
  }

  if (req.method === 'POST' && req.url === '/api/auth/register') {
    const session = {
      user: {
        id: 'u_mock',
        name: 'Новый инженер',
        role: 'child',
      },
    };
    setLocalSession(session);
    return of(new HttpResponse({ status: 204 })).pipe(delay(250));
  }

  if (req.method === 'POST' && req.url === '/api/auth/logout') {
    setLocalSession(null);
    clearCookie('XSRF-TOKEN');
    return of(new HttpResponse({ status: 204 })).pipe(delay(120));
  }

  return next(req);
}
