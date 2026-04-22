import { Injectable, inject } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

const STORAGE_KEY = 'forge_lang';

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly transloco = inject(TranslocoService);

  init(): void {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'ru' || stored === 'en') {
      this.transloco.setActiveLang(stored);
    }
  }

  get active(): 'ru' | 'en' {
    const lang = this.transloco.getActiveLang();
    return (lang === 'en' ? 'en' : 'ru') as 'ru' | 'en';
  }

  set(lang: 'ru' | 'en'): void {
    localStorage.setItem(STORAGE_KEY, lang);
    this.transloco.setActiveLang(lang);
  }

  toggle(): void {
    this.set(this.active === 'ru' ? 'en' : 'ru');
  }
}
