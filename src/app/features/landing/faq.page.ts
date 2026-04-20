import { Component, signal } from '@angular/core';

type FaqItem = {
  q: string;
  a: string;
};

@Component({
  selector: 'forge-faq-page',
  standalone: true,
  template: `
    <section class="page">
      <header class="page__header">
        <h1>FAQ для родителей</h1>
        <p>Коротко и по делу — чтобы решение было спокойным и уверенным.</p>
      </header>

      <div class="accordion">
        @for (item of items; track item.q; let idx = $index) {
          <button class="acc" type="button" (click)="toggle(idx)" [attr.aria-expanded]="openIndex() === idx">
            <span class="acc__q">{{ item.q }}</span>
            <span class="acc__icon" aria-hidden="true">{{ openIndex() === idx ? '−' : '+' }}</span>
          </button>
          @if (openIndex() === idx) {
            <div class="panel">{{ item.a }}</div>
          }
        }
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

      .accordion {
        display: grid;
        gap: 10px;
        margin-top: 18px;
      }

      .acc {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        padding: 14px 16px;
        border-radius: 16px;
        border: 1px solid color-mix(in oklch, var(--c-border) 70%, transparent);
        background: color-mix(in oklch, var(--c-card) 88%, transparent);
        cursor: pointer;
        text-align: left;
      }

      .acc__q {
        font-weight: 900;
      }

      .panel {
        padding: 0 16px 14px;
        opacity: 0.9;
      }

      .acc__icon {
        width: 32px;
        height: 32px;
        border-radius: 12px;
        display: grid;
        place-items: center;
        border: 1px solid color-mix(in oklch, var(--c-border) 70%, transparent);
        background: color-mix(in oklch, var(--c-bg) 82%, transparent);
      }
    `,
  ],
})
export class FaqPage {
  protected readonly openIndex = signal<number | null>(0);

  protected readonly items: FaqItem[] = [
    {
      q: 'Почему Инженер360, а не обычные кружки?',
      a: 'У нас путь инженера: от схем и света до кода и робота — один связный маршрут, который вовлекает ребёнка и даёт результат.',
    },
    {
      q: 'Нужно ли покупать оборудование?',
      a: 'Для старта — нет. Для практики с робототехникой мы организуем доставку наборов по РФ/КЗ/УЗ/ТЖ.',
    },
    {
      q: 'А если ребёнку не понравится?',
      a: 'Действует гарантия возврата 14 дней. Вы спокойно пробуете и принимаете решение.',
    },
    {
      q: 'Сколько времени нужно на обучение?',
      a: 'В среднем 2–3 занятия в неделю по 30–45 минут. Делаем упор на короткие, но регулярные шаги.',
    },
    {
      q: 'Будет ли сертификат?',
      a: 'Да — после завершения уровня/программы. Плюс ребёнок сохраняет проекты и прогресс.',
    },
  ];

  toggle(idx: number): void {
    this.openIndex.update((cur) => (cur === idx ? null : idx));
  }
}
