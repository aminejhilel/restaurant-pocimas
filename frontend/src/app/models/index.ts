// Models for the Angular Frontend

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'customer';
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface MenuCategory {
  id: number;
  name: string;
  description: string | null;
  items: MenuItem[];
}

export interface MenuItem {
  id: number;
  name: string;
  description: string | null;
  price: number;
  image: string | null;
  available: boolean;
}

export interface RestaurantTable {
  id: number;
  table_number: string;
  capacity: number;
  shape: 'round' | 'square' | 'rectangle';
  position_x: number;
  position_y: number;
  availability_status?: 'available' | 'reserved';
  suitable?: boolean;
}

export interface Reservation {
  id: number;
  user_id: number | null;
  table_id: number;
  table?: RestaurantTable;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  guests: number;
  reservation_date: string;
  reservation_time: string;
  reservation_fee: number;
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  reservation_status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  stripe_payment_id: string | null;
  special_request: string | null;
  created_at: string;
}

export interface Settings {
  restaurant_name: string;
  logo: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  opening_hours: string | null;
  reservation_fee: number;
  facebook: string | null;
  instagram: string | null;
}

export interface ReservationSlotInfo {
  date: string;
  time: string;
  guests: number;
}

export interface ReservationFormData {
  table_id: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  guests: number;
  reservation_date: string;
  reservation_time: string;
  special_request?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

