import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'our-story',
    loadComponent: () => import('./pages/our-story/our-story.component').then(m => m.OurStoryComponent)
  },
  {
    path: 'menu',
    loadComponent: () => import('./pages/menu/menu.component').then(m => m.MenuComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent)
  },
  {
    path: 'reservation',
    loadComponent: () => import('./pages/reservation/reservation.component').then(m => m.ReservationComponent)
  },
  {
    path: 'reservation/confirmation',
    loadComponent: () => import('./pages/reservation/confirmation.component').then(m => m.ConfirmationComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'my-reservations',
    loadComponent: () => import('./pages/my-reservations/my-reservations.component').then(m => m.MyReservationsComponent),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

