import { Component, inject } from '@angular/core';
import { CoursesRepository } from './data/courses.repository';
import { LevelCardComponent } from '../../shared/ui/level-card/level-card.component';

@Component({
  selector: 'forge-courses-page',
  standalone: true,
  imports: [LevelCardComponent],
  template: `
    <section class="mx-auto max-w-[1200px] px-5 py-12">
      <header class="mb-5">
        <h1 class="text-3xl font-black">Программа обучения</h1>
        <p class="mt-2 text-white/80">4 уровня развития — от первой искры до мастерства.</p>
      </header>

      <div class="grid gap-3 md:grid-cols-2">
        @for (level of levels; track level.id) {
          <forge-level-card [level]="level" />
        }
      </div>
    </section>
  `,
})
export class CoursesPage {
  private readonly repo = inject(CoursesRepository);
  protected readonly levels = this.repo.getLevels();
}
