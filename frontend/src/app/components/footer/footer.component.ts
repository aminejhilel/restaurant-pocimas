import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule],
  template: `
    <footer style="background: linear-gradient(180deg, #030303 0%, #000 100%); border-top: 1px solid rgba(212,175,55,0.08);">
      <div style="height: 1px; background: linear-gradient(90deg, transparent, rgba(212,175,55,0.4) 30%, rgba(240,217,128,0.6) 50%, rgba(212,175,55,0.4) 70%, transparent); box-shadow: 0 0 20px rgba(212,175,55,0.15);"></div>

      <div class="relative overflow-hidden">
        <div class="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none" style="width:800px;height:300px;background:radial-gradient(ellipse,rgba(212,175,55,0.035) 0%,transparent 70%);"></div>
        <div class="max-w-7xl mx-auto px-6 pt-20 pb-10">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

            <!-- Brand -->
            <div class="lg:col-span-1">
              <div class="mb-6">
                <span class="font-heading text-3xl tracking-[0.25em] uppercase" style="background:linear-gradient(90deg,#c8a42e,#f0d980,#D4AF37);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;">Pócimas</span>
                <p class="font-display text-[9px] uppercase tracking-[0.4em] text-bronze-400/50 mt-1">Restaurante · Est. 1987</p>
              </div>
              <p class="font-accent text-sm leading-relaxed mb-6" style="color:rgba(180,165,140,0.5);">{{ 'FOOTER.DESC' | translate }}</p>
              <div class="flex gap-3 mt-6">
                <a href="#" class="social-icon"><svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>
                <a href="#" class="social-icon"><svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
              </div>
            </div>

            <!-- Navigation -->
            <div>
              <h4 class="font-heading text-base text-cream-100 mb-6 tracking-wide">{{ 'FOOTER.QUICK_LINKS' | translate }}</h4>
              <ul class="space-y-3">
                <li><a routerLink="/" class="footer-link">{{ 'NAV.HOME' | translate }}</a></li>
                <li><a routerLink="/our-story" class="footer-link">{{ 'NAV.OUR_STORY' | translate }}</a></li>
                <li><a routerLink="/menu" class="footer-link">{{ 'NAV.MENU' | translate }}</a></li>
                <li><a routerLink="/reservation" class="footer-link">{{ 'NAV.RESERVE' | translate }}</a></li>
                <li><a routerLink="/contact" class="footer-link">{{ 'NAV.CONTACT' | translate }}</a></li>
              </ul>
            </div>

            <!-- Opening Hours -->
            <div>
              <h4 class="font-heading text-base text-cream-100 mb-6 tracking-wide">{{ 'FOOTER.OPENING_HOURS' | translate }}</h4>
              <ul class="space-y-3">
                <li class="font-accent text-sm" style="color:rgba(180,165,140,0.5);">{{ 'FOOTER.WEEKDAYS' | translate }}</li>
                <li class="font-accent text-sm text-bronze-400">18:00 – 23:00</li>
                <li class="font-accent text-sm mt-4" style="color:rgba(180,165,140,0.5);">{{ 'FOOTER.WEEKENDS' | translate }}</li>
                <li class="font-accent text-sm text-bronze-400">17:00 – 23:30</li>
              </ul>
            </div>

            <!-- Contact -->
            <div>
              <h4 class="font-heading text-base text-cream-100 mb-6 tracking-wide">{{ 'FOOTER.CONTACT_INFO' | translate }}</h4>
              <ul class="space-y-4">
                <li class="flex items-start gap-3">
                  <div class="w-7 h-7 border flex items-center justify-center shrink-0 mt-0.5" style="border-color:rgba(212,175,55,0.2);">
                    <svg class="w-3 h-3 text-bronze-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/></svg>
                  </div>
                  <span class="font-accent text-sm" style="color:rgba(180,165,140,0.5);">123 Avenue des Champs-Élysées, 75008 Paris</span>
                </li>
                <li class="flex items-center gap-3">
                  <div class="w-7 h-7 border flex items-center justify-center shrink-0" style="border-color:rgba(212,175,55,0.2);">
                    <svg class="w-3 h-3 text-bronze-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                  </div>
                  <span class="font-accent text-sm" style="color:rgba(180,165,140,0.5);">+33 1 23 45 67 89</span>
                </li>
                <li class="flex items-center gap-3">
                  <div class="w-7 h-7 border flex items-center justify-center shrink-0" style="border-color:rgba(212,175,55,0.2);">
                    <svg class="w-3 h-3 text-bronze-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  </div>
                  <span class="font-accent text-sm" style="color:rgba(180,165,140,0.5);">contact&#64;pocimas.test</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Divider + Copyright -->
          <div class="pt-8 flex flex-col md:flex-row items-center justify-between gap-4" style="border-top: 1px solid rgba(212,175,55,0.08);">
            <p class="font-accent text-xs uppercase tracking-[0.25em]" style="color:rgba(180,165,140,0.3);">
              &copy; {{ year }} {{ 'FOOTER.ALL_RIGHTS' | translate }}
            </p>
            <div class="flex items-center gap-2" style="color:rgba(212,175,55,0.3);">
              <span class="font-display text-[9px] uppercase tracking-widest">Crafted with</span>
              <span style="color:rgba(212,175,55,0.5);">♦</span>
              <span class="font-display text-[9px] uppercase tracking-widest">Passion</span>
            </div>
          </div>
        </div>
      </div>

      <style>
        .footer-link { font-family:inherit; font-size:0.8rem; color:rgba(180,165,140,0.45); transition:all 0.3s; display:flex; align-items:center; gap:8px; }
        .footer-link::before { content:''; display:inline-block; width:0; height:1px; background:#D4AF37; transition:width 0.4s cubic-bezier(0.16,1,0.3,1); }
        .footer-link:hover { color:#D4AF37; }
        .footer-link:hover::before { width:16px; }
        .social-icon { width:34px;height:34px;border:1px solid rgba(212,175,55,0.15);display:flex;align-items:center;justify-content:center;color:rgba(180,165,140,0.4);transition:all 0.4s; }
        .social-icon:hover { border-color:rgba(212,175,55,0.6);color:#D4AF37;box-shadow:0 0 15px rgba(212,175,55,0.2);transform:translateY(-2px); }
      </style>
    </footer>
  `,
})
export class FooterComponent {
  year = new Date().getFullYear();
}

