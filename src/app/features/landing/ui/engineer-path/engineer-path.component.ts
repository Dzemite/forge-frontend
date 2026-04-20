import { Component, computed, signal } from '@angular/core';
import {
  ScrollStoryComponent,
  type ScrollStoryStage,
} from '../../../../shared/ui/scroll-story/scroll-story.component';
import { RobotAssemblyComponent } from './ui/robot-assembly/robot-assembly.component';

@Component({
  selector: 'forge-engineer-path',
  standalone: true,
  imports: [ScrollStoryComponent, RobotAssemblyComponent],
  template: `
    <forge-scroll-story [stages]="stages">
      <div storyBackground>
        <div class="forge-surface relative p-5 overflow-hidden">
          <forge-robot-assembly />

          <div class="relative mt-4 h-2 rounded-full bg-white/10 overflow-hidden">
            <div
              class="h-full bg-gradient-to-r from-[color:var(--c-accent)] to-[color:var(--c-accent-2)]"
              [style.width.%]="progress() * 100"
            ></div>
          </div>

          <!-- highlight sweep -->
          <div
            class="pointer-events-none absolute inset-0 opacity-35"
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
  styles: [],
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
