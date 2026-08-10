import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { MenuCategory } from '../../models';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Page Header -->
    <div class="relative pt-32 pb-16 px-6 overflow-hidden">
      <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&q=80')] bg-cover bg-center opacity-10"></div>
      <div class="relative text-center max-w-2xl mx-auto">
        <p class="section-subtitle">Culinary Journey</p>
        <h1 class="section-title text-5xl md:text-7xl">Our Menu</h1>
        <div class="gold-divider w-24 mx-auto"></div>
        <p class="font-accent text-cream-400">Crafted with the finest seasonal ingredients, our menu is a celebration of French culinary tradition.</p>
      </div>
    </div>

    <!-- Loading -->
    <div *ngIf="loading" class="flex justify-center items-center py-32">
      <div class="w-12 h-12 border-2 border-bronze-400 border-t-transparent rounded-full animate-spin"></div>
    </div>

    <!-- Category Filters -->
    <div *ngIf="!loading" class="px-6 mb-12">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-wrap gap-3 justify-center">
          <button (click)="selectedCategory = null"
                  [class]="'font-accent text-sm uppercase tracking-widest px-6 py-2 transition-all duration-300 ' + (!selectedCategory ? 'bg-gold-gradient text-dark-900 font-semibold' : 'border border-cream-700/30 text-cream-400 hover:border-bronze-400 hover:text-bronze-400')">
            All
          </button>
          <button *ngFor="let cat of categories" (click)="selectedCategory = cat.id"
                  [class]="'font-accent text-sm uppercase tracking-widest px-6 py-2 transition-all duration-300 ' + (selectedCategory === cat.id ? 'bg-gold-gradient text-dark-900 font-semibold' : 'border border-cream-700/30 text-cream-400 hover:border-bronze-400 hover:text-bronze-400')">
            {{ cat.name }}
          </button>
        </div>
      </div>
    </div>

    <!-- Menu Items -->
    <div *ngIf="!loading" class="px-6 pb-24">
      <div class="max-w-7xl mx-auto">
        <div *ngFor="let category of filteredCategories" class="mb-16">
          <!-- Category Title -->
          <div class="flex items-center gap-4 mb-8">
            <h2 class="font-heading text-3xl text-cream-100">{{ category.name }}</h2>
            <div class="flex-1 h-px bg-gold-500/20"></div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div *ngFor="let item of category.items"
                 class="card-glass p-0 overflow-hidden group hover:border-gold-500/40 transition-all duration-500 hover:-translate-y-1 flex flex-col">
              <div *ngIf="item.image" class="aspect-video overflow-hidden">
                <img [src]="item.image" [alt]="item.name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
              </div>
              <div *ngIf="!item.image" class="aspect-video bg-dark-700 flex items-center justify-center">
                <svg class="w-12 h-12 text-dark-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>
              <div class="p-6 flex-1 flex flex-col">
                <div class="flex items-start justify-between gap-4 mb-2">
                  <h3 class="font-heading text-lg text-cream-100">{{ item.name }}</h3>
                  <span class="font-accent font-bold text-bronze-400 whitespace-nowrap">€{{ item.price }}</span>
                </div>
                <p class="font-accent text-sm text-dark-500 leading-relaxed flex-1">{{ item.description }}</p>
                <div *ngIf="!item.available" class="mt-3">
                  <span class="font-accent text-xs bg-red-500/10 border border-red-500/30 text-red-400 px-3 py-1 rounded-full">
                    Unavailable
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty state -->
        <div *ngIf="filteredCategories.length === 0" class="text-center py-24 text-dark-500">
          <p class="font-accent text-lg">No items found.</p>
        </div>
      </div>
    </div>
  `,
})
export class MenuComponent implements OnInit {
  categories: MenuCategory[] = [];
  selectedCategory: number | null = null;
  loading = true;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getMenu().subscribe({
      next: (data) => { this.categories = data; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  get filteredCategories(): MenuCategory[] {
    if (!this.selectedCategory) return this.categories;
    return this.categories.filter(c => c.id === this.selectedCategory);
  }
}

