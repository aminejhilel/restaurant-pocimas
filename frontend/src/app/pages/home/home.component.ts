import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Settings, MenuCategory } from '../../models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Hero Section -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <!-- Background -->
      <div class="absolute inset-0 bg-gradient-to-b from-dark-900/60 via-dark-900/40 to-dark-900 z-10"></div>
      <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80')] bg-cover bg-center animate-float"></div>

      <!-- Hero Content -->
      <div class="relative z-20 text-center px-6 max-w-4xl mx-auto">
        <p class="section-subtitle mb-6 animate-in">Est. 1987 · Paris, France</p>
        <h1 class="font-heading text-6xl md:text-8xl text-cream-100 leading-none mb-6 animate-in" style="animation-delay:0.1s">
          Pócimas <span class="text-gradient italic">Restaurante</span>
        </h1>
        <p class="font-accent text-lg text-cream-300 max-w-xl mx-auto mb-10 leading-relaxed animate-in" style="animation-delay:0.2s">
          Where culinary artistry meets timeless elegance. An unforgettable dining experience awaits you.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center animate-in" style="animation-delay:0.3s">
          <a routerLink="/reservation" class="btn-primary">Reserve a Table</a>
          <a routerLink="/menu" class="btn-outline">View Menu</a>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <div class="w-px h-12 bg-gradient-to-b from-bronze-500 to-transparent mx-auto"></div>
      </div>
    </section>

    <!-- About snippet -->
    <section class="py-24 px-6">
      <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <p class="section-subtitle">A Taste of Excellence</p>
          <h2 class="section-title mb-6">Crafted With Passion,<br>Served With Love</h2>
          <div class="gold-divider"></div>
          <p class="font-accent text-cream-400 leading-relaxed mb-4">
            Nestled in the heart of Paris, Pócimas Restaurante has been a sanctuary for those who appreciate the finer things in life. 
            Our kitchen is led by award-winning chefs who transform the finest seasonal ingredients into extraordinary culinary masterpieces.
          </p>
          <p class="font-accent text-cream-400 leading-relaxed mb-8">
            Every meal is a journey through French culinary tradition, reimagined with contemporary flair and presented with unwavering attention to detail.
          </p>
          <a routerLink="/our-story" class="btn-outline">Our Story</a>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="aspect-square overflow-hidden">
            <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80" 
                 alt="Dish" class="w-full h-full object-cover hover:scale-110 transition-transform duration-700">
          </div>
          <div class="aspect-square overflow-hidden mt-8">
            <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80" 
                 alt="Restaurant" class="w-full h-full object-cover hover:scale-110 transition-transform duration-700">
          </div>
          <div class="aspect-square overflow-hidden">
            <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80" 
                 alt="Chef" class="w-full h-full object-cover hover:scale-110 transition-transform duration-700">
          </div>
          <div class="aspect-square overflow-hidden mt-8">
            <img src="https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=80" 
                 alt="Food" class="w-full h-full object-cover hover:scale-110 transition-transform duration-700">
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Dishes -->
    <section class="py-24 px-6 bg-dark-800/50">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <p class="section-subtitle">Chef's Selection</p>
          <h2 class="section-title">Featured Dishes</h2>
          <div class="gold-divider w-24 mx-auto"></div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div *ngFor="let dish of featuredDishes" class="card-glass overflow-hidden group hover:border-bronze-500/40 transition-all duration-500 hover:-translate-y-2">
            <div class="aspect-video overflow-hidden">
              <img [src]="dish.image" [alt]="dish.name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
            </div>
            <div class="p-6">
              <span class="font-accent text-xs text-bronze-400 uppercase tracking-widest">{{ dish.category }}</span>
              <h3 class="font-heading text-xl text-cream-100 mt-2 mb-3">{{ dish.name }}</h3>
              <p class="font-accent text-sm text-cream-400 leading-relaxed mb-4">{{ dish.description }}</p>
              <span class="font-accent font-semibold text-bronze-400 text-lg">€{{ dish.price }}</span>
            </div>
          </div>
        </div>
        <div class="text-center mt-12">
          <a routerLink="/menu" class="btn-outline">View Full Menu</a>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="py-16 px-6 bg-dark-900 border-y border-cream-800/10">
      <div class="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        <div *ngFor="let stat of stats">
          <div class="font-heading text-4xl text-gradient mb-2">{{ stat.value }}</div>
          <div class="font-accent text-sm text-dark-500 uppercase tracking-widest">{{ stat.label }}</div>
        </div>
      </div>
    </section>

    <!-- Gallery -->
    <section class="py-24 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <p class="section-subtitle">Moments</p>
          <h2 class="section-title">A Glimpse Inside</h2>
          <div class="gold-divider w-24 mx-auto"></div>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          <div *ngFor="let img of galleryImages; let i = index" 
               [class]="'overflow-hidden ' + (i === 0 || i === 5 ? 'col-span-2 row-span-2' : '')">
            <img [src]="img" alt="Gallery" class="w-full h-full object-cover hover:scale-110 transition-transform duration-700 min-h-[200px]">
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="relative py-32 px-6 overflow-hidden">
      <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=1920&q=80')] bg-cover bg-center"></div>
      <div class="absolute inset-0 bg-dark-900/80"></div>
      <div class="relative z-10 text-center max-w-2xl mx-auto">
        <p class="section-subtitle">Experience Fine Dining</p>
        <h2 class="section-title mb-6">Book Your Table Tonight</h2>
        <p class="font-accent text-cream-400 mb-10">
          Reserve your table and let us craft an unforgettable evening for you and your guests.
        </p>
        <a routerLink="/reservation" class="btn-primary text-base px-12 py-4">
          Make a Reservation
        </a>
      </div>
    </section>
  `,
})
export class HomeComponent implements OnInit {
  settings: Settings | null = null;

  featuredDishes = [
    { name: 'Boeuf Bourguignon', description: 'Beef braised in red wine with mushrooms and pearl onions.', price: '24.00', category: 'Main Course', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=80' },
    { name: 'Crème Brûlée', description: 'Classic vanilla custard with a perfectly caramelized sugar crust.', price: '9.00', category: 'Dessert', image: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=600&q=80' },
    { name: 'Escargots de Bourgogne', description: 'Snails in garlic-herb butter, a true French classic.', price: '12.00', category: 'Starter', image: 'https://images.unsplash.com/photo-1604908177453-7462950a6a3b?w=600&q=80' },
  ];

  stats = [
    { value: '35+', label: 'Years of Excellence' },
    { value: '50k+', label: 'Happy Guests' },
    { value: '3', label: 'Michelin Stars' },
    { value: '120+', label: 'Signature Dishes' },
  ];

  galleryImages = [
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80',
    'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=80',
    'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80',
    'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=600&q=80',
    'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=400&q=80',
    'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=400&q=80',
  ];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getSettings().subscribe(s => this.settings = s);
  }
}

