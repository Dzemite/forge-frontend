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
import { computeScrollProgress, easeInOutCubic } from '../../utils/scroll-progress';

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
      <div class="sticky top-[var(--header-height)] h-[calc(100dvh-var(--header-height))] flex items-center">
        <div class="mx-auto w-full max-w-[1200px] grid gap-6 lg:grid-cols-[0.9fr_1.1fr] items-center">
          <div class="relative">
            <ng-content select="[storyBackground]" />
          </div>

          <div class="relative">
            <ng-content select="[storyForeground]" />
          </div>
        </div>
      </div>

      <!-- Spacer makes scrolling drive the story -->
      <div class="h-[240vh]" aria-hidden="true"></div>
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
        const rect = el.getBoundingClientRect();
        const p = computeScrollProgress(rect, window.innerHeight, {
          topOffsetPx: parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 64,
          distancePx: window.innerHeight * 2.2,
          ease: easeInOutCubic,
        });

        this.zone.run(() => {
          this.progress.set(p);
          // CSS var for animation layers
          el.style.setProperty('--story-progress', String(p));
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
