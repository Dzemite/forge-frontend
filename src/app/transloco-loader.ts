import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Translation, TranslocoLoader } from '@jsverse/transloco';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  private readonly http = inject(HttpClient);

  getTranslation(lang: string, data?: { scope?: string }): any {
    // Transloco represents scoped translations as: `${scope}/${lang}`
    // e.g. `landing/ru` or `auth/en`.
    if (lang.includes('/')) {
      const [scope, realLang] = lang.split('/');
      return this.http.get<Translation>(`/i18n/${realLang}/${scope}.json`);
    }

    // Non-scoped translations => common.json
    return this.http.get<Translation>(`/i18n/${lang}/common.json`);
  }
}
