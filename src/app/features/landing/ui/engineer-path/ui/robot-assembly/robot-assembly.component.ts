import { Component, Input } from '@angular/core';

@Component({
  selector: 'forge-robot-assembly',
  standalone: true,
  template: `
    <div class="relative aspect-[4/3] w-full">
      <svg
        class="absolute inset-0 h-full w-full"
        viewBox="0 0 400 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="gBody" x1="120" y1="70" x2="280" y2="240" gradientUnits="userSpaceOnUse">
            <stop stop-color="var(--c-accent)" stop-opacity="0.28" />
            <stop offset="1" stop-color="var(--c-accent-2)" stop-opacity="0.22" />
          </linearGradient>

          <radialGradient id="gGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(200 150) rotate(90) scale(160 190)">
            <stop stop-color="var(--c-accent)" stop-opacity="0.20" />
            <stop offset="1" stop-color="transparent" />
          </radialGradient>

          <filter id="blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="10" />
          </filter>
        </defs>

        <!-- Glow layer -->
        <g class="part part--glow">
          <ellipse cx="200" cy="150" rx="160" ry="120" fill="url(#gGlow)" filter="url(#blur)" />
        </g>

        <!-- Shadow -->
        <g class="part part--shadow">
          <ellipse cx="200" cy="260" rx="90" ry="18" fill="rgba(0,0,0,0.35)" />
        </g>

        <!-- Antenna -->
        <g class="part part--antenna">
          <path d="M200 42 L200 72" stroke="rgba(255,255,255,0.65)" stroke-width="6" stroke-linecap="round" />
          <circle cx="200" cy="36" r="10" fill="var(--c-accent-2)" fill-opacity="0.9" />
          <circle cx="200" cy="36" r="18" fill="var(--c-accent-2)" fill-opacity="0.15" />
        </g>

        <!-- Head -->
        <g class="part part--head">
          <rect x="135" y="60" width="130" height="92" rx="28" fill="rgba(255,255,255,0.08)" />
          <rect x="142" y="68" width="116" height="78" rx="24" fill="rgba(0,0,0,0.18)" />

          <!-- Eyes -->
          <g class="part part--eyes">
            <circle cx="178" cy="106" r="12" fill="rgba(255,255,255,0.90)" />
            <circle cx="222" cy="106" r="12" fill="rgba(255,255,255,0.90)" />
            <circle cx="181" cy="106" r="6" fill="rgba(0,0,0,0.55)" />
            <circle cx="225" cy="106" r="6" fill="rgba(0,0,0,0.55)" />
            <path d="M188 128 Q200 138 212 128" stroke="rgba(255,255,255,0.55)" stroke-width="6" stroke-linecap="round" />
          </g>
        </g>

        <!-- Body -->
        <g class="part part--body">
          <rect x="120" y="140" width="160" height="108" rx="34" fill="rgba(255,255,255,0.06)" />
          <rect x="120" y="140" width="160" height="108" rx="34" fill="url(#gBody)" />

          <!-- chest panel -->
          <rect x="160" y="168" width="80" height="56" rx="16" fill="rgba(0,0,0,0.18)" />
          <circle cx="175" cy="196" r="8" fill="var(--c-accent)" fill-opacity="0.9" />
          <circle cx="200" cy="196" r="8" fill="rgba(255,255,255,0.75)" />
          <circle cx="225" cy="196" r="8" fill="var(--c-accent-2)" fill-opacity="0.9" />
        </g>

        <!-- Arms -->
        <g class="part part--arms">
          <path d="M120 168 C92 176 88 202 104 220" stroke="rgba(255,255,255,0.35)" stroke-width="18" stroke-linecap="round" />
          <path d="M280 168 C308 176 312 202 296 220" stroke="rgba(255,255,255,0.35)" stroke-width="18" stroke-linecap="round" />
          <circle cx="104" cy="222" r="14" fill="rgba(255,255,255,0.12)" />
          <circle cx="296" cy="222" r="14" fill="rgba(255,255,255,0.12)" />
        </g>

        <!-- Legs -->
        <g class="part part--legs">
          <path d="M165 248 L165 266" stroke="rgba(255,255,255,0.35)" stroke-width="18" stroke-linecap="round" />
          <path d="M235 248 L235 266" stroke="rgba(255,255,255,0.35)" stroke-width="18" stroke-linecap="round" />
          <rect x="142" y="264" width="50" height="18" rx="9" fill="rgba(255,255,255,0.10)" />
          <rect x="210" y="264" width="50" height="18" rx="9" fill="rgba(255,255,255,0.10)" />
        </g>
      </svg>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      /* Base animation: parts fly in + fade + tiny rotate, driven by --story-progress */
      .part {
        transform-box: fill-box;
        transform-origin: center;
        transition: transform 80ms linear, opacity 80ms linear;
        will-change: transform, opacity;
      }

      /* each part has its own "arrival" */
      .part--shadow {
        opacity: calc(0.3 + var(--story-progress) * 0.7);
        transform: scale(calc(0.9 + var(--story-progress) * 0.1));
      }

      .part--glow {
        opacity: calc(0.15 + var(--story-progress) * 0.55);
        transform: scale(calc(0.95 + var(--story-progress) * 0.08));
      }

      .part--body {
        opacity: clamp(0, calc((var(--story-progress) - 0.25) * 2), 1);
        transform: translateY(calc((1 - var(--story-progress)) * 26px)) rotate(calc((1 - var(--story-progress)) * -2deg));
      }

      .part--head {
        opacity: clamp(0, calc((var(--story-progress) - 0.40) * 2), 1);
        transform: translateY(calc((1 - var(--story-progress)) * 34px)) rotate(calc((1 - var(--story-progress)) * 2deg));
      }

      .part--eyes {
        opacity: clamp(0, calc((var(--story-progress) - 0.55) * 3), 1);
        transform: translateY(calc((1 - var(--story-progress)) * 10px));
      }

      /* Cute blink once robot is fully assembled */
      .part--eyes {
        animation: blink 5s infinite;
        animation-delay: calc(2s + (1 - var(--story-progress)) * 2s);
      }

      @keyframes blink {
        0%,
        92%,
        100% {
          transform: translateY(calc((1 - var(--story-progress)) * 10px)) scaleY(1);
        }
        95% {
          transform: translateY(calc((1 - var(--story-progress)) * 10px)) scaleY(0.1);
        }
      }

      .part--arms {
        opacity: clamp(0, calc((var(--story-progress) - 0.62) * 3), 1);
        transform: translateX(calc((1 - var(--story-progress)) * 10px));
      }

      .part--legs {
        opacity: clamp(0, calc((var(--story-progress) - 0.72) * 3), 1);
        transform: translateY(calc((1 - var(--story-progress)) * 14px));
      }

      .part--antenna {
        opacity: clamp(0, calc((var(--story-progress) - 0.82) * 4), 1);
        transform: translateY(calc((1 - var(--story-progress)) * 16px)) rotate(calc((1 - var(--story-progress)) * -3deg));
      }

      @media (prefers-reduced-motion: reduce) {
        .part {
          transition: none;
          transform: none !important;
          opacity: 1 !important;
          animation: none !important;
        }
      }
    `,
  ],
})
export class RobotAssemblyComponent {
  // Reserved for future: allow different robot skins.
  @Input() skin: 'default' = 'default';
}
