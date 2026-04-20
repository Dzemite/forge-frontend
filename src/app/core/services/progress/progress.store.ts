import { Injectable, computed, signal } from '@angular/core';
import { CoursesRepository } from '../../../features/courses/data/courses.repository';
import type { CourseLevelId } from '../../../features/courses/domain/course.model';

export type ProgressState = {
  activeLevelId: CourseLevelId;
  completionPercent: number; // 0..100
  streakDays: number;
  nextLessonTitle: string;
};

@Injectable({ providedIn: 'root' })
export class ProgressStore {
  private readonly state = signal<ProgressState>({
    activeLevelId: 'spark',
    completionPercent: 18,
    streakDays: 4,
    nextLessonTitle: 'LED: первый свет',
  });

  readonly vm = computed(() => this.state());

  constructor(private readonly coursesRepo: CoursesRepository) {}

  // MVP actions
  setActiveLevel(levelId: CourseLevelId): void {
    this.state.update((s) => ({ ...s, activeLevelId: levelId }));
  }

  bumpCompletion(delta: number): void {
    this.state.update((s) => ({ ...s, completionPercent: Math.max(0, Math.min(100, s.completionPercent + delta)) }));
  }
}
