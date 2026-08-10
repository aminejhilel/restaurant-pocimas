import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="min-h-[80vh] flex items-center justify-center px-6 py-24">
      <div class="card-glass p-10 w-full max-w-md relative overflow-hidden">
        <div class="absolute top-0 left-0 w-full h-1 bg-gold-gradient"></div>
        
        <div class="text-center mb-8">
          <h1 class="font-heading text-3xl text-cream-100 mb-2">Welcome Back</h1>
          <p class="font-accent text-sm text-dark-500">Sign in to manage your reservations</p>
        </div>

        <div *ngIf="error" class="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-sm mb-6 font-accent text-sm text-center">
          {{ error }}
        </div>

        <form [formGroup]="form" (ngSubmit)="submit()" class="space-y-6">
          <div>
            <label class="font-accent text-xs uppercase tracking-widest text-cream-400 mb-2 block">Email</label>
            <input formControlName="email" type="email" class="input-field" placeholder="you@example.com">
          </div>
          <div>
            <label class="font-accent text-xs uppercase tracking-widest text-cream-400 mb-2 block">Password</label>
            <input formControlName="password" type="password" class="input-field" placeholder="••••••••">
          </div>
          
          <button type="submit" [disabled]="loading || form.invalid"
                  class="btn-primary w-full justify-center flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
            <span *ngIf="loading" class="w-4 h-4 border-2 border-dark-900 border-t-transparent rounded-full animate-spin"></span>
            {{ loading ? 'Signing in...' : 'Sign In' }}
          </button>
        </form>

        <div class="mt-8 text-center border-t border-cream-800/20 pt-6">
          <p class="font-accent text-sm text-dark-500">
            Don't have an account? 
            <a routerLink="/register" class="text-bronze-400 hover:text-bronze-300 transition-colors">Create one</a>
          </p>
        </div>
      </div>
    </div>
  `,
})
export class LoginComponent {
  form: FormGroup;
  loading = false;
  error = '';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  submit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.error = '';
    
    this.auth.login(this.form.value).subscribe({
      next: () => {
        this.router.navigate(['/my-reservations']);
      },
      error: (err) => {
        this.error = err.error?.message || 'Invalid credentials.';
        this.loading = false;
      }
    });
  }
}

