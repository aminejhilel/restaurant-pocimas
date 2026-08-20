import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ApiService } from '../../services/api.service';
import { Settings } from '../../models';

import { AccordionGalleryComponent } from '../../components/accordion-gallery/accordion-gallery.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule, AccordionGalleryComponent],
  styles: [`
    /* ── Hero Carousel ── */
    .hero-slide {
      position: absolute; inset: 0;
      background-size: cover;
      background-position: center;
      opacity: 0;
      transition: opacity 1.5s ease-in-out;
    }
    .hero-slide.active { opacity: 1; }
    .hero-slide-1 { background-image: url('/assets/hero-bg.jpg'); }
    .hero-slide-2 { background-image: url('/assets/new-slider-1.jpg'); }
    .hero-slide-3 { background-image: url('/assets/new-slider-2.jpg'); }

    /* Dot indicators */
    .carousel-dot { width:8px; height:8px; border-radius:50%; background:rgba(255,255,255,0.4); transition: all 0.4s; cursor:pointer; }
    .carousel-dot.active { background:#D4AF37; transform:scale(1.3); }

    .hero-noise {
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
      background-repeat: repeat;
    }
    .stat-card:hover .stat-value { text-shadow: 0 0 30px rgba(212,175,55,0.6); }
    .dish-card { transition: transform 0.6s cubic-bezier(0.16,1,0.3,1), box-shadow 0.6s ease; }
    .dish-card:hover { transform: translateY(-10px); box-shadow: 0 40px 80px rgba(0,0,0,0.8), 0 0 40px rgba(212,175,55,0.08); }
    .gallery-item img { transition: transform 0.8s cubic-bezier(0.16,1,0.3,1); }
    .gallery-item:hover img { transform: scale(1.1); }
    .scroll-line {
      width: 1px; height: 60px;
      background: linear-gradient(to bottom, rgba(212,175,55,0.8), transparent);
      animation: scrollPulse 2s ease-in-out infinite;
    }
    @keyframes scrollPulse {
      0%, 100% { opacity: 0.3; transform: scaleY(0.8); }
      50%       { opacity: 1;   transform: scaleY(1); }
    }
    .hero-word { display: inline-block; opacity: 0; animation: wordIn 0.8s cubic-bezier(0.16,1,0.3,1) forwards; }
    @keyframes wordIn {
      from { opacity: 0; transform: translateY(60px) rotateX(20deg); }
      to   { opacity: 1; transform: translateY(0)   rotateX(0); }
    }
  `],
  template: `

    <!-- ═══════════════════════════════════════════ HERO ═══ -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden" style="perspective:1200px">

      <!-- Background Carousel Slides -->
      <div class="hero-slide hero-slide-1" [class.active]="currentSlide === 0"></div>
      <div class="hero-slide hero-slide-2" [class.active]="currentSlide === 1"></div>
      <div class="hero-slide hero-slide-3" [class.active]="currentSlide === 2"></div>

      <!-- Noise texture -->
      <div class="absolute inset-0 hero-noise opacity-60"></div>
      <!-- Cinematic dark vignette overlay -->
      <div class="absolute inset-0" style="background: linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.65) 80%, rgba(0,0,0,0.95) 100%);"></div>

      <!-- Hero Content — CENTERED -->
      <div class="relative z-20 w-full text-center px-6 md:px-16 lg:px-24">
        <div class="max-w-4xl mx-auto">

          <!-- Eyebrow label -->
          <div class="flex items-center justify-center gap-4 mb-6" style="animation: wordIn 0.6s ease forwards;">
            <div class="h-px w-12" style="background: linear-gradient(to right, transparent, #D4AF37);"></div>
            <p class="font-display text-bronze-400 uppercase tracking-[0.3em] text-xs">{{ 'HERO.EYEBROW' | translate }}</p>
            <div class="h-px w-12" style="background: linear-gradient(to left, transparent, #D4AF37);"></div>
          </div>

          <!-- Main title -->
          <h1 class="font-heading text-white leading-none mb-3" style="font-size: clamp(3.5rem, 10vw, 9rem);">
            <span class="hero-word" style="animation-delay:0.05s">{{ 'HERO.TITLE_1' | translate }}</span>
          </h1>
          <h1 class="font-heading leading-none mb-8" style="font-size: clamp(3.5rem, 10vw, 9rem); background: linear-gradient(90deg, #835709 0%, #D4AF37 40%, #f0d980 60%, #D4AF37 80%, #835709 100%); background-size: 200% auto; -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; animation: shimmer 4s linear infinite, wordIn 0.8s 0.1s cubic-bezier(0.16,1,0.3,1) both;">
            {{ 'HERO.TITLE_2' | translate }}
          </h1>

          <p class="font-display text-cream-400 max-w-2xl mx-auto mb-10 leading-relaxed" style="font-size:1.05rem; animation: wordIn 0.8s 0.25s ease both;">
            {{ 'HERO.SUBTITLE' | translate }}
          </p>

          <div class="flex flex-col sm:flex-row items-center justify-center gap-4" style="animation: wordIn 0.8s 0.38s ease both;">
            <a routerLink="/reservation" class="btn-primary">{{ 'HERO.BTN_RESERVE' | translate }}</a>
            <a routerLink="/menu" class="btn-outline">{{ 'HERO.BTN_EXPLORE' | translate }}</a>
          </div>
        </div>
      </div>



      <!-- Carousel dot indicators -->
      <div class="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
        <span class="carousel-dot" [class.active]="currentSlide === 0" (click)="goToSlide(0)"></span>
        <span class="carousel-dot" [class.active]="currentSlide === 1" (click)="goToSlide(1)"></span>
        <span class="carousel-dot" [class.active]="currentSlide === 2" (click)="goToSlide(2)"></span>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-8 right-12 z-20 flex flex-col items-center gap-3">
        <p class="font-display text-bronze-400/60 uppercase tracking-[0.2em] text-[10px]" style="writing-mode:vertical-rl">{{ 'HERO.SCROLL' | translate }}</p>
        <div class="scroll-line"></div>
      </div>

    </section>

    <!-- ═══════════════════════════════════════════ INTRO STRIP ═══ -->
    <div class="py-12 border-y overflow-hidden" style="border-color: rgba(212,175,55,0.12); background: linear-gradient(90deg, #000 0%, #080808 50%, #000 100%);">
      <div class="flex gap-16 items-center justify-center flex-wrap px-8">
        <div *ngFor="let stat of stats; let i = index" class="stat-card text-center group cursor-default">
          <div class="stat-value font-heading text-5xl text-gradient mb-1 transition-all duration-300">{{ stat.value }}</div>
          <div class="font-display text-[10px] uppercase tracking-[0.2em] text-dark-500">{{ 'HOME_STATS.STAT' + (i+1) | translate }}</div>
        </div>
      </div>
    </div>

    <!-- ═══════════════════════════════════════════ ABOUT ═══ -->
    <section class="py-28 px-6">
      <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <!-- Text -->
        <div>
          <p class="section-subtitle">{{ 'ABOUT.SUBTITLE' | translate }}</p>
          <h2 class="section-title mb-2">{{ 'ABOUT.TITLE_1' | translate }}</h2>
          <h2 class="font-heading text-4xl md:text-5xl lg:text-6xl mb-4" style="-webkit-text-fill-color: transparent; background: linear-gradient(90deg, #835709 0%, #D4AF37 40%, #f0d980 60%, #D4AF37 80%, #835709 100%); background-size: 200% auto; -webkit-background-clip: text; background-clip: text; animation: shimmer 4s linear infinite;">{{ 'ABOUT.TITLE_2' | translate }}</h2>
          <div class="gold-divider" style="margin-left:0; margin-right:auto;"></div>
          <p class="font-display text-cream-400 leading-relaxed mb-5" style="font-size:0.95rem;">
            {{ 'ABOUT.P1' | translate }}
          </p>
          <p class="font-display text-cream-500 leading-relaxed mb-10" style="font-size:0.95rem;">
            {{ 'ABOUT.P2' | translate }}
          </p>
          <a routerLink="/our-story" class="btn-outline">{{ 'ABOUT.BTN' | translate }}</a>
        </div>
        <!-- Asymmetric photo grid -->
        <div class="grid grid-cols-2 gap-3 h-[500px]">
          <div class="gallery-item row-span-2 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80"
                 alt="Restaurant ambiance" class="w-full h-full object-cover">
          </div>
          <div class="gallery-item overflow-hidden">
            <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80"
                 alt="Signature dish" class="w-full h-full object-cover">
          </div>
          <div class="gallery-item overflow-hidden">
            <img src="https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=80"
                 alt="Plating" class="w-full h-full object-cover">
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════ FEATURED DISHES ═══ -->
    <section class="py-28 px-6" style="background: linear-gradient(180deg, #000 0%, #060606 50%, #000 100%);">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-20">
          <p class="section-subtitle">{{ 'FEATURED.SUBTITLE' | translate }}</p>
          <h2 class="section-title">{{ 'FEATURED.TITLE' | translate }}</h2>
          <div class="gold-divider"></div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div *ngFor="let dish of featuredDishes; let i = index"
               class="dish-card card-glass overflow-hidden group cursor-default"
               [style.animation-delay]="(i * 0.12) + 's'">
            <div class="relative aspect-[4/3] overflow-hidden">
              <img [src]="dish.image" [alt]="'HOME_DISHES.DISH' + (i+1) + '_NAME' | translate"
                   class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
              <!-- Category badge -->
              <div class="absolute top-3 left-3 px-3 py-1" style="background: rgba(0,0,0,0.7); border: 1px solid rgba(212,175,55,0.3);">
                <span class="font-display text-[10px] text-bronze-400 uppercase tracking-widest">{{ 'HOME_DISHES.DISH' + (i+1) + '_CAT' | translate }}</span>
              </div>
            </div>
            <div class="p-7">
              <h3 class="font-heading text-2xl text-cream-100 mb-3">{{ 'HOME_DISHES.DISH' + (i+1) + '_NAME' | translate }}</h3>
              <p class="font-display text-sm text-cream-500 leading-relaxed mb-5">{{ 'HOME_DISHES.DISH' + (i+1) + '_DESC' | translate }}</p>
              <div class="flex items-center justify-between">
                <span class="font-display font-semibold text-bronze-400 text-xl">€{{ dish.price }}</span>
                <div class="h-px flex-1 mx-4" style="background: linear-gradient(to right, rgba(212,175,55,0.2), transparent);"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center mt-16">
          <a routerLink="/menu" class="btn-outline">{{ 'FEATURED.BTN' | translate }}</a>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════ GALLERY ═══ -->
    <section class="py-28 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <p class="section-subtitle">{{ 'GALLERY.SUBTITLE' | translate }}</p>
          <h2 class="section-title">{{ 'GALLERY.TITLE' | translate }}</h2>
          <div class="gold-divider"></div>
        </div>
        <app-accordion-gallery
          [items]="galleryItems"
          [defaultIndex]="2"
          [height]="520"
          [gap]="6"
          [radius]="4"
          [expandRatio]="0.52"
          [duration]="0.6"
          [ease]="'power3.out'"
          [parallax]="0.5"
          [tilt]="6"
          [showLabels]="true"
          [grayscale]="false"
          accentColor="#D4AF37"
          overlayColor="#05000e"
          textColor="#ffffff"
          trigger="hover"
        ></app-accordion-gallery>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════ CTA ═══ -->
    <section class="relative py-40 px-6 overflow-hidden">
      <div class="absolute inset-0" style="background-image: url('https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=1920&q=80'); background-size:cover; background-position:center; background-attachment:fixed;"></div>
      <div class="absolute inset-0" style="background: rgba(0,0,0,0.88);"></div>
      <!-- Gold ambient glow -->
      <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div style="width:600px; height:600px; background: radial-gradient(ellipse, rgba(212,175,55,0.07) 0%, transparent 70%);"></div>
      </div>
      <div class="relative z-10 text-center max-w-2xl mx-auto">
        <p class="section-subtitle">{{ 'CTA.SUBTITLE' | translate }}</p>
        <h2 class="section-title mb-6">{{ 'CTA.TITLE' | translate }}</h2>
        <div class="gold-divider"></div>
        <p class="font-display text-cream-500 mb-12 leading-relaxed">
          {{ 'CTA.TEXT' | translate }}
        </p>
        <a routerLink="/reservation" class="btn-primary text-sm px-14 py-4">
          {{ 'CTA.BTN' | translate }}
        </a>
      </div>
    </section>
  `,
})
export class HomeComponent implements OnInit {
  settings: Settings | null = null;

