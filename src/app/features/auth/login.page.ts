import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'forge-login-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="min-h-[calc(100dvh-var(--header-height))] grid place-items-center px-5 py-10">
      <div
        class="w-full max-w-[520px] rounded-2xl border border-white/10 bg-white/5 backdrop-blur px-4 py-5"
      >
        <h1 class="text-2xl font-black">Войти</h1>
        <p class="mt-2 text-white/80">
          MVP-авторизация через cookie-сессию. Сейчас API замокано внутри фронта.
        </p>

        <div class="mt-4 grid gap-2">
          <button
            type="button"
            class="rounded-xl px-4 py-3 font-black text-white bg-gradient-to-br from-[color:var(--c-accent)] to-[color:var(--c-accent-2)]"
            (click)="onLogin()"
          >
            Войти
          </button>

          <a class="text-center font-bold text-white/80 hover:text-white" routerLink="/auth/register">
            Нет аккаунта? Регистрация
          </a>
        </div>
      </div>
    </section>
  `,
})
export class LoginPage {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  async onLogin(): Promise<void> {
    await this.auth.login();
    await this.router.navigateByUrl('/platform');
  }
}
