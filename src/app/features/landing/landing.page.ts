import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EngineerPathComponent } from './ui/engineer-path/engineer-path.component';

@Component({
  selector: 'forge-landing-page',
  standalone: true,
  imports: [RouterLink, EngineerPathComponent],
  template: `
    <section class="hero">
      <div class="hero__content">
        <p class="kicker">ИНЖЕНЕР360</p>
        <h1>Кузница инженеров будущего</h1>
        <p class="lead">От первого светодиода до собственного робота за 3 месяца.</p>

        <div class="cta">
          <a class="btn btn--primary" routerLink="/auth/register">🚀 Попробовать бесплатно</a>
          <a class="btn btn--ghost" href="#path">📹 Смотреть видео</a>
        </div>

        <div class="trust">
          <div class="trust__item">14 дней гарантия возврата</div>
          <div class="trust__item">доставка наборов РФ/КЗ/УЗ/ТЖ</div>
          <div class="trust__item">возраст 7–12 лет</div>
        </div>
      </div>

      <div class="hero__visual" aria-hidden="true">
        <div class="orb orb--a"></div>
        <div class="orb orb--b"></div>
        <div class="orb orb--c"></div>
        <div class="card">
          <div class="card__title">Путь инженера</div>
          <div class="card__sub">Скролль и собирай робота</div>
        </div>
      </div>
    </section>

    <section id="path" class="path">
      <forge-engineer-path />
    </section>
  `,
  styles: [
    `
      .hero {
        display: grid;
        gap: 40px;
        padding: 56px 20px 32px;
        max-width: 1200px;
        margin: 0 auto;
        align-items: center;
      }

      .kicker {
        letter-spacing: 0.12em;
        font-weight: 800;
        opacity: 0.8;
      }

      h1 {
        font-size: clamp(32px, 4vw, 56px);
        line-height: 1.05;
        margin: 10px 0 12px;
      }

      .lead {
        font-size: 18px;
        opacity: 0.85;
        max-width: 52ch;
      }

      .cta {
        display: flex;
        gap: 12px;
        margin-top: 18px;
        flex-wrap: wrap;
      }

      .btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 12px 16px;
        border-radius: 14px;
        text-decoration: none;
        font-weight: 800;
        border: 1px solid color-mix(in oklch, var(--c-border) 70%, transparent);
      }

      .btn--primary {
        background: linear-gradient(135deg, var(--c-accent) 0%, var(--c-accent-2) 100%);
        color: white;
      }

      .btn--ghost {
        background: color-mix(in oklch, var(--c-card) 70%, transparent);
        color: var(--c-text);
      }

      .trust {
        display: grid;
        gap: 8px;
        margin-top: 18px;
        opacity: 0.85;
      }

      .trust__item {
        padding-left: 12px;
        border-left: 2px solid color-mix(in oklch, var(--c-border) 60%, var(--c-accent));
      }

      .hero__visual {
        position: relative;
        height: 320px;
        border-radius: 20px;
        border: 1px solid color-mix(in oklch, var(--c-border) 70%, transparent);
        overflow: hidden;
        background: radial-gradient(circle at 30% 20%, color-mix(in oklch, var(--c-accent) 40%, transparent), transparent 55%),
          radial-gradient(circle at 75% 30%, color-mix(in oklch, var(--c-accent-2) 35%, transparent), transparent 60%),
          color-mix(in oklch, var(--c-card) 85%, transparent);
      }

      .orb {
        position: absolute;
        filter: blur(18px);
        opacity: 0.75;
      }

      .orb--a {
        width: 140px;
        height: 140px;
        left: 20px;
        top: 40px;
        background: color-mix(in oklch, var(--c-accent) 75%, transparent);
      }

      .orb--b {
        width: 200px;
        height: 200px;
        right: -30px;
        top: -30px;
        background: color-mix(in oklch, var(--c-accent-2) 65%, transparent);
      }

      .orb--c {
        width: 140px;
        height: 140px;
        right: 80px;
        bottom: -50px;
        background: color-mix(in oklch, white 10%, transparent);
      }

      .card {
        position: absolute;
        left: 20px;
        bottom: 20px;
        padding: 14px 16px;
        border-radius: 16px;
        border: 1px solid color-mix(in oklch, var(--c-border) 70%, transparent);
        background: color-mix(in oklch, var(--c-bg) 82%, transparent);
        backdrop-filter: blur(10px);
      }

      .card__title {
        font-weight: 800;
      }

      .card__sub {
        opacity: 0.8;
      }

      @media (min-width: 900px) {
        .hero {
          grid-template-columns: 1.1fr 0.9fr;
          padding: 72px 24px 48px;
        }

        .hero__visual {
          height: 420px;
        }

        .trust {
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
        }
      }

      .path {
        padding: 0 0 64px;
      }
    `,
  ],
})
export class LandingPage {}
