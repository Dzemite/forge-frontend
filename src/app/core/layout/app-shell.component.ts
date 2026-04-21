import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../shared/ui/header/header.component';
import { FooterComponent } from '../../shared/ui/footer/footer.component';

@Component({
  selector: 'forge-app-shell',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <forge-header />
    <main class="app-main">
      <router-outlet />
    </main>
    <forge-footer />
  `,
  styles: [
    `
      .app-main {
        min-height: calc(100dvh - var(--header-height));
      }
    `,
  ],
})
export class AppShellComponent {}
