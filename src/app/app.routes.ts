import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./core/layout/app-shell.component').then((m) => m.AppShellComponent),
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./features/landing/landing.page').then((m) => m.LandingPage),
      },
      {
        path: 'faq',
        loadComponent: () => import('./features/landing/faq.page').then((m) => m.FaqPage),
      },
      {
        path: 'about',
        loadComponent: () => import('./features/landing/about.page').then((m) => m.AboutPage),
      },
      {
        path: 'courses',
        loadComponent: () => import('./features/courses/courses.page').then((m) => m.CoursesPage),
      },
      {
        path: 'auth',
        children: [
          {
            path: 'login',
            loadComponent: () => import('./features/auth/login.page').then((m) => m.LoginPage),
          },
          {
            path: 'register',
            loadComponent: () => import('./features/auth/register.page').then((m) => m.RegisterPage),
          },
        ],
      },
      {
        path: 'platform',
        canMatch: [() => import('./core/guards/auth.guard').then((m) => m.authGuard)],
        loadComponent: () => import('./features/platform/platform.page').then((m) => m.PlatformPage),
      },
      {
        path: 'knowledge-base',
        loadComponent: () =>
          import('./features/knowledge-base/knowledge-base.page').then((m) => m.KnowledgeBasePage),
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];
