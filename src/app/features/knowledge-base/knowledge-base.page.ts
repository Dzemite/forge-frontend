import { Component } from '@angular/core';

@Component({
  selector: 'forge-knowledge-base-page',
  standalone: true,
  template: `
    <section class="page">
      <header class="page__header">
        <h1>Справочник</h1>
        <p class="muted">
          Заглушка под будущий knowledge base (дерево тем, быстрый поиск, как в ITGEN reference).
        </p>
      </header>

      <div class="card">
        <div class="tree">
          <div class="node">Основы электроники</div>
          <div class="node">Arduino</div>
          <div class="node">Датчики и моторы</div>
          <div class="node">Сборка робота</div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .page {
        max-width: 900px;
        margin: 0 auto;
        padding: 48px 20px 80px;
      }

      .muted {
        opacity: 0.85;
      }

      .card {
        border-radius: 18px;
        border: 1px solid color-mix(in oklch, var(--c-border) 70%, transparent);
        background: color-mix(in oklch, var(--c-card) 88%, transparent);
        padding: 18px 16px;
        margin-top: 16px;
      }

      .tree {
        display: grid;
        gap: 10px;
      }

      .node {
        padding: 12px 12px;
        border-radius: 14px;
        border: 1px solid color-mix(in oklch, var(--c-border) 70%, transparent);
        background: color-mix(in oklch, var(--c-bg) 82%, transparent);
        font-weight: 800;
      }
    `,
  ],
})
export class KnowledgeBasePage {}
