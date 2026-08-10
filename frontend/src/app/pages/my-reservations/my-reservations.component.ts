import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Reservation } from '../../models';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-reservations',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="relative pt-32 pb-16 px-6">
      <div class="max-w-5xl mx-auto">
        <h1 class="font-heading text-4xl text-cream-100 mb-2">My Reservations</h1>
        <p class="font-accent text-cream-400 mb-10">Manage your upcoming and past dining experiences.</p>

        <div *ngIf="loading" class="flex justify-center py-12">
          <div class="w-8 h-8 border-2 border-bronze-400 border-t-transparent rounded-full animate-spin"></div>
        </div>

        <div *ngIf="!loading && reservations.length === 0" class="card-glass p-12 text-center">
          <div class="w-16 h-16 rounded-full bg-dark-700 flex items-center justify-center mx-auto mb-6">
            <svg class="w-8 h-8 text-dark-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
          </div>
          <h3 class="font-heading text-2xl text-cream-100 mb-2">No Reservations Yet</h3>
          <p class="font-accent text-dark-500 mb-8">You haven't made any reservations with us.</p>
          <a routerLink="/reservation" class="btn-primary">Book a Table</a>
        </div>

        <div *ngIf="!loading && reservations.length > 0" class="space-y-6">
          <div *ngFor="let res of reservations" class="card-glass p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-3">
                <span class="font-accent font-semibold text-bronze-400">#RES-{{ formatId(res.id) }}</span>
                
                <span *ngIf="res.reservation_status === 'confirmed'" class="px-2 py-0.5 rounded text-[10px] font-accent uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Confirmed</span>
                <span *ngIf="res.reservation_status === 'pending'" class="px-2 py-0.5 rounded text-[10px] font-accent uppercase tracking-wider bg-warning-500/10 text-amber-400 border border-amber-500/20">Pending</span>
                <span *ngIf="res.reservation_status === 'cancelled'" class="px-2 py-0.5 rounded text-[10px] font-accent uppercase tracking-wider bg-red-500/10 text-red-400 border border-red-500/20">Cancelled</span>
              </div>
              
              <h3 class="font-heading text-2xl text-cream-100 mb-4">{{ formatDate(res.reservation_date) }} at {{ res.reservation_time }}</h3>
              
              <div class="flex flex-wrap gap-x-8 gap-y-2 font-accent text-sm text-cream-300">
                <div class="flex items-center gap-2">
                  <svg class="w-4 h-4 text-dark-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
                  {{ res.guests }} Guests
                </div>
                <div class="flex items-center gap-2">
                  <svg class="w-4 h-4 text-dark-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>
                  Table {{ res.table?.table_number }}
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-dark-500">€</span>
                  Paid: €{{ res.reservation_fee }}
                </div>
              </div>
            </div>

            <div class="flex flex-col gap-3 w-full md:w-auto">
              <!-- Pay Button if pending -->
              <button *ngIf="res.payment_status === 'pending' && res.reservation_status !== 'cancelled'" 
                      (click)="pay(res.id)"
                      class="btn-primary w-full md:w-auto text-xs py-2">
                Complete Payment
              </button>
              
              <!-- Cancel Button if not cancelled or completed -->
              <button *ngIf="!['cancelled', 'completed'].includes(res.reservation_status) && canCancel(res)"
                      (click)="cancel(res.id)"
                      class="btn-outline w-full md:w-auto text-xs py-2 text-red-400 border-red-500/30 hover:bg-red-500/10 hover:text-red-400">
                Cancel Reservation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class MyReservationsComponent implements OnInit {
  reservations: Reservation[] = [];
  loading = true;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadReservations();
  }

  loadReservations() {
    this.loading = true;
    this.api.getMyReservations().subscribe({
      next: (res) => { this.reservations = res; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  formatId(id: number): string {
    return id.toString().padStart(5, '0');
  }

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }

  canCancel(res: Reservation): boolean {
    if (res.payment_status === 'pending') return true;
    // Rule: Cannot cancel paid reservation < 24h before
    const resDate = new Date(`${res.reservation_date}T${res.reservation_time}`);
    const now = new Date();
    const diffHours = (resDate.getTime() - now.getTime()) / (1000 * 60 * 60);
    return diffHours >= 24;
  }

  pay(id: number) {
    this.api.createCheckoutSession(id).subscribe({
      next: (res) => {
        window.location.href = res.checkout_url;
      }
    });
  }

  cancel(id: number) {
    if (!confirm('Are you sure you want to cancel this reservation?')) return;
    this.api.cancelReservation(id).subscribe({
      next: () => this.loadReservations(),
      error: (err) => alert(err.error?.message || 'Error cancelling reservation.')
    });
  }
}

