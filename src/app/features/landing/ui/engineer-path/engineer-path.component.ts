import { Component, computed, signal } from '@angular/core';
import {
  ScrollStoryComponent,
  type ScrollStoryStage,
} from '../../../../shared/ui/scroll-story/scroll-story.component';

@Component({
  selector: 'forge-engineer-path',
  standalone: true,
  imports: [ScrollStoryComponent],
  template: `
    <forge-scroll-story [stages]="stages">
      <div storyBackground>
        <div class="relative rounded-2xl border border-white/10 bg-white/5 p-5 overflow-hidden">
          <!-- Layer: ambient glow -->
          <div
            class="pointer-events-none absolute -inset-10 blur-3xl opacity-60"
            style="
              background:
                radial-gradient(circle at 30% 20%, color-mix(in oklch, var(--c-accent) 55%, transparent), transparent 60%),
                radial-gradient(circle at 75% 35%, color-mix(in oklch, var(--c-accent-2) 45%, transparent), transparent 65%);
              transform: translateY(calc((1 - var(--story-progress)) * 24px));
              transition: transform 80ms linear;
            "
          ></div>

          <!-- Layer: robot assembly grid -->
          <div
            class="relative grid grid-cols-3 gap-2"
            style="transform: translateY(calc((1 - var(--story-progress)) * 8px)); transition: transform 80ms linear;"
          >
            <div class="piece" [class.on]="progress() >= 0.05">Схема</div>
            <div class="piece" [class.on]="progress() >= 0.25">LED</div>
            <div class="piece" [class.on]="progress() >= 0.45">Компоненты</div>
            <div class="piece" [class.on]="progress() >= 0.65">PCB</div>
            <div class="piece" [class.on]="progress() >= 0.8">Код</div>
            <div class="piece" [class.on]="progress() >= 0.95">Робот</div>
          </div>

          <!-- Layer: progress bar -->
          <div class="relative mt-4 h-2 rounded-full bg-white/10 overflow-hidden">
            <div
              class="h-full bg-gradient-to-r from-[color:var(--c-accent)] to-[color:var(--c-accent-2)]"
              [style.width.%]="progress() * 100"
            ></div>
          </div>

          <!-- Layer: highlight sweep -->
          <div
            class="pointer-events-none absolute inset-0 opacity-40"
            style="
              background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.10) 50%, transparent 100%);
              transform: translateX(calc((var(--story-progress) - 0.5) * 120%));
              transition: transform 80ms linear;
              mix-blend-mode: overlay;
            "
          ></div>
        </div>
      </div>

      <div storyForeground>
        <h2 class="text-3xl font-black">Путь инженера</h2>
        <p class="mt-2 text-white/80">Скролль вниз — и робот будет собираться по мере прогресса.</p>

        <ol class="mt-5 grid gap-2">
          @for (stage of stages; track stage.id) {
            <li
              class="rounded-2xl border border-white/10 bg-white/5 p-4 transition"
              [class.opacity-100]="activeStageId() === stage.id"
              [class.opacity-65]="activeStageId() !== stage.id"
            >
              <div class="font-black">{{ stage.title }}</div>
              <div class="mt-1 text-white/80">{{ stage.description }}</div>
            </li>
          }
        </ol>
      </div>
    </forge-scroll-story>
  `,
  styles: [
    `
      .piece {
        padding: 14px 12px;
        border-radius: 14px;
        border: 1px solid color-mix(in oklch, var(--c-border) 70%, transparent);
        background: color-mix(in oklch, var(--c-bg) 82%, transparent);
        opacity: 0.45;
        transform: translateY(10px) scale(0.98);
        transition: opacity 180ms ease, transform 180ms ease, box-shadow 180ms ease;
        font-weight: 800;
        will-change: transform;
      }

      .piece.on {
        opacity: 1;
        transform: translateY(0) scale(1);
        box-shadow:
          0 10px 30px color-mix(in oklch, var(--c-accent) 14%, transparent),
          0 0 0 1px color-mix(in oklch, var(--c-accent) 18%, transparent);
      }
    `,
  ],
})
export class EngineerPathComponent {
  // ScrollStory owns scroll handling; we just subscribe.
  protected readonly progress = signal(0);

  protected readonly stages: ScrollStoryStage[] = [
    {
      id: 'scheme-led',
      title: 'Схема → светодиод',
      description: 'Первые цепи: питание, резистор, LED. Учимся думать как инженер.',
      from: 0.0,
      to: 0.2,
    },
    {
      id: '3d-components',
      title: '3D → компоненты',
      description: 'Датчики, моторы, сервоприводы и механика.',
      from: 0.2,
      to: 0.45,
    },
    {
      id: 'pcb',
      title: 'Плата → PCB',
      description: 'Дорожки, пайка, проверка и безопасность.',
      from: 0.45,
      to: 0.68,
    },
    {
      id: 'arduino',
      title: 'Код → Arduino-логика',
      description: 'Условия, циклы, управление устройствами.',
      from: 0.68,
      to: 0.86,
    },
    {
      id: 'robot',
      title: 'Робот → финальная сборка',
      description: 'Собираем робота и оживляем его. Празднуем результат.',
      from: 0.86,
      to: 1.0,
    },
  ];

  protected readonly activeStageId = computed(() => {
    const p = this.progress();
    const stage = this.stages.find((s) => p >= s.from && p < s.to) ?? this.stages.at(-1);
    return stage?.id ?? this.stages[0].id;
  });
}
