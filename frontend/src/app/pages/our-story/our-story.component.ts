import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-our-story',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Header -->
    <div class="relative pt-32 pb-16 px-6">
      <div class="text-center max-w-2xl mx-auto">
        <p class="section-subtitle">Heritage & Passion</p>
        <h1 class="section-title text-5xl md:text-7xl">Our Story</h1>
        <div class="gold-divider w-24 mx-auto"></div>
      </div>
    </div>

    <!-- Content -->
    <div class="px-6 pb-24">
      <div class="max-w-4xl mx-auto space-y-24">
        
        <!-- Chapter 1 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div class="order-2 md:order-1">
            <h2 class="font-heading text-3xl text-cream-100 mb-6">The Beginning</h2>
            <p class="font-accent text-cream-400 leading-relaxed mb-4">
              Founded in 1987 by Chef Antoine Laurent, Pócimas Restaurante began as a small bistro in the heart of Paris. Antoine's vision was simple: to serve authentic French cuisine using only the freshest ingredients from local markets.
            </p>
            <p class="font-accent text-cream-400 leading-relaxed">
              Word quickly spread about the exceptional quality and warmth of the service, turning the modest establishment into a beloved local gem.
            </p>
          </div>
          <div class="order-1 md:order-2 aspect-square overflow-hidden card-glass p-2">
            <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80" alt="Chef Antoine" class="w-full h-full object-cover">
          </div>
        </div>

        <!-- Chapter 2 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div class="aspect-square overflow-hidden card-glass p-2">
            <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80" alt="Ingredients" class="w-full h-full object-cover">
          </div>
          <div>
            <h2 class="font-heading text-3xl text-cream-100 mb-6">Our Philosophy</h2>
            <p class="font-accent text-cream-400 leading-relaxed mb-4">
              We believe that great food starts with great ingredients. That's why we partner closely with local farmers, artisans, and winemakers who share our commitment to sustainability and excellence.
            </p>
            <p class="font-accent text-cream-400 leading-relaxed">
              Every dish is a testament to the seasons, changing dynamically to reflect what nature offers at its absolute peak.
            </p>
          </div>
        </div>

        <!-- Chapter 3 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div class="order-2 md:order-1">
            <h2 class="font-heading text-3xl text-cream-100 mb-6">The Future</h2>
            <p class="font-accent text-cream-400 leading-relaxed mb-4">
              Today, Pócimas Restaurante is honored with three Michelin stars, yet our core values remain unchanged. We continue to push the boundaries of gastronomy while honoring the rich traditions that got us here.
            </p>
            <p class="font-accent text-cream-400 leading-relaxed">
              We invite you to join us on this ongoing culinary journey, where every meal is designed to be a memorable experience.
            </p>
          </div>
          <div class="order-1 md:order-2 aspect-[4/3] overflow-hidden card-glass p-2">
            <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80" alt="Restaurant Interior" class="w-full h-full object-cover">
          </div>
        </div>

      </div>
    </div>
  `,
})
export class OurStoryComponent {}

