import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { ProgressDashboardComponent } from './ui/progress-dashboard/progress-dashboard.component';

@Component({
  selector: 'forge-platform-page',
  standalone: true,
  imports: [ProgressDashboardComponent],
  template: `
    <section class="mx-auto max-w-[1100px] px-5 py-12">
      <div class="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 class="text-3xl font-black">Платформа (LMS)</h1>
          <p class="mt-2 text-white/80">Твой кабинет: прогресс, курсы, группы и чат (скоро).</p>
        </div>

        @if (user(); as u) {
          <div class="forge-surface forge-surface--tight">
            <div class="text-sm text-white/70">Аккаунт</div>
            <div class="font-black">{{ u.name }}</div>
          </div>
        }
      </div>

      <div class="mt-5">
        <forge-progress-dashboard />
      </div>

      <div class="mt-6">
        <button
          type="button"
          class="rounded-xl px-4 py-3 font-black text-white/90 bg-white/5 hover:bg-white/10"
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
