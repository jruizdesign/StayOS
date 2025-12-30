import { Room, RoomStatus, RoomType, Booking, BookingStatus } from './types';

export const MOCK_ROOMS: Room[] = [
  { id: '101', number: '101', type: RoomType.STANDARD, status: RoomStatus.OCCUPIED, price: 150, floor: 1 },
  { id: '102', number: '102', type: RoomType.STANDARD, status: RoomStatus.DIRTY, price: 150, floor: 1 },
  { id: '103', number: '103', type: RoomType.STANDARD, status: RoomStatus.AVAILABLE, price: 150, floor: 1 },
  { id: '104', number: '104', type: RoomType.DELUXE, status: RoomStatus.AVAILABLE, price: 250, floor: 1 },
  { id: '201', number: '201', type: RoomType.DELUXE, status: RoomStatus.OCCUPIED, price: 250, floor: 2 },
  { id: '202', number: '202', type: RoomType.SUITE, status: RoomStatus.MAINTENANCE, price: 450, floor: 2 },
  { id: '301', number: '301', type: RoomType.PENTHOUSE, status: RoomStatus.AVAILABLE, price: 1200, floor: 3 },
];

export const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'b_1',
    guestName: 'John Doe',
    guestEmail: 'john@example.com',
    roomId: '101',
    roomNumber: '101',
    checkInDate: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
    checkOutDate: new Date(Date.now() + 86400000).toISOString(), // tomorrow
    status: BookingStatus.CHECKED_IN,
    totalAmount: 450,
    notes: 'Late check-in requested.'
  },
  {
    id: 'b_2',
    guestName: 'Sarah Smith',
    guestEmail: 'sarah@example.com',
    roomId: '201',
    roomNumber: '201',
    checkInDate: new Date(Date.now() - 86400000).toISOString(),
    checkOutDate: new Date(Date.now() + 86400000 * 3).toISOString(),
    status: BookingStatus.CHECKED_IN,
    totalAmount: 1000
  },
  {
    id: 'b_3',
    guestName: 'Michael Johnson',
    guestEmail: 'mike@example.com',
    roomId: '104',
    roomNumber: '104',
    checkInDate: new Date(Date.now() + 86400000).toISOString(),
    checkOutDate: new Date(Date.now() + 86400000 * 5).toISOString(),
    status: BookingStatus.CONFIRMED,
    totalAmount: 1250,
    notes: 'VIP guest.'
  }
];
