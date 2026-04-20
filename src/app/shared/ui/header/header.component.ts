import { Component, computed, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'forge-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="header">
      <a class="brand" routerLink="/">
        <span class="brand__mark" aria-hidden="true">⚙️</span>
        <span class="brand__text">Инженер360</span>
      </a>

      <nav class="nav" aria-label="Основная навигация">
        <a routerLink="/courses" routerLinkActive="is-active">Программа</a>
        <a routerLink="/faq" routerLinkActive="is-active">FAQ</a>
        <a routerLink="/about" routerLinkActive="is-active">О нас</a>
      </nav>

      <div class="actions">
        <a class="link" routerLink="/auth/login">Войти</a>
        <a class="btn" routerLink="/auth/register">Регистрация</a>
      </div>
    </header>
  `,
  styles: [
    `
      .header {
        position: sticky;
        top: 0;
        z-index: 50;
        height: var(--header-height);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        border-bottom: 1px solid color-mix(in oklch, var(--c-border) 65%, transparent);
        background: color-mix(in oklch, var(--c-bg) 82%, transparent);
        backdrop-filter: blur(10px);
      }

      .brand {
        display: inline-flex;
        gap: 10px;
        align-items: center;
        text-decoration: none;
        color: inherit;
        font-weight: 700;
      }

      .brand__mark {
        width: 34px;
        height: 34px;
        display: grid;
        place-items: center;
        border-radius: 10px;
        background: color-mix(in oklch, var(--c-card) 75%, transparent);
        border: 1px solid color-mix(in oklch, var(--c-border) 70%, transparent);
      }

      .nav {
        display: none;
        gap: 16px;
        align-items: center;
      }

      .nav a {
        text-decoration: none;
        color: color-mix(in oklch, var(--c-text) 80%, var(--c-muted));
        font-weight: 600;
      }

      .nav a.is-active {
        color: var(--c-text);
      }

      .actions {
        display: inline-flex;
        align-items: center;
        gap: 12px;
      }

      .link {
        text-decoration: none;
        color: color-mix(in oklch, var(--c-text) 80%, var(--c-muted));
        font-weight: 600;
      }

      .btn {
        text-decoration: none;
        font-weight: 700;
        padding: 10px 14px;
        border-radius: 12px;
        border: 1px solid color-mix(in oklch, var(--c-border) 70%, transparent);
        background: linear-gradient(135deg, var(--c-accent) 0%, var(--c-accent-2) 100%);
        color: white;
      }

      @media (min-width: 900px) {
        .nav {
          display: inline-flex;
        }
      }
    `,
  ],
})
export class HeaderComponent {}
