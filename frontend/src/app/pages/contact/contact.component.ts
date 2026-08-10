import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <!-- Header -->
    <div class="relative pt-32 pb-16 px-6">
      <div class="text-center max-w-2xl mx-auto">
        <p class="section-subtitle">Get in Touch</p>
        <h1 class="section-title text-5xl md:text-7xl">Contact Us</h1>
        <div class="gold-divider w-24 mx-auto"></div>
      </div>
    </div>

    <div class="px-6 pb-24">
      <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        <!-- Info -->
        <div>
          <h2 class="font-heading text-3xl text-cream-100 mb-8">Visit Us</h2>
          <div class="space-y-6 mb-10">
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 border border-bronze-400/30 flex items-center justify-center shrink-0">
                <svg class="w-4 h-4 text-bronze-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/></svg>
              </div>
              <div>
                <p class="font-accent text-xs text-bronze-400 uppercase tracking-widest mb-1">Address</p>
                <p class="font-accent text-cream-300">123 Avenue des Champs-Élysées</p>
                <p class="font-accent text-cream-300">75008 Paris, France</p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 border border-bronze-400/30 flex items-center justify-center shrink-0">
                <svg class="w-4 h-4 text-bronze-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              </div>
              <div>
                <p class="font-accent text-xs text-bronze-400 uppercase tracking-widest mb-1">Phone</p>
                <p class="font-accent text-cream-300">+33 1 23 45 67 89</p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 border border-bronze-400/30 flex items-center justify-center shrink-0">
                <svg class="w-4 h-4 text-bronze-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              </div>
              <div>
                <p class="font-accent text-xs text-bronze-400 uppercase tracking-widest mb-1">Email</p>
                <p class="font-accent text-cream-300">contact&#64;legourmet.test</p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 border border-bronze-400/30 flex items-center justify-center shrink-0">
                <svg class="w-4 h-4 text-bronze-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>
              <div>
                <p class="font-accent text-xs text-bronze-400 uppercase tracking-widest mb-1">Hours</p>
                <p class="font-accent text-cream-300">Monday – Sunday</p>
                <p class="font-accent text-cream-300">18:00 – 23:00</p>
              </div>
            </div>
          </div>

          <!-- Google Maps placeholder -->
          <div class="aspect-video bg-dark-800 border border-cream-800/20 flex items-center justify-center overflow-hidden">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.142047342144!2d2.3013!3d48.8698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fc4b84ad265%3A0x6b7d0e7f5e6b7c7c!2sChamps-%C3%89lys%C3%A9es!5e0!3m2!1sen!2sfr!4v1680000000000!5m2!1sen!2sfr"
              class="w-full h-full border-0 opacity-80" 
              allowfullscreen
              loading="lazy">
            </iframe>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="card-glass p-8">
          <h2 class="font-heading text-3xl text-cream-100 mb-2">Send a Message</h2>
          <p class="font-accent text-sm text-dark-500 mb-8">We'll get back to you within 24 hours.</p>

          <div *ngIf="success" class="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 rounded-sm mb-6 font-accent text-sm">
            ✓ Your message has been sent. We'll be in touch shortly!
          </div>

          <form [formGroup]="form" (ngSubmit)="submit()" class="space-y-5">
            <div>
              <label class="font-accent text-xs uppercase tracking-widest text-cream-400 mb-2 block">Full Name *</label>
              <input formControlName="name" class="input-field" placeholder="John Doe">
              <p *ngIf="f['name'].touched && f['name'].errors?.['required']" class="text-red-400 text-xs mt-1 font-accent">Name is required</p>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="font-accent text-xs uppercase tracking-widest text-cream-400 mb-2 block">Email *</label>
                <input formControlName="email" type="email" class="input-field" placeholder="john@example.com">
                <p *ngIf="f['email'].touched && f['email'].errors?.['required']" class="text-red-400 text-xs mt-1 font-accent">Email is required</p>
              </div>
              <div>
                <label class="font-accent text-xs uppercase tracking-widest text-cream-400 mb-2 block">Phone</label>
                <input formControlName="phone" class="input-field" placeholder="+33 1 00 00 00 00">
              </div>
            </div>
            <div>
              <label class="font-accent text-xs uppercase tracking-widest text-cream-400 mb-2 block">Message *</label>
              <textarea formControlName="message" rows="5" class="input-field resize-none" placeholder="How can we help you?"></textarea>
              <p *ngIf="f['message'].touched && f['message'].errors?.['required']" class="text-red-400 text-xs mt-1 font-accent">Message is required</p>
            </div>
            <button type="submit" [disabled]="loading"
                    class="btn-primary w-full justify-center flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
              <span *ngIf="loading" class="w-4 h-4 border-2 border-dark-900 border-t-transparent rounded-full animate-spin"></span>
              {{ loading ? 'Sending...' : 'Send Message' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  `,
})
export class ContactComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  success = false;

  constructor(private fb: FormBuilder, private api: ApiService) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      message: ['', Validators.required],
    });
  }

  get f() { return this.form.controls; }

  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading = true;
    this.api.sendContactMessage(this.form.value).subscribe({
      next: () => { this.success = true; this.loading = false; this.form.reset(); },
      error: () => { this.loading = false; }
    });
  }
}

