import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'forge-register-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="min-h-[calc(100dvh-var(--header-height))] grid place-items-center px-5 py-10">
      <div
        class="w-full max-w-[520px] rounded-2xl border border-white/10 bg-white/5 backdrop-blur px-4 py-5"
      >
        <h1 class="text-2xl font-black">Регистрация</h1>
        <p class="mt-2 text-white/80">MVP: создаём cookie-сессию (пока мок).</p>

        <div class="mt-4 grid gap-2">
          <button
            type="button"
            class="rounded-xl px-4 py-3 font-black text-white bg-gradient-to-br from-[color:var(--c-accent)] to-[color:var(--c-accent-2)]"
            (click)="onRegister()"
          >
            Создать аккаунт
          </button>

          <a class="text-center font-bold text-white/80 hover:text-white" routerLink="/auth/login">
            Уже есть аккаунт? Войти
          </a>
        </div>
      </div>
    </section>
  `,
})
export class RegisterPage {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  async onRegister(): Promise<void> {
    await this.auth.register();
    await this.router.navigateByUrl('/platform');
  }
}
