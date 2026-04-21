import { Component, Input } from '@angular/core';
import type { CourseLevel } from '../../../features/courses/domain/course.model';

@Component({
  selector: 'forge-level-card',
  standalone: true,
  template: `
    <article class="forge-surface forge-surface--interactive">
      <div class="flex items-center justify-between gap-3">
        <div class="text-xs font-black tracking-widest text-white/80">{{ level.badge }}</div>
        @if (progressPercent !== null) {
          <div class="text-xs font-black text-white/70">{{ progressPercent }}%</div>
        }
      </div>

      <h2 class="mt-3 text-xl font-black">{{ level.title }}</h2>
      <p class="mt-1 text-white/80">{{ level.subtitle }}</p>

      <ul class="mt-3 list-disc pl-5 text-white/85">
        @for (item of level.bullets; track item) {
          <li>{{ item }}</li>
        }
      </ul>
    </article>
  `,
})
export class LevelCardComponent {
  @Input({ required: true }) level!: CourseLevel;
  /** Optional per-level progress (0..100) */
  @Input({ required: false }) progressPercent: number | null = null;
}
