import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-our-story',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <!-- Header -->
    <div class="relative pt-32 pb-16 px-6">
      <div class="text-center max-w-2xl mx-auto">
        <p class="section-subtitle">{{ 'STORY.SUBTITLE' | translate }}</p>
        <h1 class="section-title text-5xl md:text-7xl">{{ 'STORY.TITLE' | translate }}</h1>
        <div class="gold-divider w-24 mx-auto"></div>
      </div>
    </div>

    <!-- Content -->
    <div class="px-6 pb-24">
      <div class="max-w-4xl mx-auto space-y-24">
        
        <!-- Chapter 1 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div class="order-2 md:order-1">
            <h2 class="font-heading text-3xl text-cream-100 mb-6">{{ 'STORY.CH1_TITLE' | translate }}</h2>
            <p class="font-accent text-cream-400 leading-relaxed mb-4">
              {{ 'STORY.CH1_P1' | translate }}
            </p>
            <p class="font-accent text-cream-400 leading-relaxed">
              {{ 'STORY.CH1_P2' | translate }}
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
            <h2 class="font-heading text-3xl text-cream-100 mb-6">{{ 'STORY.CH2_TITLE' | translate }}</h2>
            <p class="font-accent text-cream-400 leading-relaxed mb-4">
              {{ 'STORY.CH2_P1' | translate }}
            </p>
            <p class="font-accent text-cream-400 leading-relaxed">
              {{ 'STORY.CH2_P2' | translate }}
            </p>
          </div>
        </div>

        <!-- Chapter 3 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div class="order-2 md:order-1">
            <h2 class="font-heading text-3xl text-cream-100 mb-6">{{ 'STORY.CH3_TITLE' | translate }}</h2>
            <p class="font-accent text-cream-400 leading-relaxed mb-4">
              {{ 'STORY.CH3_P1' | translate }}
            </p>
            <p class="font-accent text-cream-400 leading-relaxed">
              {{ 'STORY.CH3_P2' | translate }}
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

