import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { TranslocoPipe } from '@jsverse/transloco';
import { I18nService } from '../../../core/services/i18n.service';

@Component({
  selector: 'forge-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatButtonModule, TranslocoPipe],
  template: `
    <header
      class="sticky top-0 z-50 h-[var(--header-height)] px-5 bg-[color:color-mix(in_oklch,var(--c-bg)_82%,transparent)] backdrop-blur"
    >
      <div class="mx-auto max-w-[1200px] h-full flex items-center justify-between">
        <a class="inline-flex items-center gap-2 font-black" routerLink="/">
          <span
            class="w-9 h-9 grid place-items-center rounded-xl bg-white/5"
            aria-hidden="true"
            >⚙️</span
          >
          <span>Инженер360</span>
        </a>

        <nav class="hidden md:flex items-center gap-4" aria-label="Основная навигация">
          <a class="font-bold text-white/80 hover:text-white" routerLink="/courses" routerLinkActive="!text-white">
            {{ 'common.nav.program' | transloco }}
          </a>
          <a class="font-bold text-white/80 hover:text-white" routerLink="/faq" routerLinkActive="!text-white">
            {{ 'common.nav.faq' | transloco }}
          </a>
          <a class="font-bold text-white/80 hover:text-white" routerLink="/about" routerLinkActive="!text-white">
            {{ 'common.nav.about' | transloco }}
          </a>
        </nav>

        <div class="flex items-center gap-2">
          <button mat-button type="button" (click)="i18n.toggle()">{{ i18n.active.toUpperCase() }}</button>
          <a mat-button routerLink="/auth/login">{{ 'common.nav.login' | transloco }}</a>
          <a mat-raised-button class="!rounded-xl !font-black" routerLink="/auth/register">
            {{ 'common.nav.register' | transloco }}
          </a>
        </div>
      </div>
    </header>
  `,
})
export class HeaderComponent {
  protected readonly i18n = inject(I18nService);
}
