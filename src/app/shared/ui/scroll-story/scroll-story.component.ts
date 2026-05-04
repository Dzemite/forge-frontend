import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  Input,
  NgZone,
  computed,
  inject,
  signal,
} from '@angular/core';
import { computeScrollProgress, easeInOutCubic, lerp } from '../../utils/scroll-progress';

export type ScrollStoryStage = {
  id: string;
  title: string;
  description?: string;
  from: number;
  to: number;
};

@Component({
  selector: 'forge-scroll-story',
  standalone: true,
  template: `
    <section class="relative px-5">
      @if (isDesktop()) {
        <div
          class="sticky top-[var(--header-height)] h-[calc(100dvh-var(--header-height))] flex items-center pt-10"
        >
          <div class="mx-auto w-full max-w-[1200px] flex gap-6 items-center">
            <div class="relative w-[55%]">
              <ng-content select="[storyForeground]" />
            </div>

            <div class="relative w-[45%]">
              <ng-content select="[storyBackground]" />
            </div>
          </div>
        </div>

        <div class="h-[240vh]" aria-hidden="true"></div>
      } @else {
        <div class="mx-auto w-full max-w-[1200px] pt-10 pb-10 grid gap-6">
          <div class="relative">
            <ng-content select="[storyForeground]" />
          </div>
          <div class="relative">
            <ng-content select="[storyBackground]" />
          </div>
        </div>
      }
    </section>
  `,
})
export class ScrollStoryComponent implements AfterViewInit {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly zone = inject(NgZone);
  private readonly destroyRef = inject(DestroyRef);

  @Input({ required: false }) stages: ScrollStoryStage[] = [];

  /** Full progress 0..1 */
  readonly progress = signal(0);

  private smooth = 0;
  readonly isDesktop = signal(true);

  readonly activeStageId = computed(() => {
    if (!this.stages.length) return null;
    const p = this.progress();
    const stage = this.stages.find((s) => p >= s.from && p < s.to) ?? this.stages.at(-1);
    return stage?.id ?? null;
  });

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      const el = this.host.nativeElement;

      const mql = window.matchMedia('(min-width: 768px)');
      const updateLayout = () => {
        this.zone.run(() => this.isDesktop.set(mql.matches));
      };
      updateLayout();
      mql.addEventListener('change', updateLayout);

      const onScroll = () => {
        if (!mql.matches) {
          // Mobile: non-sticky story, keep robot assembled.
          this.zone.run(() => {
            this.progress.set(1);
            el.style.setProperty('--story-progress', '1');
          });
          return;
        }

        const rect = el.getBoundingClientRect();
        const target = computeScrollProgress(rect, window.innerHeight, {
          topOffsetPx:
            parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 64,
          distancePx: window.innerHeight * 3.2,
          ease: easeInOutCubic,
        });

        this.smooth = lerp(this.smooth, target, 0.12);

        this.zone.run(() => {
          this.progress.set(this.smooth);
          el.style.setProperty('--story-progress', String(this.smooth));
        });
      };

      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);

      this.destroyRef.onDestroy(() => {
        mql.removeEventListener('change', updateLayout);
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
      });
    });
  }
}
