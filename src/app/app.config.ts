import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { AuthService } from './core/auth/auth.service';
import { CsrfService } from './core/auth/csrf.service';
import { csrfInterceptor } from './core/interceptors/csrf.interceptor';
import { mockApiInterceptor } from './core/services/mock-api/mock-api.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([mockApiInterceptor, csrfInterceptor])),
    provideAppInitializer(async () => {
      const csrf = inject(CsrfService);
      const auth = inject(AuthService);

      await csrf.init();
      await auth.bootstrap();
    }),
  ],
};
