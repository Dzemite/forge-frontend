import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoPipe } from '@jsverse/transloco';
import { I18nService } from '../../../core/services/i18n.service';
import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { MobileMenuOverlayComponent } from './mobile-menu-overlay.component';

@Component({
  selector: 'forge-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatButtonModule, MatIconModule, TranslocoPipe, OverlayModule],
  template: `
    <header class="sticky top-0 z-50 bg-[color:color-mix(in_oklch,var(--c-bg)_82%,transparent)] backdrop-blur overflow-x-clip">
      <div class="h-[var(--header-height)] px-5">
        <div class="mx-auto max-w-[1200px] h-full flex items-center justify-between gap-3">
          <a class="inline-flex items-center gap-2 font-black shrink-0" routerLink="/">
            <span class="w-9 h-9 grid place-items-center rounded-xl bg-white/5" aria-hidden="true">⚙️</span>
            <span class="whitespace-nowrap">Инженер360</span>
          </a>

          <nav class="hidden md:flex items-center gap-4" aria-label="Основная навигация">
            <a class="font-bold text-white/80 hover:text-white" routerLink="/courses" routerLinkActive="!text-white">
              {{ 'nav.program' | transloco }}
            </a>
            <a class="font-bold text-white/80 hover:text-white" routerLink="/faq" routerLinkActive="!text-white">
              {{ 'nav.faq' | transloco }}
            </a>
            <a class="font-bold text-white/80 hover:text-white" routerLink="/about" routerLinkActive="!text-white">
              {{ 'nav.about' | transloco }}
            </a>
          </nav>

          <!-- Desktop actions -->
          <div class="hidden md:flex items-center gap-2 shrink-0">
            <button mat-button type="button" (click)="i18n.toggle()">{{ i18n.active.toUpperCase() }}</button>
            <a mat-button routerLink="/auth/login">{{ 'nav.login' | transloco }}</a>
            <a mat-raised-button class="!rounded-xl !font-black" routerLink="/auth/register">
              {{ 'nav.register' | transloco }}
            </a>
          </div>

          <!-- Mobile actions -->
          <div class="flex md:hidden items-center gap-1 shrink-0">
            <button mat-icon-button type="button" (click)="i18n.toggle()" aria-label="Toggle language">
              <span class="font-black text-sm">{{ i18n.active.toUpperCase() }}</span>
            </button>
            <button mat-icon-button type="button" (click)="openMobileMenu()" aria-label="Open menu">
              <mat-icon>menu</mat-icon>
            </button>
          </div>
        </div>
      </div>
    </header>
  `,
})
export class HeaderComponent {
  protected readonly i18n = inject(I18nService);
  private readonly overlay = inject(Overlay);

  openMobileMenu(): void {
    const overlayRef = this.overlay.create({
      hasBackdrop: false, // we render our own backdrop inside component
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy: this.overlay.position().global().top('0').left('0'),
      width: '100vw',
      height: '100vh',
      panelClass: 'forge-mobile-menu-overlay-panel',
    });

    const portal = new ComponentPortal(MobileMenuOverlayComponent);
    const cmpRef = overlayRef.attach(portal);

    const sub = cmpRef.instance.close.subscribe(() => {
      sub.unsubscribe();
      overlayRef.dispose();
    });
  }
}
