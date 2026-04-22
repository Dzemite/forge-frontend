import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Translation, TranslocoLoader, TranslocoService } from '@jsverse/transloco';

const SUPPORTED_LANGS = new Set(['ru', 'en']);

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  private readonly http = inject(HttpClient);
  private readonly transloco = inject(TranslocoService);

  getTranslation(lang: string, data?: { scope?: string }): any {
    // ✅ Case 1: scoped format `${scope}/${lang}`
    // Example: `landing/ru` or `auth/en`
    if (lang.includes('/')) {
      const [scope, realLang] = lang.split('/');
      return this.http.get<Translation>(`/i18n/${realLang}/${scope}.json`);
    }

    // ✅ Case 2: non-scoped language
    // Example: `ru` / `en` -> common.json
    if (SUPPORTED_LANGS.has(lang)) {
      return this.http.get<Translation>(`/i18n/${lang}/common.json`);
    }

    // ✅ Case 3: some builds call loader with `lang = scope` (e.g. "landing")
    // In this case we resolve the active language.
    const scope = lang;
    const activeLang = this.transloco.getActiveLang();
    const resolvedLang = SUPPORTED_LANGS.has(activeLang) ? activeLang : 'ru';
    return this.http.get<Translation>(`/i18n/${resolvedLang}/${scope}.json`);
  }
}
