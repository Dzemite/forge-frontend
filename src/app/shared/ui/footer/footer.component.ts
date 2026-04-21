import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'forge-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="mt-16 pb-10">
      <div class="forge-surface forge-surface--tight w-full">
        <div class="mx-auto max-w-[1200px] px-5">
        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div class="text-sm font-black tracking-wide text-white/85">Инженер360</div>
            <div class="mt-1 text-white/75">Геймифицированное обучение робототехнике для детей 7–12 лет.</div>
          </div>

          <div class="flex flex-wrap gap-3 text-white/80 font-bold">
            <a class="hover:text-white" routerLink="/faq">FAQ</a>
            <a class="hover:text-white" routerLink="/courses">Программа</a>
            <a class="hover:text-white" routerLink="/about">О нас</a>
          </div>
        </div>

        <div class="mt-4 text-xs text-white/55">© {{ year }} Инженер360. MVP.</div>
      </div>
    </div>
  </footer>
  `,
})
export class FooterComponent {
  protected readonly year = new Date().getUTCFullYear();
}
