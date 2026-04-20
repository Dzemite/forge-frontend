import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'forge-platform-page',
  standalone: true,
  template: `
    <section class="mx-auto max-w-[1100px] px-5 py-12">
      <div class="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 class="text-3xl font-black">Платформа (LMS)</h1>
          <p class="mt-2 text-white/80">
            Заглушка: после auth сюда будет редирект. Здесь появятся курсы, прогресс, группы и чат.
          </p>
        </div>

        @if (user(); as u) {
          <div class="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            <div class="text-sm text-white/70">Аккаунт</div>
            <div class="font-black">{{ u.name }}</div>
          </div>
        }
      </div>

      <div class="mt-5 grid gap-3 md:grid-cols-3">
        <div class="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
          <div class="font-black">Мой прогресс</div>
          <div class="mt-1 text-white/80">Уровни, достижения, streak.</div>
        </div>
        <div class="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
          <div class="font-black">Курсы</div>
          <div class="mt-1 text-white/80">Список доступных курсов и уроков.</div>
        </div>
        <div class="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
          <div class="font-black">Чат</div>
          <div class="mt-1 text-white/80">Групповые чаты (в будущем).</div>
        </div>
      </div>

      <div class="mt-6">
        <button
          type="button"
          class="rounded-xl px-4 py-3 font-black text-white/90 border border-white/10 bg-white/5 hover:bg-white/10"
          (click)="onLogout()"
        >
          Выйти
        </button>
      </div>
    </section>
  `,
})
export class PlatformPage {
  private readonly auth = inject(AuthService);
  protected readonly user = this.auth.user;

  async onLogout(): Promise<void> {
    await this.auth.logout();
  }
}
