import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  NgZone,
  computed,
  inject,
  signal,
} from '@angular/core';

type EngineerStage = {
  id: string;
  title: string;
  description: string;
  progressFrom: number;
  progressTo: number;
};

@Component({
  selector: 'forge-engineer-path',
  standalone: true,
  template: `
    <section class="engineer-path">
      <div class="sticky">
        <div class="sticky__grid">
          <div class="robot" aria-hidden="true">
            <div class="robot__frame">
              <div class="robot__piece" [class.is-on]="progress() >= 0.05">Схема</div>
              <div class="robot__piece" [class.is-on]="progress() >= 0.25">LED</div>
              <div class="robot__piece" [class.is-on]="progress() >= 0.45">Компоненты</div>
              <div class="robot__piece" [class.is-on]="progress() >= 0.65">PCB</div>
              <div class="robot__piece" [class.is-on]="progress() >= 0.80">Код</div>
              <div class="robot__piece" [class.is-on]="progress() >= 0.95">Робот</div>
            </div>
            <div class="robot__meter">
              <div class="robot__meter-bar" [style.width.%]="progress() * 100"></div>
            </div>
          </div>

          <div class="steps">
            <h2>Путь инженера</h2>
            <p class="sub">Скролль вниз — и робот будет собираться по мере прогресса.</p>

            <ol class="step-list">
              @for (stage of stages; track stage.id) {
                <li class="step" [class.is-active]="activeStageId() === stage.id">
                  <div class="step__title">{{ stage.title }}</div>
                  <div class="step__desc">{{ stage.description }}</div>
                </li>
              }
            </ol>
          </div>
        </div>
      </div>

      <div class="scroll-spacer" aria-hidden="true"></div>
    </section>
  `,
  styles: [
    `
      .engineer-path {
        padding: 0 20px;
      }

      .sticky {
        position: sticky;
        top: var(--header-height);
        height: calc(100dvh - var(--header-height));
        display: flex;
        align-items: center;
      }

      .sticky__grid {
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        display: grid;
        gap: 28px;
      }

      .robot {
        border-radius: 20px;
        border: 1px solid color-mix(in oklch, var(--c-border) 70%, transparent);
        background: radial-gradient(circle at 30% 10%, color-mix(in oklch, var(--c-accent) 35%, transparent), transparent 50%),
          radial-gradient(circle at 75% 30%, color-mix(in oklch, var(--c-accent-2) 35%, transparent), transparent 55%),
          color-mix(in oklch, var(--c-card) 85%, transparent);
        padding: 18px;
      }

      .robot__frame {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 10px;
      }

      .robot__piece {
        padding: 14px 12px;
        border-radius: 14px;
        border: 1px solid color-mix(in oklch, var(--c-border) 70%, transparent);
        background: color-mix(in oklch, var(--c-bg) 82%, transparent);
        opacity: 0.45;
        transform: translateY(6px);
        transition: opacity 180ms ease, transform 180ms ease;
        font-weight: 800;
      }

      .robot__piece.is-on {
        opacity: 1;
        transform: translateY(0);
        box-shadow: 0 10px 30px color-mix(in oklch, var(--c-accent) 14%, transparent);
      }

      .robot__meter {
        margin-top: 14px;
        height: 10px;
        border-radius: 999px;
        background: color-mix(in oklch, var(--c-border) 60%, transparent);
        overflow: hidden;
      }

      .robot__meter-bar {
        height: 100%;
        background: linear-gradient(90deg, var(--c-accent) 0%, var(--c-accent-2) 100%);
      }

      .steps h2 {
        font-size: clamp(24px, 3vw, 38px);
        margin: 0;
      }

      .sub {
        opacity: 0.85;
        margin-top: 8px;
      }

      .step-list {
        margin: 22px 0 0;
        padding: 0;
        list-style: none;
        display: grid;
        gap: 10px;
      }

      .step {
        padding: 14px 14px;
        border-radius: 16px;
        border: 1px solid color-mix(in oklch, var(--c-border) 70%, transparent);
        background: color-mix(in oklch, var(--c-card) 85%, transparent);
        opacity: 0.65;
        transition: opacity 200ms ease, transform 200ms ease;
      }

      .step.is-active {
        opacity: 1;
        transform: translateX(2px);
      }

      .step__title {
        font-weight: 900;
      }

      .step__desc {
        margin-top: 6px;
        opacity: 0.85;
      }

      .scroll-spacer {
        height: 240vh;
      }

      @media (min-width: 900px) {
        .sticky__grid {
          grid-template-columns: 0.9fr 1.1fr;
          align-items: center;
        }
      }
    `,
  ],
})
export class EngineerPathComponent implements AfterViewInit {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly zone = inject(NgZone);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly progress = signal(0);

  protected readonly stages: EngineerStage[] = [
    {
      id: 'scheme-led',
      title: 'Схема → светодиод',
      description: 'Первые цепи: питание, резистор, LED. Учимся думать как инженер.',
      progressFrom: 0.0,
      progressTo: 0.2,
    },
    {
      id: '3d-components',
      title: '3D → компоненты',
      description: 'Разбираемся в деталях: датчики, моторы, сервоприводы и механика.',
      progressFrom: 0.2,
      progressTo: 0.45,
    },
    {
      id: 'pcb',
      title: 'Плата → PCB',
      description: 'Собираем свою плату: дорожки, пайка, проверка и безопасность.',
      progressFrom: 0.45,
      progressTo: 0.68,
    },
    {
      id: 'arduino',
      title: 'Код → Arduino-логика',
      description: 'Пишем логику: условия, циклы, управление устройствами.',
      progressFrom: 0.68,
      progressTo: 0.86,
    },
    {
      id: 'robot',
      title: 'Робот → финальная сборка',
      description: 'Собираем робота целиком и оживляем его. Празднуем результат.',
      progressFrom: 0.86,
      progressTo: 1.0,
    },
  ];

  protected readonly activeStageId = computed(() => {
    const p = this.progress();
    const stage = this.stages.find((s) => p >= s.progressFrom && p < s.progressTo) ?? this.stages.at(-1);
    return stage?.id ?? this.stages[0].id;
  });

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      const el = this.host.nativeElement;
      const onScroll = () => {
        const rect = el.getBoundingClientRect();
        const viewH = window.innerHeight;
        // section starts when its top reaches header area
        const start = viewH * 0.1;
        const total = viewH * 2.2; // tuned for spacer height
        const raw = (start - rect.top) / total;
        const clamped = Math.max(0, Math.min(1, raw));
        this.zone.run(() => this.progress.set(clamped));
      };

      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);

      this.destroyRef.onDestroy(() => {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
      });
    });
  }
}
