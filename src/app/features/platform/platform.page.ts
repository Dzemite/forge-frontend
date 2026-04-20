import { Component } from '@angular/core';

@Component({
  selector: 'forge-platform-page',
  standalone: true,
  template: `
    <section class="page">
      <h1>Платформа (LMS)</h1>
      <p class="muted">
        Заглушка: после auth сюда будет редирект. Здесь появятся курсы, прогресс, группы и чат.
      </p>

      <div class="grid">
        <div class="card">
          <div class="card__title">Мой прогресс</div>
          <div class="card__desc">Уровни, достижения, streak.</div>
        </div>
        <div class="card">
          <div class="card__title">Курсы</div>
          <div class="card__desc">Список доступных курсов и уроков.</div>
        </div>
        <div class="card">
          <div class="card__title">Чат</div>
          <div class="card__desc">Групповые чаты (в будущем).</div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .page {
        max-width: 1100px;
        margin: 0 auto;
        padding: 48px 20px 80px;
      }

      .muted {
        opacity: 0.85;
      }

      .grid {
        display: grid;
        gap: 12px;
        margin-top: 18px;
      }

      .card {
        border-radius: 18px;
        border: 1px solid color-mix(in oklch, var(--c-border) 70%, transparent);
        background: color-mix(in oklch, var(--c-card) 88%, transparent);
        padding: 18px 16px;
      }

      .card__title {
        font-weight: 900;
      }

      .card__desc {
        opacity: 0.85;
        margin-top: 6px;
      }

      @media (min-width: 900px) {
        .grid {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }
      }
    `,
  ],
})
export class PlatformPage {}
