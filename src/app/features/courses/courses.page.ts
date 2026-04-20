import { Component, inject } from '@angular/core';
import { CoursesRepository } from './data/courses.repository';

@Component({
  selector: 'forge-courses-page',
  standalone: true,
  template: `
    <section class="mx-auto max-w-[1200px] px-5 py-12">
      <header class="mb-5">
        <h1 class="text-3xl font-black">Программа обучения</h1>
        <p class="mt-2 text-white/80">4 уровня развития — от первой искры до мастерства.</p>
      </header>

      <div class="grid gap-3 md:grid-cols-2">
        @for (level of levels; track level.id) {
          <article class="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div class="flex items-center justify-between gap-3">
              <div class="text-xs font-black tracking-widest text-white/80">{{ level.badge }}</div>
            </div>
            <h2 class="mt-3 text-xl font-black">{{ level.title }}</h2>
            <p class="mt-1 text-white/80">{{ level.subtitle }}</p>
            <ul class="mt-3 list-disc pl-5 text-white/85">
              @for (item of level.bullets; track item) {
                <li>{{ item }}</li>
              }
            </ul>
          </article>
        }
      </div>
    </section>
  `,
})
export class CoursesPage {
  private readonly repo = inject(CoursesRepository);
  protected readonly levels = this.repo.getLevels();
}
