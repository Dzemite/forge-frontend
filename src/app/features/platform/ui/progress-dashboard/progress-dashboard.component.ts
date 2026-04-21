import { Component, computed, inject } from '@angular/core';
import { ProgressStore } from '../../../../core/services/progress/progress.store';
import { CoursesRepository } from '../../../courses/data/courses.repository';
import { ProgressBarComponent } from '../../../../shared/ui/progress-bar/progress-bar.component';
import { LevelCardComponent } from '../../../../shared/ui/level-card/level-card.component';

@Component({
  selector: 'forge-progress-dashboard',
  standalone: true,
  imports: [ProgressBarComponent, LevelCardComponent],
  template: `
    <div class="grid gap-3 lg:grid-cols-3">
      <div class="forge-surface forge-surface--interactive">
        <div class="text-sm text-white/70">Прогресс</div>
        <div class="mt-1 flex items-end justify-between gap-3">
          <div class="text-3xl font-black">{{ vm().completionPercent }}%</div>
          <div class="text-sm text-white/70">streak: {{ vm().streakDays }} дн.</div>
        </div>
        <div class="mt-3">
          <forge-progress-bar [value]="vm().completionPercent" />
        </div>
      </div>

      <div class="forge-surface forge-surface--interactive">
        <div class="text-sm text-white/70">Следующий урок</div>
        <div class="mt-1 text-xl font-black">{{ vm().nextLessonTitle }}</div>
        <div class="mt-2 text-white/80">Продолжай — и робот станет ещё ближе.</div>
        <button
          type="button"
          class="mt-3 rounded-xl px-4 py-3 font-black text-white bg-gradient-to-br from-[color:var(--c-accent)] to-[color:var(--c-accent-2)]"
        >
          Продолжить
        </button>
      </div>

      <div class="forge-surface forge-surface--interactive">
        <div class="text-sm text-white/70">Текущий уровень</div>
        <div class="mt-3">
          <forge-level-card [level]="activeLevel()" [progressPercent]="vm().completionPercent" />
        </div>

        <div class="mt-3 flex flex-wrap gap-2">
          @for (lvl of levels; track lvl.id) {
            <button
              type="button"
              class="rounded-xl px-3 py-2 font-black border border-white/10 bg-white/5 hover:bg-white/10"
              [class.bg-white/10]="lvl.id === vm().activeLevelId"
              [class.text-white]="lvl.id === vm().activeLevelId"
              [class.text-white/80]="lvl.id !== vm().activeLevelId"
              (click)="select(lvl.id)"
            >
              {{ lvl.badge }}
            </button>
          }
        </div>
      </div>
    </div>
  `,
})
export class ProgressDashboardComponent {
  private readonly progress = inject(ProgressStore);
  private readonly coursesRepo = inject(CoursesRepository);

  protected readonly levels = this.coursesRepo.getLevels();
  protected readonly vm = this.progress.vm;

  protected readonly activeLevel = computed(() => {
    const id = this.vm().activeLevelId;
    return this.levels.find((l) => l.id === id) ?? this.levels[0];
  });

  select(id: any): void {
    this.progress.setActiveLevel(id);
  }
}
