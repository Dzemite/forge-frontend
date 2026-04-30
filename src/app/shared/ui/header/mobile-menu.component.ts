import { Component, EventEmitter, Output, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoPipe } from '@jsverse/transloco';
import { I18nService } from '../../../core/services/i18n.service';

@Component({
  selector: 'forge-mobile-menu',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatIconModule, TranslocoPipe],
  template: `
    <div class="fixed inset-0 z-[9999] isolate">
      <!-- backdrop -->
      <button
        type="button"
        class="forge-mobile-menu-backdrop fixed inset-0"
        (click)="close.emit()"
        aria-label="Close menu"
      ></button>

      <!-- panel -->
      <aside
        class="forge-mobile-menu-panel fixed right-0 top-0 h-full w-[340px] max-w-[92vw] rounded-none"
        style="border-top-left-radius: 18px; border-bottom-left-radius: 18px;"
        role="dialog"
        aria-label="Navigation"
      >
        <div class="h-full forge-surface forge-surface--loose" style="border-radius: 0; background: transparent; box-shadow: none;">
        <div class="flex items-center justify-between gap-3">
          <div class="font-black">Меню</div>
          <button mat-icon-button type="button" (click)="close.emit()" aria-label="Close">
            <mat-icon>close</mat-icon>
          </button>
        </div>

        <nav class="mt-5 grid gap-2">
          <a class="px-3 py-3 rounded-xl bg-white/5 hover:bg-white/10 font-black" routerLink="/courses" (click)="close.emit()">
            {{ 'nav.program' | transloco }}
          </a>
          <a class="px-3 py-3 rounded-xl bg-white/5 hover:bg-white/10 font-black" routerLink="/faq" (click)="close.emit()">
            {{ 'nav.faq' | transloco }}
          </a>
          <a class="px-3 py-3 rounded-xl bg-white/5 hover:bg-white/10 font-black" routerLink="/about" (click)="close.emit()">
            {{ 'nav.about' | transloco }}
          </a>
        </nav>

        <div class="mt-6 grid gap-2">
          <button mat-stroked-button type="button" class="!rounded-xl !font-black" (click)="toggleLang()">
            {{ i18n.active.toUpperCase() }}
          </button>
          <a mat-stroked-button class="!rounded-xl !font-black" routerLink="/auth/login" (click)="close.emit()">
            {{ 'nav.login' | transloco }}
          </a>
          <a mat-raised-button class="!rounded-xl !font-black" routerLink="/auth/register" (click)="close.emit()">
            {{ 'nav.register' | transloco }}
          </a>
        </div>
        </div>
      </aside>
    </div>
  `,
})
export class MobileMenuComponent {
  @Output() close = new EventEmitter<void>();

  protected readonly i18n = inject(I18nService);

  toggleLang(): void {
    this.i18n.toggle();
  }
}
