import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { RestaurantTable, Settings, User } from '../../models';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="relative pt-32 pb-24 px-6">
      <div class="max-w-5xl mx-auto">
        
        <!-- Header & Steps -->
        <div class="text-center mb-16">
          <h1 class="font-heading text-4xl md:text-5xl text-cream-100 mb-8">Book a Table</h1>
          
          <div class="flex items-center justify-center max-w-md mx-auto">
            <div [class]="step >= 1 ? 'step-active' : 'step-pending'">1</div>
            <div [class]="'flex-1 h-px mx-2 ' + (step >= 2 ? 'bg-bronze-500' : 'bg-dark-600')"></div>
            <div [class]="step >= 2 ? 'step-active' : (step > 1 ? 'step-done' : 'step-pending')">2</div>
            <div [class]="'flex-1 h-px mx-2 ' + (step >= 3 ? 'bg-bronze-500' : 'bg-dark-600')"></div>
            <div [class]="step >= 3 ? 'step-active' : 'step-pending'">3</div>
          </div>
          <div class="flex justify-between max-w-md mx-auto mt-2 px-1 font-accent text-xs uppercase tracking-widest text-dark-500">
            <span [class]="step >= 1 ? 'text-bronze-400' : ''">Details</span>
            <span [class]="step >= 2 ? 'text-bronze-400' : ''">Select Table</span>
            <span [class]="step >= 3 ? 'text-bronze-400' : ''">Confirm</span>
          </div>
        </div>

        <div class="card-glass p-8 md:p-12 relative overflow-hidden">
          <div class="absolute top-0 left-0 w-full h-1 bg-gold-gradient"></div>

          <!-- STEP 1: Date, Time, Guests -->
          <div *ngIf="step === 1" class="animate-in">
            <h2 class="font-heading text-2xl text-cream-100 mb-6">When will you join us?</h2>
            
            <form [formGroup]="dateTimeForm" (ngSubmit)="checkAvailability()" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label class="font-accent text-xs uppercase tracking-widest text-cream-400 mb-2 block">Date</label>
                  <input formControlName="date" type="date" class="input-field" [min]="minDate">
                </div>
                <div>
                  <label class="font-accent text-xs uppercase tracking-widest text-cream-400 mb-2 block">Time</label>
                  <select formControlName="time" class="input-field bg-dark-700/50">
                    <option value="" disabled>Select a time</option>
                    <option *ngFor="let t of timeSlots" [value]="t">{{ t }}</option>
                  </select>
                </div>
                <div>
                  <label class="font-accent text-xs uppercase tracking-widest text-cream-400 mb-2 block">Guests</label>
                  <select formControlName="guests" class="input-field bg-dark-700/50">
                    <option *ngFor="let n of [1,2,3,4,5,6,7,8,9,10]" [value]="n">{{ n }} {{ n === 1 ? 'Person' : 'People' }}</option>
                  </select>
                </div>
              </div>
              
              <div class="flex justify-end pt-4">
                <button type="submit" [disabled]="dateTimeForm.invalid || loading" class="btn-primary flex items-center gap-2">
                  <span *ngIf="loading" class="w-4 h-4 border-2 border-dark-900 border-t-transparent rounded-full animate-spin"></span>
                  Find a Table
                </button>
              </div>
            </form>
          </div>

          <!-- STEP 2: Table Selection -->
          <div *ngIf="step === 2" class="animate-in">
            <div class="flex justify-between items-end mb-8">
              <div>
                <h2 class="font-heading text-2xl text-cream-100 mb-2">Select your table</h2>
                <p class="font-accent text-sm text-cream-400">
                  {{ formatDate(dateTimeForm.value.date) }} at {{ dateTimeForm.value.time }} for {{ dateTimeForm.value.guests }} guests
                </p>
              </div>
              <button (click)="step = 1" class="font-accent text-xs uppercase tracking-widest text-dark-500 hover:text-bronze-400 transition-colors">
                ← Change Details
              </button>
            </div>

            <!-- Legend -->
            <div class="flex flex-wrap gap-4 mb-8 font-accent text-xs">
              <div class="flex items-center gap-2"><div class="w-4 h-4 rounded-sm bg-emerald-500/10 border border-emerald-500/60"></div> Available</div>
              <div class="flex items-center gap-2"><div class="w-4 h-4 rounded-sm bg-amber-500/20 border border-amber-500"></div> Selected</div>
              <div class="flex items-center gap-2"><div class="w-4 h-4 rounded-sm bg-red-500/10 border border-red-500/60 opacity-70"></div> Reserved/Too Small</div>
            </div>

            <!-- Visual Restaurant Map -->
            <div class="relative bg-dark-900 border border-cream-800/20 rounded-sm w-full max-w-3xl mx-auto overflow-hidden shadow-inner mb-8" style="height: 400px;">
              <!-- Decorative elements -->
              <div class="absolute top-0 w-full h-8 bg-dark-800 border-b border-cream-800/30 flex items-center justify-center">
                <span class="font-accent text-[10px] uppercase tracking-widest text-dark-500">Bar Area</span>
              </div>
              <div class="absolute bottom-0 w-full h-8 bg-dark-800 border-t border-cream-800/30 flex items-center justify-center">
                <span class="font-accent text-[10px] uppercase tracking-widest text-dark-500">Window / Street View</span>
              </div>

              <!-- Tables -->
              <ng-container *ngFor="let table of tables">
                <div 
                  (click)="selectTable(table)"
                  class="absolute flex items-center justify-center flex-col"
                  [ngClass]="getTableClass(table)"
                  [ngStyle]="getTableStyle(table)">
                  
                  <span class="font-heading font-bold text-lg mb-1">{{ table.table_number }}</span>
                  <div class="flex gap-1">
                    <svg *ngFor="let i of [].constructor(table.capacity)" class="w-2 h-2 opacity-50" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                  </div>
                </div>
              </ng-container>
            </div>

            <div class="flex justify-between items-center pt-4 border-t border-cream-800/20">
              <p class="font-accent text-sm text-cream-400">
                <span *ngIf="selectedTable">Selected: Table {{ selectedTable.table_number }} (Capacity: {{ selectedTable.capacity }})</span>
                <span *ngIf="!selectedTable">Please select an available table on the map.</span>
              </p>
              <button (click)="goToStep3()" [disabled]="!selectedTable" class="btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
                Continue to Details
              </button>
            </div>
          </div>

          <!-- STEP 3: Contact Info & Confirm -->
          <div *ngIf="step === 3" class="animate-in">
            <div class="flex justify-between items-end mb-8">
              <div>
                <h2 class="font-heading text-2xl text-cream-100 mb-2">Complete your reservation</h2>
                <p class="font-accent text-sm text-cream-400">
                  Reservation fee: <span class="text-bronze-400 font-bold">€{{ settings?.reservation_fee | number:'1.2-2' }}</span> (Deducted from final bill)
                </p>
              </div>
              <button (click)="step = 2" class="font-accent text-xs uppercase tracking-widest text-dark-500 hover:text-bronze-400 transition-colors">
                ← Change Table
              </button>
            </div>

            <form [formGroup]="contactForm" (ngSubmit)="submitReservation()" class="space-y-5">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label class="font-accent text-xs uppercase tracking-widest text-cream-400 mb-2 block">Full Name *</label>
                  <input formControlName="customer_name" class="input-field" placeholder="John Doe">
                </div>
                <div>
                  <label class="font-accent text-xs uppercase tracking-widest text-cream-400 mb-2 block">Email *</label>
                  <input formControlName="customer_email" type="email" class="input-field" placeholder="john@example.com">
                </div>
                <div>
                  <label class="font-accent text-xs uppercase tracking-widest text-cream-400 mb-2 block">Phone Number *</label>
                  <input formControlName="customer_phone" class="input-field" placeholder="+33 1 23 45 67 89">
                </div>
              </div>
              <div>
                <label class="font-accent text-xs uppercase tracking-widest text-cream-400 mb-2 block">Special Requests (Optional)</label>
                <textarea formControlName="special_request" rows="3" class="input-field resize-none" placeholder="Allergies, anniversaries..."></textarea>
              </div>

              <div *ngIf="error" class="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-sm font-accent text-sm">
                {{ error }}
              </div>

              <div class="flex justify-end pt-6 border-t border-cream-800/20">
                <button type="submit" [disabled]="contactForm.invalid || loading" class="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                  <span *ngIf="loading" class="w-4 h-4 border-2 border-dark-900 border-t-transparent rounded-full animate-spin"></span>
                  {{ loading ? 'Confirming...' : 'Confirm Reservation' }}
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  `,
})
export class ReservationComponent implements OnInit, OnDestroy {
  step = 1;
  loading = false;
  error = '';
  
  dateTimeForm!: FormGroup;
  contactForm!: FormGroup;
  
  minDate = new Date().toISOString().split('T')[0];
  timeSlots = ['18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'];
  
  tables: RestaurantTable[] = [];
  selectedTable: RestaurantTable | null = null;
  settings: Settings | null = null;
  user: User | null = null;

  private userSub: any;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.api.getSettings().subscribe(s => this.settings = s);
    
    this.dateTimeForm = this.fb.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
      guests: [2, Validators.required]
    });

    this.contactForm = this.fb.group({
      customer_name: ['', Validators.required],
      customer_email: ['', [Validators.required, Validators.email]],
      customer_phone: ['', Validators.required],
      special_request: ['']
    });

    this.userSub = this.auth.currentUser$.subscribe(u => {
      this.user = u;
      if (u) {
        this.contactForm.patchValue({
          customer_name: u.name,
          customer_email: u.email
        });
      }
    });
  }

  ngOnDestroy() {
    if (this.userSub) this.userSub.unsubscribe();
  }

  checkAvailability() {
    if (this.dateTimeForm.invalid) return;
    this.loading = true;
    const val = this.dateTimeForm.value;
    
    this.api.getTableAvailability(val.date, val.time, val.guests).subscribe({
      next: (tables) => {
        this.tables = tables;
        this.selectedTable = null; // reset selection
        this.step = 2;
        this.loading = false;
      },
      error: () => {
        alert('Error fetching availability. Please try again.');
        this.loading = false;
      }
    });
  }

  selectTable(table: RestaurantTable) {
    if (table.availability_status === 'reserved' || !table.suitable) return;
    this.selectedTable = table;
  }

  getTableClass(table: RestaurantTable): string {
    if (table.availability_status === 'reserved' || !table.suitable) {
      return 'table-reserved';
    }
    if (this.selectedTable?.id === table.id) {
      return 'table-selected';
    }
    return 'table-available text-emerald-400';
  }

  getTableStyle(table: RestaurantTable): any {
    // Determine dimensions based on shape and capacity to make it look realistic
    let width = 60;
    let height = 60;
    let borderRadius = '4px';

    if (table.shape === 'round') {
      borderRadius = '50%';
      width = table.capacity > 4 ? 90 : 70;
      height = width;
    } else if (table.shape === 'rectangle') {
      width = 100;
      height = 60;
    } else { // square
      width = table.capacity > 2 ? 80 : 60;
      height = width;
    }

    return {
      left: `${table.position_x}%`,
      top: `${table.position_y}%`,
      width: `${width}px`,
      height: `${height}px`,
      borderRadius: borderRadius,
      transform: 'translate(-50%, -50%)'
    };
  }

  goToStep3() {
    if (!this.selectedTable) return;
    this.step = 3;
  }

  submitReservation() {
    if (this.contactForm.invalid || !this.selectedTable) return;
    this.loading = true;
    this.error = '';

    const dtVal = this.dateTimeForm.value;
    const payload = {
      ...this.contactForm.value,
      table_id: this.selectedTable.id,
      reservation_date: dtVal.date,
      reservation_time: dtVal.time,
      guests: dtVal.guests,
    };

    this.api.createReservation(payload).subscribe({
      next: (res) => {
        // Reservation created - redirect to confirmation page
        this.loading = false;
        window.location.href = '/reservation/confirmation?reservation_id=' + res.reservation.id;
      },
      error: (err) => {
        this.error = err.error?.message || 'Error creating reservation. The table might have just been booked by someone else.';
        this.loading = false;
      }
    });
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  }
}

