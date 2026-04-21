import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'forge-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatButtonModule],
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
          <a class="font-bold text-white/80 hover:text-white" routerLink="/courses" routerLinkActive="!text-white"
            >Программа</a
          >
          <a class="font-bold text-white/80 hover:text-white" routerLink="/faq" routerLinkActive="!text-white"
            >FAQ</a
          >
          <a class="font-bold text-white/80 hover:text-white" routerLink="/about" routerLinkActive="!text-white"
            >О нас</a
          >
        </nav>

        <div class="flex items-center gap-2">
          <a mat-button routerLink="/auth/login">Войти</a>
          <a mat-raised-button class="!rounded-xl !font-black" routerLink="/auth/register">Регистрация</a>
        </div>
      </div>
    </header>
  `,
})
export class HeaderComponent {}
