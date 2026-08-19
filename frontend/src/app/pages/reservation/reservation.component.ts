import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { RestaurantTable, Settings, User } from '../../models';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  template: `
    <div class="relative pt-32 pb-24 px-6 min-h-screen">
      <!-- Ambient background glow -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] pointer-events-none opacity-20" style="background: radial-gradient(ellipse, rgba(212,175,55,0.4) 0%, transparent 70%);"></div>
      
      <div class="max-w-5xl mx-auto relative z-10">
        
        <!-- Header & Steps -->
        <div class="text-center mb-16 animate-in">
          <p class="section-subtitle">{{ 'RESERVATION.EYEBROW' | translate }}</p>
          <h1 class="font-heading text-4xl md:text-6xl text-cream-100 mb-10">{{ 'RESERVATION.TITLE' | translate }}</h1>
          
          <div class="flex items-center justify-center max-w-lg mx-auto">
            <div [class]="step >= 1 ? 'step-active' : 'step-pending'">1</div>
            <div class="flex-1 h-px mx-3" [style.background]="step >= 2 ? 'linear-gradient(90deg, #D4AF37, #D4AF37)' : 'rgba(255,255,255,0.1)'" style="transition: background 0.5s;"></div>
            <div [class]="step >= 2 ? 'step-active' : (step > 1 ? 'step-done' : 'step-pending')">2</div>
            <div class="flex-1 h-px mx-3" [style.background]="step >= 3 ? 'linear-gradient(90deg, #D4AF37, #D4AF37)' : 'rgba(255,255,255,0.1)'" style="transition: background 0.5s;"></div>
            <div [class]="step >= 3 ? 'step-active' : 'step-pending'">3</div>
          </div>
          <div class="flex justify-between max-w-lg mx-auto mt-3 px-1 font-display text-xs uppercase tracking-[0.2em] text-dark-500">
            <span [class]="step >= 1 ? 'text-bronze-400' : ''" style="transition: color 0.3s">{{ 'RESERVATION.STEP_DETAILS' | translate }}</span>
            <span [class]="step >= 2 ? 'text-bronze-400' : ''" style="transition: color 0.3s">{{ 'RESERVATION.STEP_TABLE' | translate }}</span>
            <span [class]="step >= 3 ? 'text-bronze-400' : ''" style="transition: color 0.3s">{{ 'RESERVATION.STEP_CONFIRM' | translate }}</span>
          </div>
        </div>

        <div class="card-glass p-8 md:p-12 transition-all duration-500 relative">
          <!-- Top gold line -->
          <div class="absolute top-0 left-0 w-full h-[2px]" style="background: linear-gradient(90deg, transparent, #D4AF37, transparent);"></div>

          <!-- STEP 1: Details -->
          <div *ngIf="step === 1" class="animate-in" style="animation: scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;">
            <h2 class="font-heading text-3xl text-cream-100 mb-8 text-center">{{ 'RESERVATION.WHEN_JOIN' | translate }}</h2>
            
            <form [formGroup]="dateTimeForm" (ngSubmit)="checkAvailability()" class="space-y-8 max-w-3xl mx-auto">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label class="font-display text-xs uppercase tracking-widest text-cream-500 mb-3 block">{{ 'RESERVATION.DATE' | translate }}</label>
                  <input formControlName="date" type="date" class="input-field" [min]="minDate">
                </div>
                <div>
                  <label class="font-display text-xs uppercase tracking-widest text-cream-500 mb-3 block">{{ 'RESERVATION.TIME' | translate }}</label>
                  <select formControlName="time" class="input-field">
                    <option value="" disabled>{{ 'RESERVATION.SELECT_TIME' | translate }}</option>
                    <option *ngFor="let t of timeSlots" [value]="t">{{ t }}</option>
                  </select>
                </div>
                <div>
                  <label class="font-display text-xs uppercase tracking-widest text-cream-500 mb-3 block">{{ 'RESERVATION.GUESTS' | translate }}</label>
                  <select formControlName="guests" class="input-field">
                    <option *ngFor="let n of [1,2,3,4,5,6,7,8,9,10]" [value]="n">
                      {{ n }} {{ n === 1 ? ('RESERVATION.PERSON' | translate) : ('RESERVATION.PEOPLE' | translate) }}
                    </option>
                  </select>
                </div>
              </div>
              
              <div class="flex justify-center pt-8 border-t border-white/5">
                <button type="submit" [disabled]="dateTimeForm.invalid || loading" class="btn-primary flex items-center justify-center gap-3 w-full md:w-auto min-w-[200px]">
                  <span *ngIf="loading" class="w-4 h-4 border-2 border-dark-900 border-t-transparent rounded-full animate-spin"></span>
                  {{ 'RESERVATION.FIND_TABLE' | translate }}
                </button>
              </div>
            </form>
          </div>

          <!-- STEP 2: Table Selection -->
          <div *ngIf="step === 2" class="animate-in" style="animation: scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;">
            <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 pb-6 border-b border-white/5">
              <div>
                <h2 class="font-heading text-3xl text-cream-100 mb-2">{{ 'RESERVATION.SELECT_TABLE_TITLE' | translate }}</h2>
                <p class="font-display text-sm text-cream-400">
                  {{ formatDate(dateTimeForm.value.date) }} at {{ dateTimeForm.value.time }} for {{ dateTimeForm.value.guests }} {{ dateTimeForm.value.guests === 1 ? ('RESERVATION.PERSON' | translate) : ('RESERVATION.PEOPLE' | translate) }}
                </p>
              </div>
              <button (click)="step = 1" class="font-display text-xs uppercase tracking-widest text-bronze-400/70 hover:text-bronze-400 transition-colors flex items-center gap-2">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
                {{ 'RESERVATION.CHANGE_DETAILS' | translate }}
              </button>
            </div>

            <!-- Legend -->
            <div class="flex flex-wrap justify-center gap-8 mb-8 font-display text-xs uppercase tracking-widest text-cream-500">
              <div class="flex items-center gap-3"><div class="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.3)]"></div> {{ 'RESERVATION.AVAILABLE' | translate }}</div>
              <div class="flex items-center gap-3"><div class="w-3 h-3 rounded-full bg-bronze-400 border border-bronze-400 shadow-gold"></div> {{ 'RESERVATION.SELECTED' | translate }}</div>
              <div class="flex items-center gap-3"><div class="w-3 h-3 rounded-full bg-red-500/10 border border-red-500/40"></div> {{ 'RESERVATION.UNAVAILABLE' | translate }}</div>
            </div>

            <!-- Map -->
            <div class="relative bg-dark-900/50 border border-white/5 rounded-lg w-full max-w-4xl mx-auto overflow-hidden shadow-inner mb-8" style="height: 450px;">
              <div class="absolute inset-0" style="background-image: radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px); background-size: 20px 20px;"></div>
              
              <div class="absolute top-0 w-full h-10 bg-dark-800/80 backdrop-blur border-b border-white/5 flex items-center justify-center">
                <span class="font-display text-[10px] uppercase tracking-[0.2em] text-dark-500">{{ 'RESERVATION.BAR_AREA' | translate }}</span>
              </div>
              <div class="absolute bottom-0 w-full h-10 bg-dark-800/80 backdrop-blur border-t border-white/5 flex items-center justify-center">
                <span class="font-display text-[10px] uppercase tracking-[0.2em] text-dark-500">{{ 'RESERVATION.WINDOW_VIEW' | translate }}</span>
              </div>

              <!-- Tables -->
              <ng-container *ngFor="let table of tables">
                <div 
                  (click)="selectTable(table)"
                  class="absolute flex items-center justify-center flex-col shadow-lg backdrop-blur-sm"
                  [ngClass]="getTableClass(table)"
                  [ngStyle]="getTableStyle(table)">
                  
                  <span class="font-heading font-bold text-xl mb-1 drop-shadow-md">{{ table.table_number }}</span>
                  <div class="flex gap-1 flex-wrap justify-center px-2">
                    <div *ngFor="let i of [].constructor(table.capacity)" class="w-1.5 h-1.5 rounded-full bg-current opacity-60"></div>
                  </div>
                </div>
              </ng-container>
            </div>

            <div class="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-white/5 gap-6">
              <div class="font-display text-sm">
                <div *ngIf="selectedTable" class="flex items-center gap-3 text-cream-100">
                  <span class="text-bronze-400">{{ 'RESERVATION.SELECTED_LABEL' | translate }}</span> 
                  <span>{{ 'RESERVATION.TABLE' | translate }} {{ selectedTable.table_number }} ({{ 'RESERVATION.CAP' | translate }} {{ selectedTable.capacity }})</span>
                </div>
                <div *ngIf="!selectedTable" class="text-cream-500 flex items-center gap-2">
                  <svg class="w-4 h-4 animate-pulse text-bronze-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"/></svg>
                  {{ 'RESERVATION.PLEASE_SELECT' | translate }}
                </div>
              </div>
              <button (click)="goToStep3()" [disabled]="!selectedTable" class="btn-primary w-full md:w-auto">
                {{ 'RESERVATION.CONTINUE' | translate }}
              </button>
            </div>
          </div>

          <!-- STEP 3: Confirm -->
          <div *ngIf="step === 3" class="animate-in" style="animation: scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;">
            <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 pb-6 border-b border-white/5">
              <div>
                <h2 class="font-heading text-3xl text-cream-100 mb-2">{{ 'RESERVATION.CONFIRM_TITLE' | translate }}</h2>
                <p class="font-display text-sm text-cream-400">
                  {{ 'RESERVATION.RES_FEE' | translate }} <span class="text-bronze-400 font-semibold text-lg ml-1">€{{ settings?.reservation_fee | number:'1.2-2' }}</span> <span class="text-xs opacity-70 ml-2">{{ 'RESERVATION.FEE_NOTE' | translate }}</span>
                </p>
              </div>
              <button (click)="step = 2" class="font-display text-xs uppercase tracking-widest text-bronze-400/70 hover:text-bronze-400 transition-colors flex items-center gap-2">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
                {{ 'RESERVATION.CHANGE_TABLE' | translate }}
              </button>
            </div>

            <form [formGroup]="contactForm" (ngSubmit)="submitReservation()" class="space-y-6 max-w-3xl mx-auto">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="font-display text-xs uppercase tracking-widest text-cream-500 mb-3 block">{{ 'RESERVATION.FULL_NAME' | translate }}</label>
                  <input formControlName="customer_name" class="input-field" placeholder="John Doe">
                </div>
                <div>
                  <label class="font-display text-xs uppercase tracking-widest text-cream-500 mb-3 block">{{ 'RESERVATION.EMAIL' | translate }}</label>
                  <input formControlName="customer_email" type="email" class="input-field" placeholder="john@example.com">
                </div>
                <div class="md:col-span-2">
                  <label class="font-display text-xs uppercase tracking-widest text-cream-500 mb-3 block">{{ 'RESERVATION.PHONE' | translate }}</label>
                  <input formControlName="customer_phone" class="input-field" placeholder="+33 1 23 45 67 89">
                </div>
              </div>
              <div>
                <label class="font-display text-xs uppercase tracking-widest text-cream-500 mb-3 block">{{ 'RESERVATION.SPECIAL_REQ' | translate }} <span class="text-dark-500 lowercase">{{ 'RESERVATION.OPTIONAL' | translate }}</span></label>
                <textarea formControlName="special_request" rows="3" class="input-field resize-none" [placeholder]="'RESERVATION.SPECIAL_PH' | translate"></textarea>
              </div>

              <div *ngIf="error" class="bg-red-900/20 border border-red-500/30 text-red-400 p-4 rounded-md font-display text-sm flex items-start gap-3">
                <svg class="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                {{ error }}
              </div>

              <div class="flex justify-end pt-8 border-t border-white/5">
                <button type="submit" [disabled]="contactForm.invalid || loading" class="btn-primary flex items-center justify-center gap-3 w-full md:w-auto min-w-[250px]">
                  <span *ngIf="loading" class="w-4 h-4 border-2 border-dark-900 border-t-transparent rounded-full animate-spin"></span>
                  {{ loading ? ('RESERVATION.PROCESSING' | translate) : ('RESERVATION.CONFIRM_BTN' | translate) }}
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
    private auth: AuthService,
    private translate: TranslateService
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
      return 'table-reserved text-red-400';
    }
    if (this.selectedTable?.id === table.id) {
      return 'table-selected text-bronze-900';
    }
    return 'table-available text-emerald-400';
  }

  getTableStyle(table: RestaurantTable): any {
    // Determine dimensions based on shape and capacity to make it look realistic
    let width = 60;
    let height = 60;
    let borderRadius = '8px';

    if (table.shape === 'round') {
      borderRadius = '50%';
      width = table.capacity > 4 ? 90 : 70;
      height = width;
    } else if (table.shape === 'rectangle') {
      width = 110;
      height = 70;
    } else { // square
      width = table.capacity > 2 ? 80 : 65;
      height = width;
    }

    return {
      left: `${table.position_x}%`,
      top: `${table.position_y}%`,
      width: `${width}px`,
      height: `${height}px`,
      borderRadius: borderRadius,
      transform: 'translate(-50%, -50%)',
      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
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
    const lang = this.translate.currentLang || 'es';
    return new Date(dateStr).toLocaleDateString(lang, { weekday: 'long', month: 'long', day: 'numeric' });
  }
}
