import { Component } from '@angular/core';

@Component({
  selector: 'forge-about-page',
  standalone: true,
  template: `
    <section class="page">
      <header class="page__header">
        <h1>О нас</h1>
        <p>360° обучение инженера: схема → робот. Полный цикл. Видимый прогресс.</p>
      </header>

      <div class="stats">
        <div class="stat">
          <div class="stat__value">500+</div>
          <div class="stat__label">учеников</div>
        </div>
        <div class="stat">
          <div class="stat__value">92%</div>
          <div class="stat__label">completion rate</div>
        </div>
        <div class="stat">
          <div class="stat__value">3 мес</div>
          <div class="stat__label">до своего робота</div>
        </div>
      </div>

      <div class="card">
        <h2>Что внутри платформы</h2>
        <ul>
          <li>Геймификация: путь инженера, уровни, прогресс.</li>
          <li>Интерактивные уроки и мини-проекты.</li>
          <li>После входа — кабинет ученика (LMS), где всё собрано в одном месте.</li>
        </ul>
      </div>

      <div class="note">
        Дальше мы добавим раздел “Справочник” (knowledge base) — как удобное дерево знаний.
      </div>
    </section>
  `,
  styles: [
    `
      .page {
        max-width: 900px;
        margin: 0 auto;
        padding: 48px 20px 80px;
      }

      .stats {
        display: grid;
        gap: 12px;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        margin: 20px 0;
      }

      .stat {
        border-radius: 18px;
        border: 1px solid color-mix(in oklch, var(--c-border) 70%, transparent);
        background: color-mix(in oklch, var(--c-card) 88%, transparent);
        padding: 16px;
      }

      .stat__value {
        font-weight: 950;
        font-size: 28px;
      }

      .stat__label {
        opacity: 0.85;
      }

      .card {
        border-radius: 18px;
        border: 1px solid color-mix(in oklch, var(--c-border) 70%, transparent);
        background: color-mix(in oklch, var(--c-card) 88%, transparent);
        padding: 18px 16px;
      }

      ul {
        margin: 12px 0 0;
        padding-left: 18px;
      }

      .note {
        margin-top: 16px;
        opacity: 0.85;
      }
    `,
  ],
})
export class AboutPage {}
