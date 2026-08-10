import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav [class]="'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ' + (scrolled ? 'bg-dark-900/95 backdrop-blur-md shadow-lg shadow-black/50' : 'bg-transparent')">
      <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <!-- Logo -->
        <a routerLink="/" class="flex items-center gap-3 group">
          <img src="assets/logo.png" alt="Pócimas Restaurante" class="h-12 w-auto object-contain">
        </a>

        <!-- Desktop Nav -->
        <div class="hidden lg:flex items-center gap-8">
          <a routerLink="/" routerLinkActive="text-bronze-400" [routerLinkActiveOptions]="{exact:true}"
             class="font-accent text-sm uppercase tracking-widest text-cream-300 hover:text-bronze-400 transition-colors duration-300">
            Home
          </a>
          <a routerLink="/our-story" routerLinkActive="text-bronze-400"
             class="font-accent text-sm uppercase tracking-widest text-cream-300 hover:text-bronze-400 transition-colors duration-300">
            Our Story
          </a>
          <a routerLink="/menu" routerLinkActive="text-bronze-400"
             class="font-accent text-sm uppercase tracking-widest text-cream-300 hover:text-bronze-400 transition-colors duration-300">
            Menu
          </a>
          <a routerLink="/contact" routerLinkActive="text-bronze-400"
             class="font-accent text-sm uppercase tracking-widest text-cream-300 hover:text-bronze-400 transition-colors duration-300">
            Contact
          </a>
        </div>

        <!-- Auth + CTA -->
        <div class="hidden lg:flex items-center gap-4">
          <ng-container *ngIf="!isLoggedIn">
            <a routerLink="/login"
               class="font-accent text-sm uppercase tracking-widest text-cream-300 hover:text-bronze-400 transition-colors duration-300">
              Login
            </a>
          </ng-container>
          <ng-container *ngIf="isLoggedIn">
            <a routerLink="/my-reservations"
               class="font-accent text-sm uppercase tracking-widest text-cream-300 hover:text-bronze-400 transition-colors duration-300">
              My Reservations
            </a>
            <button (click)="logout()"
               class="font-accent text-sm uppercase tracking-widest text-cream-300 hover:text-red-400 transition-colors duration-300">
              Logout
            </button>
          </ng-container>
          <a routerLink="/reservation" class="btn-primary text-xs px-6 py-2.5">
            Reserve a Table
          </a>
        </div>

        <!-- Mobile Menu Button -->
        <button (click)="mobileOpen = !mobileOpen" class="lg:hidden text-cream-200 hover:text-bronze-400 transition-colors">
          <svg *ngIf="!mobileOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
          <svg *ngIf="mobileOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div *ngIf="mobileOpen" class="lg:hidden bg-dark-900/98 backdrop-blur-md border-t border-cream-800/20 px-6 py-6 flex flex-col gap-5">
        <a routerLink="/" (click)="mobileOpen=false" class="font-accent text-sm uppercase tracking-widest text-cream-200 hover:text-bronze-400">Home</a>
        <a routerLink="/our-story" (click)="mobileOpen=false" class="font-accent text-sm uppercase tracking-widest text-cream-200 hover:text-bronze-400">Our Story</a>
        <a routerLink="/menu" (click)="mobileOpen=false" class="font-accent text-sm uppercase tracking-widest text-cream-200 hover:text-bronze-400">Menu</a>
        <a routerLink="/contact" (click)="mobileOpen=false" class="font-accent text-sm uppercase tracking-widest text-cream-200 hover:text-bronze-400">Contact</a>
        <div class="border-t border-cream-800/20 pt-4 flex flex-col gap-4">
          <ng-container *ngIf="!isLoggedIn">
            <a routerLink="/login" (click)="mobileOpen=false" class="font-accent text-sm uppercase tracking-widest text-cream-200 hover:text-bronze-400">Login</a>
          </ng-container>
          <ng-container *ngIf="isLoggedIn">
            <a routerLink="/my-reservations" (click)="mobileOpen=false" class="font-accent text-sm uppercase tracking-widest text-cream-200 hover:text-bronze-400">My Reservations</a>
            <button (click)="logout(); mobileOpen=false" class="text-left font-accent text-sm uppercase tracking-widest text-red-400">Logout</button>
          </ng-container>
          <a routerLink="/reservation" (click)="mobileOpen=false" class="btn-primary text-center text-xs">Reserve a Table</a>
        </div>
      </div>
    </nav>
  `,
})
export class NavbarComponent implements OnInit {
  scrolled = false;
  mobileOpen = false;
  isLoggedIn = false;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.currentUser$.subscribe(user => this.isLoggedIn = !!user || !!localStorage.getItem('token'));
  }

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled = window.scrollY > 50;
  }

  logout() {
    this.auth.logout();
  }
}

