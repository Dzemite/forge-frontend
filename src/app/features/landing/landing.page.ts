import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { TranslocoPipe } from '@jsverse/transloco';
import { EngineerPathComponent } from './ui/engineer-path/engineer-path.component';

@Component({
  selector: 'forge-landing-page',
  standalone: true,
  imports: [RouterLink, MatButtonModule, TranslocoPipe, EngineerPathComponent],
  template: `
    <section class="mx-auto max-w-[1200px] px-5 pt-14 pb-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
      <div>
        <p class="text-xs font-black tracking-[0.22em] text-white/80">{{ 'landing.hero.kicker' | transloco: {} : 'landing' }}</p>
        <h1 class="mt-3 text-[clamp(32px,4vw,56px)] leading-[1.05] font-black">
          {{ 'landing.hero.title' | transloco: {} : 'landing' }}
        </h1>
        <p class="mt-3 text-lg text-white/85 max-w-[52ch]">{{ 'landing.hero.subtitle' | transloco: {} : 'landing' }}</p>

        <div class="mt-5 flex flex-wrap gap-2">
          <a mat-raised-button class="!rounded-xl !font-black" routerLink="/auth/register">
            {{ 'landing.hero.ctaPrimary' | transloco: {} : 'landing' }}
          </a>
          <a mat-button class="!rounded-xl !font-black" href="#path">
            {{ 'landing.hero.ctaSecondary' | transloco: {} : 'landing' }}
          </a>
        </div>

        <div class="mt-6 grid gap-2 md:grid-cols-3 text-white/80">
          <div class="pl-3 border-l-2 border-transparent">14 дней гарантия возврата</div>
          <div class="pl-3 border-l-2 border-transparent">доставка наборов РФ/КЗ/УЗ/ТЖ</div>
          <div class="pl-3 border-l-2 border-transparent">возраст 7–12 лет</div>
        </div>

        <div class="mt-6 grid gap-2 sm:grid-cols-2">
          <div class="forge-surface forge-surface--tight">
            <div class="text-sm font-black tracking-wide text-white/85">Путь инженера</div>
            <div class="mt-1 font-black">Скролль — робот соберётся</div>
            <div class="mt-1 text-white/80">Видимый прогресс по этапам, как интерактивная история.</div>
          </div>
          <div class="forge-surface forge-surface--tight">
            <div class="text-sm font-black tracking-wide text-white/85">Без лишней теории</div>
            <div class="mt-1 font-black">Сразу в практику</div>
            <div class="mt-1 text-white/80">Короткие занятия + мини‑проекты. Ребёнок видит результат.</div>
          </div>
        </div>
      </div>

      <!-- Removed separate right hero card to keep top section clean and premium -->
      <div class="hidden lg:block" aria-hidden="true"></div>
    </section>

    <section id="path" class="pb-16">
      <forge-engineer-path />
    </section>
  `,
})
export class LandingPage {}
