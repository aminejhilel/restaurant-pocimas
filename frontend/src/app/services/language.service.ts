import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Title, Meta } from '@angular/platform-browser';

export type SupportedLanguage = 'es' | 'en' | 'fr' | 'ar';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly LANG_KEY = 'app_language';
  public currentLang: SupportedLanguage = 'es';

  constructor(
    private translate: TranslateService,
    private titleService: Title,
    private metaService: Meta
  ) {}

  public initLanguage(): void {
    // Determine the saved language or default to Spanish
    const savedLang = localStorage.getItem(this.LANG_KEY) as SupportedLanguage;
    const initialLang = savedLang || 'es';
    
    // Set the default language fallback for ngx-translate
    this.translate.setDefaultLang('es');
    
    // Use the selected language
    this.setLanguage(initialLang);

    // Subscribe to translation changes to update SEO elements dynamically
    this.translate.onLangChange.subscribe(() => {
      this.updateSeoTags();
    });
  }

  public setLanguage(lang: SupportedLanguage): void {
    this.currentLang = lang;
    localStorage.setItem(this.LANG_KEY, lang);
    this.translate.use(lang);
    
    // Update HTML attributes
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }

  public getCurrentLanguage(): SupportedLanguage {
    return this.currentLang;
  }

  private updateSeoTags(): void {
    this.translate.get('SEO.TITLE').subscribe((res: string) => {
      if (res && res !== 'SEO.TITLE') {
        this.titleService.setTitle(res);
      }
    });

    this.translate.get('SEO.DESCRIPTION').subscribe((res: string) => {
      if (res && res !== 'SEO.DESCRIPTION') {
        this.metaService.updateTag({ name: 'description', content: res });
      }
    });
  }
}
