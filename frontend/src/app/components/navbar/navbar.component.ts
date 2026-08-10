import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav [class]="'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ' + (scrolled ? 'bg-dark-900/90 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.8)] border-b border-white/5 py-2' : 'bg-transparent py-5')">
      <!-- Animated Gold Bottom Border on Scroll -->
      <div class="absolute bottom-0 left-0 h-[1px] w-full transition-opacity duration-500" [style.opacity]="scrolled ? '1' : '0'" style="background: linear-gradient(90deg, transparent, rgba(212,175,55,0.5), transparent);"></div>
      
      <div class="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <!-- Logo -->
        <a routerLink="/" class="flex items-center gap-3 group">
          <!-- The user needs to add logo.png to assets -->
          <img src="assets/logo.png" alt="Pócimas" class="h-14 w-auto object-contain transition-transform duration-500 group-hover:scale-105" (error)="onImgError($event)">
          <span *ngIf="imgError" class="font-heading text-2xl text-cream-100 tracking-wider">Pócimas</span>
        </a>

        <!-- Desktop Nav -->
        <div class="hidden lg:flex items-center gap-10">
          <a routerLink="/" routerLinkActive="text-bronze-400 border-b border-bronze-400" [routerLinkActiveOptions]="{exact:true}"
             class="font-display text-[11px] uppercase tracking-[0.2em] text-cream-300 hover:text-bronze-400 transition-all duration-300 py-1 border-b border-transparent">
            Home
          </a>
          <a routerLink="/our-story" routerLinkActive="text-bronze-400 border-b border-bronze-400"
             class="font-display text-[11px] uppercase tracking-[0.2em] text-cream-300 hover:text-bronze-400 transition-all duration-300 py-1 border-b border-transparent">
            Our Story
          </a>
          <a routerLink="/menu" routerLinkActive="text-bronze-400 border-b border-bronze-400"
             class="font-display text-[11px] uppercase tracking-[0.2em] text-cream-300 hover:text-bronze-400 transition-all duration-300 py-1 border-b border-transparent">
            Menu
          </a>
          <a routerLink="/contact" routerLinkActive="text-bronze-400 border-b border-bronze-400"
             class="font-display text-[11px] uppercase tracking-[0.2em] text-cream-300 hover:text-bronze-400 transition-all duration-300 py-1 border-b border-transparent">
            Contact
          </a>
        </div>

        <!-- Auth + CTA -->
        <div class="hidden lg:flex items-center gap-6">
          <ng-container *ngIf="!isLoggedIn">
            <a routerLink="/login"
               class="font-display text-[11px] uppercase tracking-[0.2em] text-cream-300 hover:text-bronze-400 transition-colors duration-300">
              Login
            </a>
          </ng-container>
          <ng-container *ngIf="isLoggedIn">
            <a routerLink="/my-reservations"
               class="font-display text-[11px] uppercase tracking-[0.2em] text-cream-300 hover:text-bronze-400 transition-colors duration-300">
              My Reservations
            </a>
            <button (click)="logout()"
               class="font-display text-[11px] uppercase tracking-[0.2em] text-cream-300 hover:text-red-400 transition-colors duration-300">
              Logout
            </button>
          </ng-container>
          <a routerLink="/reservation" class="btn-primary text-[11px] px-7 py-3">
            Reserve
          </a>
        </div>

        <!-- Mobile Menu Button -->
        <button (click)="mobileOpen = !mobileOpen" class="lg:hidden text-cream-200 hover:text-bronze-400 transition-colors">
          <svg *ngIf="!mobileOpen" class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
          <svg *ngIf="mobileOpen" class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div *ngIf="mobileOpen" class="lg:hidden bg-dark-900/95 backdrop-blur-xl border-t border-white/10 px-6 py-8 flex flex-col gap-6 absolute top-full left-0 w-full shadow-2xl animate-in">
        <a routerLink="/" (click)="mobileOpen=false" class="font-display text-sm uppercase tracking-[0.2em] text-cream-200 hover:text-bronze-400">Home</a>
        <a routerLink="/our-story" (click)="mobileOpen=false" class="font-display text-sm uppercase tracking-[0.2em] text-cream-200 hover:text-bronze-400">Our Story</a>
        <a routerLink="/menu" (click)="mobileOpen=false" class="font-display text-sm uppercase tracking-[0.2em] text-cream-200 hover:text-bronze-400">Menu</a>
        <a routerLink="/contact" (click)="mobileOpen=false" class="font-display text-sm uppercase tracking-[0.2em] text-cream-200 hover:text-bronze-400">Contact</a>
        <div class="h-px bg-white/10 my-2"></div>
        <div class="flex flex-col gap-6">
          <ng-container *ngIf="!isLoggedIn">
            <a routerLink="/login" (click)="mobileOpen=false" class="font-display text-sm uppercase tracking-[0.2em] text-cream-200 hover:text-bronze-400">Login</a>
          </ng-container>
          <ng-container *ngIf="isLoggedIn">
            <a routerLink="/my-reservations" (click)="mobileOpen=false" class="font-display text-sm uppercase tracking-[0.2em] text-cream-200 hover:text-bronze-400">My Reservations</a>
            <button (click)="logout(); mobileOpen=false" class="text-left font-display text-sm uppercase tracking-[0.2em] text-red-400">Logout</button>
          </ng-container>
          <a routerLink="/reservation" (click)="mobileOpen=false" class="btn-primary text-center text-xs mt-2">Reserve a Table</a>
        </div>
      </div>
    </nav>
  `,
})
export class NavbarComponent implements OnInit {
  scrolled = false;
  mobileOpen = false;
  isLoggedIn = false;
  imgError = false;

  constructor(private auth: AuthService) {}

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
}
