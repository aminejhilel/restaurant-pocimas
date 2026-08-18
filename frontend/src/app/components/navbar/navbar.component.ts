import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService, SupportedLanguage } from '../../services/language.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, TranslateModule],
  template: `
    <nav [class]="'fixed top-0 left-0 right-0 z-50 transition-all duration-700 ' + (scrolled ? 'scrolled-nav py-2' : 'bg-transparent py-6')">

      <!-- Premium top accent line -->
      <div class="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-500" [style.opacity]="scrolled ? '1' : '0'"
           style="background: linear-gradient(90deg, transparent 0%, rgba(131,87,9,0.6) 20%, #D4AF37 50%, rgba(131,87,9,0.6) 80%, transparent 100%);"></div>

      <!-- Bottom border on scroll -->
      <div class="absolute bottom-0 left-0 h-[1px] w-full transition-opacity duration-500" [style.opacity]="scrolled ? '1' : '0'"
           style="background: linear-gradient(90deg, transparent, rgba(212,175,55,0.15), transparent);"></div>

      <div class="max-w-7xl mx-auto px-6 flex items-center justify-between">

        <!-- Logo -->
        <a routerLink="/" class="flex items-center gap-3 group relative">
          <div class="relative">
            <span class="font-heading text-2xl tracking-[0.2em] uppercase transition-all duration-500 group-hover:tracking-[0.3em]"
                  style="background: linear-gradient(90deg, #c8a42e, #f0d980, #D4AF37); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;">
              Pócimas
            </span>
            <div class="absolute -bottom-1 left-0 w-0 group-hover:w-full h-px transition-all duration-500"
                 style="background: linear-gradient(90deg, #D4AF37, transparent);"></div>
          </div>
          <div class="hidden sm:block h-4 w-px" style="background: rgba(212,175,55,0.3);"></div>
          <span class="hidden sm:block font-display text-[9px] uppercase tracking-[0.35em] text-bronze-400/70">Est. 1987</span>
        </a>

        <!-- Desktop Nav -->
        <div class="hidden lg:flex items-center gap-10">
          <a routerLink="/" routerLinkActive="nav-active" [routerLinkActiveOptions]="{exact:true}" class="nav-link">
            {{ 'NAV.HOME' | translate }}
          </a>
          <a routerLink="/our-story" routerLinkActive="nav-active" class="nav-link">
            {{ 'NAV.OUR_STORY' | translate }}
          </a>
          <a routerLink="/menu" routerLinkActive="nav-active" class="nav-link">
            {{ 'NAV.MENU' | translate }}
          </a>
          <a routerLink="/contact" routerLinkActive="nav-active" class="nav-link">
            {{ 'NAV.CONTACT' | translate }}
          </a>
        </div>

        <!-- Auth + CTA + Lang -->
        <div class="hidden lg:flex items-center gap-5">

          <!-- Language Switcher -->
          <div class="relative lang-switcher">
            <select (change)="changeLanguage($event)"
                    class="appearance-none bg-transparent text-bronze-400/80 font-display text-[10px] uppercase tracking-[0.2em] border-none outline-none cursor-pointer focus:ring-0 pr-4">
              <option value="es" class="bg-dark-900 text-cream-100" [selected]="currentLang === 'es'">ES</option>
              <option value="fr" class="bg-dark-900 text-cream-100" [selected]="currentLang === 'fr'">FR</option>
              <option value="en" class="bg-dark-900 text-cream-100" [selected]="currentLang === 'en'">EN</option>
              <option value="ar" class="bg-dark-900 text-cream-100" [selected]="currentLang === 'ar'">عربي</option>
            </select>
            <div class="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-bronze-400/50 text-[8px]">▾</div>
          </div>

          <div class="w-px h-4" style="background: rgba(212,175,55,0.2);"></div>

          <ng-container *ngIf="!isLoggedIn">
            <a routerLink="/login" class="font-display text-[10px] uppercase tracking-[0.2em] text-cream-400 hover:text-bronze-400 transition-colors duration-300">
              {{ 'NAV.LOGIN' | translate }}
            </a>
          </ng-container>
          <ng-container *ngIf="isLoggedIn">
            <a routerLink="/my-reservations" class="font-display text-[10px] uppercase tracking-[0.2em] text-cream-400 hover:text-bronze-400 transition-colors duration-300">
              {{ 'NAV.MY_RESERVATIONS' | translate }}
            </a>
            <button (click)="logout()" class="font-display text-[10px] uppercase tracking-[0.2em] text-cream-400 hover:text-red-400 transition-colors duration-300">
              {{ 'NAV.LOGOUT' | translate }}
            </button>
          </ng-container>

          <a routerLink="/reservation" class="btn-primary text-[10px] px-6 py-2.5">
            {{ 'NAV.RESERVE' | translate }}
          </a>
        </div>

        <!-- Mobile Burger -->
        <button (click)="mobileOpen = !mobileOpen" class="lg:hidden relative w-9 h-9 flex flex-col items-center justify-center gap-1.5 group">
          <span class="w-7 h-px transition-all duration-300 origin-center"
                [class]="mobileOpen ? 'rotate-45 translate-y-[7px] bg-bronze-400' : 'bg-cream-200 group-hover:bg-bronze-400'"></span>
          <span class="w-5 h-px transition-all duration-300 self-start ml-1"
                [class]="mobileOpen ? 'opacity-0 -translate-x-4' : 'bg-cream-200 group-hover:bg-bronze-400'"></span>
          <span class="w-7 h-px transition-all duration-300 origin-center"
                [class]="mobileOpen ? '-rotate-45 -translate-y-[7px] bg-bronze-400' : 'bg-cream-200 group-hover:bg-bronze-400'"></span>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div *ngIf="mobileOpen"
           class="lg:hidden absolute top-full left-0 w-full border-t shadow-2xl animate-in"
           style="background: rgba(4,4,4,0.97); backdrop-filter: blur(24px); border-color: rgba(212,175,55,0.12);">
        <div class="px-8 py-10 flex flex-col gap-7">
          <a routerLink="/" (click)="mobileOpen=false" class="font-display text-sm uppercase tracking-[0.25em] text-cream-200 hover:text-bronze-400 transition-colors flex items-center gap-3">
            <span class="w-4 h-px" style="background: rgba(212,175,55,0.4);"></span>{{ 'NAV.HOME' | translate }}
          </a>
          <a routerLink="/our-story" (click)="mobileOpen=false" class="font-display text-sm uppercase tracking-[0.25em] text-cream-200 hover:text-bronze-400 transition-colors flex items-center gap-3">
            <span class="w-4 h-px" style="background: rgba(212,175,55,0.4);"></span>{{ 'NAV.OUR_STORY' | translate }}
          </a>
          <a routerLink="/menu" (click)="mobileOpen=false" class="font-display text-sm uppercase tracking-[0.25em] text-cream-200 hover:text-bronze-400 transition-colors flex items-center gap-3">
            <span class="w-4 h-px" style="background: rgba(212,175,55,0.4);"></span>{{ 'NAV.MENU' | translate }}
          </a>
          <a routerLink="/contact" (click)="mobileOpen=false" class="font-display text-sm uppercase tracking-[0.25em] text-cream-200 hover:text-bronze-400 transition-colors flex items-center gap-3">
            <span class="w-4 h-px" style="background: rgba(212,175,55,0.4);"></span>{{ 'NAV.CONTACT' | translate }}
          </a>
          <div class="h-px" style="background: linear-gradient(90deg, transparent, rgba(212,175,55,0.2), transparent);"></div>
          <ng-container *ngIf="!isLoggedIn">
            <a routerLink="/login" (click)="mobileOpen=false" class="font-display text-sm uppercase tracking-[0.25em] text-cream-400 hover:text-bronze-400 transition-colors">{{ 'NAV.LOGIN' | translate }}</a>
          </ng-container>
          <ng-container *ngIf="isLoggedIn">
            <a routerLink="/my-reservations" (click)="mobileOpen=false" class="font-display text-sm uppercase tracking-[0.25em] text-cream-400 hover:text-bronze-400 transition-colors">{{ 'NAV.MY_RESERVATIONS' | translate }}</a>
            <button (click)="logout(); mobileOpen=false" class="text-left font-display text-sm uppercase tracking-[0.25em] text-red-400 hover:text-red-300 transition-colors">{{ 'NAV.LOGOUT' | translate }}</button>
          </ng-container>
          <a routerLink="/reservation" (click)="mobileOpen=false" class="btn-primary text-center text-xs mt-2">{{ 'NAV.RESERVE' | translate }}</a>

          <!-- Language switcher mobile -->
          <div class="flex gap-4 mt-2">
            <button (click)="setLang('es')" [class]="'font-display text-xs uppercase tracking-widest transition-colors ' + (currentLang === 'es' ? 'text-bronze-400' : 'text-dark-500 hover:text-cream-400')">ES</button>
            <button (click)="setLang('fr')" [class]="'font-display text-xs uppercase tracking-widest transition-colors ' + (currentLang === 'fr' ? 'text-bronze-400' : 'text-dark-500 hover:text-cream-400')">FR</button>
            <button (click)="setLang('en')" [class]="'font-display text-xs uppercase tracking-widest transition-colors ' + (currentLang === 'en' ? 'text-bronze-400' : 'text-dark-500 hover:text-cream-400')">EN</button>
            <button (click)="setLang('ar')" [class]="'font-display text-xs uppercase tracking-widest transition-colors ' + (currentLang === 'ar' ? 'text-bronze-400' : 'text-dark-500 hover:text-cream-400')">عربي</button>
          </div>
        </div>
      </div>
    </nav>

    <style>
      .scrolled-nav {
        background: rgba(4,4,4,0.92);
        backdrop-filter: blur(20px) saturate(180%);
        box-shadow: 0 1px 0 rgba(212,175,55,0.08), 0 20px 60px rgba(0,0,0,0.8);
      }
      .nav-link {
        font-family: inherit;
        font-size: 10px;
        text-transform: uppercase;
        letter-spacing: 0.2em;
        color: rgba(225,215,200,0.7);
        transition: all 0.3s;
        padding: 4px 0;
        position: relative;
      }
      .nav-link::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 0;
        height: 1px;
        background: linear-gradient(90deg, #D4AF37, #f0d980);
        transition: width 0.4s cubic-bezier(0.16,1,0.3,1);
        box-shadow: 0 0 6px rgba(212,175,55,0.6);
      }
      .nav-link:hover, .nav-link.nav-active {
        color: #D4AF37;
      }
      .nav-link:hover::after, .nav-link.nav-active::after {
        width: 100%;
      }
      .lang-switcher select option { background: #0a0a0a; }
    </style>
  `,
})
export class NavbarComponent implements OnInit {
  scrolled = false;
  mobileOpen = false;
  isLoggedIn = false;
  imgError = false;
  currentLang: SupportedLanguage = 'es';

  constructor(private auth: AuthService, private languageService: LanguageService) {
    this.currentLang = this.languageService.getCurrentLanguage();
  }

  ngOnInit() {
    this.auth.currentUser$.subscribe(user => this.isLoggedIn = !!user || !!localStorage.getItem('token'));
  }

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled = window.scrollY > 30;
  }

  logout() {
    this.auth.logout();
  }

  onImgError(event: any) {
    this.imgError = true;
    event.target.style.display = 'none';
  }
  
  changeLanguage(event: any) {
    const lang = event.target.value as SupportedLanguage;
    this.languageService.setLanguage(lang);
    this.currentLang = lang;
  }

  setLang(lang: SupportedLanguage) {
    this.languageService.setLanguage(lang);
    this.currentLang = lang;
  }
}
