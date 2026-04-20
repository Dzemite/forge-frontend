import { Injectable } from '@angular/core';
import type { CourseLevel } from '../domain/course.model';

@Injectable({ providedIn: 'root' })
export class CoursesRepository {
  getLevels(): CourseLevel[] {
    return [
      {
        id: 'spark',
        badge: 'УРОВЕНЬ 1',
        title: 'Первая искра',
        subtitle: 'Схемы, свет и первые “ожившие” детали.',
        bullets: ['LED и резисторы', 'Питание и безопасность', 'Первые мини-проекты'],
      },
      {
        id: 'circuits',
        badge: 'УРОВЕНЬ 2',
        title: 'Кузница схем',
        subtitle: 'Датчики, моторы и проектирование цепей.',
        bullets: ['Датчики движения/света', 'Сервоприводы и моторы', 'Сборка модулей'],
      },
      {
        id: 'code-robot',
        badge: 'УРОВЕНЬ 3',
        title: 'Код и робот',
        subtitle: 'Arduino-логика, алгоритмы, управление роботом.',
        bullets: ['Условия и циклы', 'Управление устройствами', 'Сборка робота'],
      },
      {
        id: 'master',
        badge: 'УРОВЕНЬ 4',
        title: 'Мастер будущего',
        subtitle: 'Финальный проект и инженерное мышление.',
        bullets: ['Финальный проект', 'Презентация результата', 'Следующий уровень'],
      },
    ];
  }
}
