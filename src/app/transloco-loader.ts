import { inject, Injectable } from '@angular/core';
import { Translation, TranslocoLoader } from '@jsverse/transloco';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  private http = inject(HttpClient);

  getTranslation(lang: string, data?: { scope: string }) {
    const scope = data?.scope;

    // Default (no scope) => common.json
    if (!scope) {
      return this.http.get<Translation>(`/i18n/${lang}/common.json`);
    }

    // Scoped translations => /i18n/{lang}/{scope}.json
    return this.http.get<Translation>(`/i18n/${lang}/${scope}.json`);
  }
}
