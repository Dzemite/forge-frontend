import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Translation, TranslocoLoader } from '@jsverse/transloco';

const SUPPORTED_LANGS = new Set(['ru', 'en']);
const STORAGE_KEY = 'forge_lang';

function getPersistedLang(): 'ru' | 'en' {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === 'en' ? 'en' : 'ru';
  } catch {
    return 'ru';
  }
}

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  private readonly http = inject(HttpClient);

  getTranslation(lang: string, data?: { scope?: string }): any {
    // Case 1: scoped format `${scope}/${lang}`
    // Example: `landing/ru` or `auth/en`
    if (lang.includes('/')) {
      const [scope, realLang] = lang.split('/');
      return this.http.get<Translation>(`/i18n/${realLang}/${scope}.json`);
    }

    // Case 2: non-scoped language
    // Example: `ru` / `en` -> common.json
    if (SUPPORTED_LANGS.has(lang)) {
      return this.http.get<Translation>(`/i18n/${lang}/common.json`);
    }

    // Case 3: some flows call loader with `lang = scope` (e.g. "landing")
    // Avoid injecting TranslocoService here (creates circular dep). Use persisted lang.
    const scope = lang;
    const resolvedLang = getPersistedLang();
    return this.http.get<Translation>(`/i18n/${resolvedLang}/${scope}.json`);
  }
}