  // Carousel state
  currentSlide = 0;
  private carouselInterval: any;

  goToSlide(index: number) {
    this.currentSlide = index;
    clearInterval(this.carouselInterval);
    this.startCarousel();
  }

  private startCarousel() {
    this.carouselInterval = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % 3;
    }, 5000);
  }
  featuredDishes = [
    { name: 'Boeuf Bourguignon', description: 'Tender beef braised in Burgundy wine with mushrooms, pearl onions and lardons.', price: '24.00', category: 'Main Course', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=80' },
    { name: 'Crème Brûlée', description: 'Classic Madagascan vanilla custard with a perfectly caramelized sugar crust.', price: '9.00', category: 'Dessert', image: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=600&q=80' },
    { name: 'Escargots de Bourgogne', description: 'Snails baked in herbed garlic butter — a true French classic, elevated.', price: '12.00', category: 'Starter', image: 'https://images.unsplash.com/photo-1604908177453-7462950a6a3b?w=600&q=80' },
  ];

  stats = [
    { value: '35+', label: 'Years of Excellence' },
    { value: '50k+', label: 'Happy Guests' },
    { value: '3', label: 'Michelin Stars' },
    { value: '120+', label: 'Signature Dishes' },
  ];

  galleryItems = [
    { image: 'assets/gallery/gallery1.jpg', label: 'Cuisine', link: '#' },
    { image: 'assets/gallery/gallery2.jpg', label: 'Ambiance', link: '#' },
    { image: 'assets/gallery/gallery3.jpg', label: 'Saveurs', link: '#' },
    { image: 'assets/gallery/gallery4.jpg', label: 'Détails', link: '#' },
    { image: 'assets/gallery/gallery5.jpg', label: 'Moments', link: '#' },
  ];

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getSettings().subscribe(s => this.settings = s);
    this.startCarousel();
  }

  ngOnDestroy() {
    clearInterval(this.carouselInterval);
  }
}
