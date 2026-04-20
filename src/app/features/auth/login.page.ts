import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'forge-login-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="page">
      <div class="card">
        <h1>Войти</h1>
        <p class="muted">Пока это заглушка. Дальше подключим настоящий auth.</p>

        <div class="actions">
          <a class="btn" routerLink="/platform">Войти и перейти в платформу</a>
          <a class="link" routerLink="/auth/register">Нет аккаунта? Регистрация</a>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .page {
        min-height: calc(100dvh - var(--header-height));
        display: grid;
        place-items: center;
        padding: 40px 20px;
      }
      .card {
        width: min(520px, 100%);
        border-radius: 18px;
        border: 1px solid color-mix(in oklch, var(--c-border) 70%, transparent);
        background: color-mix(in oklch, var(--c-card) 88%, transparent);
        padding: 18px 16px;
      }
      .muted {
        opacity: 0.85;
      }
      .actions {
        display: grid;
        gap: 10px;
        margin-top: 14px;
      }
      .btn {
        text-decoration: none;
        font-weight: 900;
        padding: 12px 14px;
        border-radius: 14px;
        background: linear-gradient(135deg, var(--c-accent) 0%, var(--c-accent-2) 100%);
        color: white;
        text-align: center;
      }
      .link {
        text-decoration: none;
        color: color-mix(in oklch, var(--c-text) 85%, var(--c-muted));
        text-align: center;
        font-weight: 700;
      }
    `,
  ],
})
export class LoginPage {}
