import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CsrfService } from '../auth/csrf.service';

const MUTATING = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

export function csrfInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  if (!MUTATING.has(req.method)) return next(req);

  // Don't attach token for cross-origin requests (future-proof).
  try {
    const url = new URL(req.url, window.location.origin);
    if (url.origin !== window.location.origin) return next(req);
  } catch {
    // ignore
  }

  const csrf = inject(CsrfService);
  const token = csrf.token();
  if (!token) return next(req);

  return next(req.clone({ setHeaders: { 'X-CSRF-Token': token } }));
}
