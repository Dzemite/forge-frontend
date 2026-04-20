import { Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';

type FaqItem = {
  q: string;
  a: string;
};

@Component({
  selector: 'forge-faq-page',
  standalone: true,
  imports: [MatExpansionModule],
  template: `
    <section class="mx-auto max-w-[900px] px-5 py-12">
      <header>
        <h1 class="text-3xl font-black">FAQ для родителей</h1>
        <p class="mt-2 text-white/80">Коротко и по делу — чтобы решение было спокойным и уверенным.</p>
      </header>

      <mat-accordion class="mt-5 grid gap-2" multi>
        @for (item of items; track item.q) {
          <mat-expansion-panel class="!rounded-2xl !border !border-white/10 !bg-white/5">
            <mat-expansion-panel-header>
              <mat-panel-title class="!font-black">{{ item.q }}</mat-panel-title>
            </mat-expansion-panel-header>
            <div class="text-white/85 pb-4">{{ item.a }}</div>
          </mat-expansion-panel>
        }
      </mat-accordion>
    </section>
  `,
})
export class FaqPage {
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
}
