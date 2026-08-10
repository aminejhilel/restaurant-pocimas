import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuCategory, RestaurantTable, Reservation, ReservationFormData, Settings, ContactForm } from '../models';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private apiUrl = '/api';

  constructor(private http: HttpClient) {}

  // Settings
  getSettings(): Observable<Settings> {
    return this.http.get<Settings>(`${this.apiUrl}/settings`);
  }

  // Menu
  getMenu(): Observable<MenuCategory[]> {
    return this.http.get<MenuCategory[]>(`${this.apiUrl}/menu`);
  }

  getMenuCategories(): Observable<MenuCategory[]> {
    return this.http.get<MenuCategory[]>(`${this.apiUrl}/menu/categories`);
  }

  // Tables
  getTables(): Observable<RestaurantTable[]> {
    return this.http.get<RestaurantTable[]>(`${this.apiUrl}/tables`);
  }

  getTableAvailability(date: string, time: string, guests: number): Observable<RestaurantTable[]> {
    return this.http.get<RestaurantTable[]>(`${this.apiUrl}/tables/availability`, {
      params: { date, time, guests: guests.toString() }
    });
  }

  // Reservations
  createReservation(data: ReservationFormData): Observable<{ message: string; reservation: Reservation }> {
    return this.http.post<{ message: string; reservation: Reservation }>(`${this.apiUrl}/reservations`, data);
  }

  getMyReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiUrl}/reservations/my`);
  }

  getReservation(id: number): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.apiUrl}/reservations/${id}`);
  }

  cancelReservation(id: number): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.apiUrl}/reservations/${id}/cancel`, {});
  }

  // Payment
  createCheckoutSession(reservationId: number): Observable<{ checkout_url: string; session_id: string }> {
    return this.http.post<{ checkout_url: string; session_id: string }>(`${this.apiUrl}/payment/create`, {
      reservation_id: reservationId
    });
  }

  // Contact
  sendContactMessage(data: ContactForm): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/contact`, data);
  }
}

