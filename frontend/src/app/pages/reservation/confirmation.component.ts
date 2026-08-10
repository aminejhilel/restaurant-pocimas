import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-[80vh] flex items-center justify-center px-6 py-24">
      <div class="card-glass p-12 text-center max-w-lg relative overflow-hidden">
        <div class="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
        
        <div class="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6 text-emerald-400">
          <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
          </svg>
        </div>

        <h1 class="font-heading text-4xl text-cream-100 mb-4">Reservation Confirmed!</h1>
        <p class="font-accent text-cream-300 mb-8 leading-relaxed">
          Your table has been successfully reserved. We look forward to welcoming you!
        </p>

        <a routerLink="/my-reservations" class="btn-primary w-full block">View My Reservations</a>
        <a routerLink="/" class="block mt-4 font-accent text-sm text-bronze-400 hover:text-bronze-300">Return to Home</a>
      </div>
    </div>
  `,
})
export class ConfirmationComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  
  ngOnInit() {
    // We could verify the session_id here with the backend if we wanted to
  }
}

