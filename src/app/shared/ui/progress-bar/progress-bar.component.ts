import { Component, Input } from '@angular/core';

@Component({
  selector: 'forge-progress-bar',
  standalone: true,
  template: `
    <div class="h-2 rounded-full bg-white/10 overflow-hidden" role="progressbar" [attr.aria-valuenow]="value">
      <div
        class="h-full bg-gradient-to-r from-[color:var(--c-accent)] to-[color:var(--c-accent-2)]"
        [style.width.%]="value"
      ></div>
    </div>
  `,
})
export class ProgressBarComponent {
  @Input({ required: true }) value = 0;
}
