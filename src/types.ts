import React from 'react';

export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  FRONT_DESK = 'FRONT_DESK',
  HOUSEKEEPING = 'HOUSEKEEPING'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

export enum RoomStatus {
  AVAILABLE = 'AVAILABLE',
  OCCUPIED = 'OCCUPIED',
  DIRTY = 'DIRTY',
  MAINTENANCE = 'MAINTENANCE'
}

export enum RoomType {
  STANDARD = 'STANDARD',
  DELUXE = 'DELUXE',
  SUITE = 'SUITE',
  PENTHOUSE = 'PENTHOUSE'
}

export interface Room {
  id: string;
  number: string;
  type: RoomType;
  status: RoomStatus;
  price: number;
  floor: number;
}

export enum BookingStatus {
  CONFIRMED = 'CONFIRMED',
  CHECKED_IN = 'CHECKED_IN',
  CHECKED_OUT = 'CHECKED_OUT',
  CANCELLED = 'CANCELLED'
}

export interface Booking {
  id: string;
  guestName: string;
  guestEmail: string;
  roomId: string;
  roomNumber: string;
  checkInDate: string; // ISO Date string
  checkOutDate: string; // ISO Date string
  status: BookingStatus;
  totalAmount: number;
  notes?: string;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: 'INCOME' | 'EXPENSE';
  status: 'COMPLETED' | 'PENDING';
}

export interface NavItem {
  label: string;
  path: string;
  icon: React.ComponentType<any>;
  allowedRoles: UserRole[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface SystemLog {
  id: string;
  action: string;
  details: string;
  userId: string;
  userName: string;
  timestamp: string; // ISO Date string
  module: 'AUTH' | 'ROOMS' | 'BOOKINGS' | 'SYSTEM';
}
