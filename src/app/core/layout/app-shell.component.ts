import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../shared/ui/header/header.component';

@Component({
  selector: 'forge-app-shell',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <forge-header />
    <main class="app-main">
      <router-outlet />
    </main>
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
