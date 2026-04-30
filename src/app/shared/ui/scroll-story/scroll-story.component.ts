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
      <!-- Mobile: non-sticky, clear stacking -->
      <div class="forge-scroll-story-mobile mx-auto w-full max-w-[1200px] pt-10 pb-10 grid gap-6">
        <div class="relative">
          <ng-content select="[storyForeground]" />
        </div>
        <div class="relative">
          <ng-content select="[storyBackground]" />
        </div>
      </div>

      <!-- Desktop+: sticky scroll story -->
      <div
        class="forge-scroll-story-desktop sticky top-[var(--header-height)] h-[calc(100dvh-var(--header-height))] items-center pt-10"
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

      <!-- Spacer makes scrolling drive the desktop story -->
      <div class="forge-scroll-story-spacer h-[240vh]" aria-hidden="true"></div>
    </section>
  `,
})
export class ScrollStoryComponent implements AfterViewInit {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly zone = inject(NgZone);
  private readonly destroyRef = inject(DestroyRef);

  /** Optional: provide stages so we can compute active stage. */
  @Input({ required: false }) stages: ScrollStoryStage[] = [];

  /** Full progress 0..1 */
  readonly progress = signal(0);

  // smoothing state
  private smooth = 0;

  // Also expose progress as CSS custom property for layered animations.
  // Consumers can use: style="transform: translateX(calc(var(--story-progress) * 10px))" etc.

  readonly activeStageId = computed(() => {
    if (!this.stages.length) return null;
    const p = this.progress();
    const stage = this.stages.find((s) => p >= s.from && p < s.to) ?? this.stages.at(-1);
    return stage?.id ?? null;
  });

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      const el = this.host.nativeElement;

      const onScroll = () => {
        // On mobile we render non-sticky layout; keep progress static.
        if (window.matchMedia('(max-width: 767px)').matches) {
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
          // Give more scroll distance so stages don't flip too fast.
          distancePx: window.innerHeight * 3.2,
          ease: easeInOutCubic,
        });

        // Smooth progress to avoid jitter + too-fast stage flipping.
        this.smooth = lerp(this.smooth, target, 0.12);

        this.zone.run(() => {
          this.progress.set(this.smooth);
          // CSS var for animation layers
          el.style.setProperty('--story-progress', String(this.smooth));
        });
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
