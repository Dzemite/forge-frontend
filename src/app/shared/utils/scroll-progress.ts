export type ScrollProgressOptions = {
  /** Sticky top offset (e.g. header height). */
  topOffsetPx: number;
  /** How much scroll distance maps to full progress (0..1). */
  distancePx: number;
  /** Optional easing */
  ease?: (t: number) => number;
  /** Optional smoothing factor (0..1). Higher = smoother. */
  smoothing?: number;
};

export function clamp01(v: number): number {
  return Math.max(0, Math.min(1, v));
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function computeScrollProgress(sectionRect: DOMRect, viewportHeight: number, opts: ScrollProgressOptions): number {
  // When section's top reaches sticky top area, progress starts.
  const startY = opts.topOffsetPx;
  const raw = (startY - sectionRect.top) / Math.max(1, opts.distancePx);
  const t = clamp01(raw);
  return opts.ease ? opts.ease(t) : t;
}

export const easeInOutCubic = (t: number): number =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
