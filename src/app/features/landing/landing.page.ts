import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { EngineerPathComponent } from './ui/engineer-path/engineer-path.component';

@Component({
  selector: 'forge-landing-page',
  standalone: true,
  imports: [RouterLink, MatButtonModule, EngineerPathComponent],
  template: `
    <section class="mx-auto max-w-[1200px] px-5 pt-14 pb-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
      <div>
        <p class="text-xs font-black tracking-[0.22em] text-white/80">ИНЖЕНЕР360</p>
        <h1 class="mt-3 text-[clamp(32px,4vw,56px)] leading-[1.05] font-black">Кузница инженеров будущего</h1>
        <p class="mt-3 text-lg text-white/85 max-w-[52ch]">От первого светодиода до собственного робота за 3 месяца.</p>

        <div class="mt-5 flex flex-wrap gap-2">
          <a mat-raised-button class="!rounded-xl !font-black" routerLink="/auth/register">🚀 Попробовать бесплатно</a>
          <a mat-button class="!rounded-xl !font-black" href="#path">📹 Смотреть видео</a>
        </div>

        <div class="mt-6 grid gap-2 md:grid-cols-3 text-white/80">
          <div class="pl-3 border-l-2 border-white/10">14 дней гарантия возврата</div>
          <div class="pl-3 border-l-2 border-white/10">доставка наборов РФ/КЗ/УЗ/ТЖ</div>
          <div class="pl-3 border-l-2 border-white/10">возраст 7–12 лет</div>
        </div>
      </div>

      <div class="forge-surface forge-surface--interactive relative h-[320px] lg:h-[420px] overflow-hidden" aria-hidden="true">
        <div
          class="absolute left-5 top-10 w-36 h-36 blur-2xl opacity-70"
          style="background: color-mix(in oklch, var(--c-accent) 75%, transparent)"
        ></div>
        <div
          class="absolute right-[-30px] top-[-30px] w-[200px] h-[200px] blur-2xl opacity-70"
          style="background: color-mix(in oklch, var(--c-accent-2) 65%, transparent)"
        ></div>
        <div class="absolute left-5 bottom-5 max-w-[260px] forge-surface forge-surface--tight">
          <div class="text-sm font-black tracking-wide text-white/85">Путь инженера</div>
          <div class="mt-1 font-black">Скролль — робот соберётся</div>
          <div class="mt-1 text-white/80">И ты увидишь прогресс по этапам.</div>
        </div>
      </div>
    </section>

    <section id="path" class="pb-16">
      <forge-engineer-path />
    </section>
  `,
})
export class LandingPage {}
