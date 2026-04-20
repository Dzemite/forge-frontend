import { Component } from '@angular/core';

@Component({
  selector: 'forge-courses-page',
  standalone: true,
  template: `
    <section class="page">
      <header class="page__header">
        <h1>Программа обучения</h1>
        <p>4 уровня развития — от первой искры до мастерства.</p>
      </header>

      <div class="grid">
        @for (level of levels; track level.title) {
          <article class="card">
            <div class="card__top">
              <div class="badge">{{ level.badge }}</div>
              <div class="progress" aria-label="Прогресс уровня">
                <div class="progress__bar" [style.width.%]="level.progress"></div>
              </div>
            </div>
            <h2>{{ level.title }}</h2>
            <p class="muted">{{ level.subtitle }}</p>
            <ul>
              @for (item of level.bullets; track item) {
                <li>{{ item }}</li>
              }
            </ul>
          </article>
        }
      </div>
    </section>
  `,
  styles: [
    `
      .page {
        max-width: 1200px;
        margin: 0 auto;
        padding: 48px 20px 80px;
      }

      .page__header {
        margin-bottom: 22px;
      }

      .grid {
        display: grid;
        gap: 14px;
      }

      .card {
        border-radius: 18px;
        border: 1px solid color-mix(in oklch, var(--c-border) 70%, transparent);
        background: color-mix(in oklch, var(--c-card) 88%, transparent);
        padding: 18px 16px;
      }

      .card__top {
        display: flex;
        gap: 12px;
        align-items: center;
        justify-content: space-between;
      }

      .badge {
        font-weight: 900;
        letter-spacing: 0.08em;
        font-size: 12px;
        opacity: 0.85;
      }

      .progress {
        flex: 1;
        height: 10px;
        border-radius: 999px;
        background: color-mix(in oklch, var(--c-border) 60%, transparent);
        overflow: hidden;
      }

      .progress__bar {
        height: 100%;
        background: linear-gradient(90deg, var(--c-accent) 0%, var(--c-accent-2) 100%);
      }

      h2 {
        margin: 14px 0 6px;
      }

      ul {
        margin: 14px 0 0;
        padding-left: 18px;
      }

      .muted {
        opacity: 0.85;
      }

      @media (min-width: 900px) {
        .grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }
    `,
  ],
})
export class CoursesPage {
  protected readonly levels = [
    {
      badge: 'УРОВЕНЬ 1',
      title: 'Первая искра',
      subtitle: 'Схемы, свет и первые “ожившие” детали.',
      progress: 15,
      bullets: ['LED и резисторы', 'Питание и безопасность', 'Первые мини-проекты'],
    },
    {
      badge: 'УРОВЕНЬ 2',
      title: 'Кузница схем',
      subtitle: 'Датчики, моторы и проектирование цепей.',
      progress: 0,
      bullets: ['Датчики движения/света', 'Сервоприводы и моторы', 'Сборка модулей'],
    },
    {
      badge: 'УРОВЕНЬ 3',
      title: 'Код и робот',
      subtitle: 'Arduino-логика, алгоритмы, управление роботом.',
      progress: 0,
      bullets: ['Условия и циклы', 'Управление устройствами', 'Сборка робота'],
    },
    {
      badge: 'УРОВЕНЬ 4',
      title: 'Мастер будущего',
      subtitle: 'Финальный проект и инженерное мышление.',
      progress: 0,
      bullets: ['Финальный проект', 'Презентация результата', 'Следующий уровень'],
    },
  ];
}
