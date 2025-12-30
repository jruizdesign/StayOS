import { Booking, Room, RoomStatus, Transaction } from '../types';
import { MOCK_ROOMS, MOCK_BOOKINGS } from '../constants';

// This service mimics a Firestore Data Service. 
// In a real app, these functions would use `getDocs`, `updateDoc`, etc. from firebase/firestore.

let rooms = [...MOCK_ROOMS];
let bookings = [...MOCK_BOOKINGS];

export const getRooms = async (): Promise<Room[]> => {
  // Simulate network latency
  return new Promise((resolve) => {
    setTimeout(() => resolve(rooms), 300);
  });
};

export const updateRoomStatus = async (roomId: string, status: RoomStatus): Promise<Room> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const roomIndex = rooms.findIndex(r => r.id === roomId);
      if (roomIndex === -1) {
        reject(new Error("Room not found"));
        return;
      }
      const updatedRoom = { ...rooms[roomIndex], status };
      rooms[roomIndex] = updatedRoom;
      resolve(updatedRoom);
    }, 300);
  });
};

export const getBookings = async (): Promise<Booking[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(bookings), 300);
  });
};

export const getRecentRevenue = async (): Promise<{date: string, amount: number}[]> => {
    // Mocking a revenue aggregation
    return [
        { date: 'Mon', amount: 4000 },
        { date: 'Tue', amount: 3000 },
        { date: 'Wed', amount: 5500 },
        { date: 'Thu', amount: 4500 },
        { date: 'Fri', amount: 7000 },
        { date: 'Sat', amount: 8500 },
        { date: 'Sun', amount: 6000 },
    ];
};

export const getFinancialSummary = async (): Promise<{month: string, income: number, expense: number}[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve([
      { month: 'Jan', income: 45000, expense: 28000 },
      { month: 'Feb', income: 52000, expense: 30000 },
      { month: 'Mar', income: 48000, expense: 25000 },
      { month: 'Apr', income: 61000, expense: 35000 },
      { month: 'May', income: 58000, expense: 32000 },
      { month: 'Jun', income: 72000, expense: 40000 },
    ]), 400);
  });
};

export const getTransactions = async (): Promise<Transaction[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve([
      { id: 't1', date: '2023-10-25', description: 'Room 301 Payment', category: 'Revenue', amount: 1200, type: 'INCOME', status: 'COMPLETED' },
      { id: 't2', date: '2023-10-24', description: 'Laundry Service Vendor', category: 'Operations', amount: 450, type: 'EXPENSE', status: 'COMPLETED' },
      { id: 't3', date: '2023-10-24', description: 'Minibar Restock', category: 'F&B', amount: 1200, type: 'EXPENSE', status: 'PENDING' },
      { id: 't4', date: '2023-10-23', description: 'Room 104 Payment', category: 'Revenue', amount: 850, type: 'INCOME', status: 'COMPLETED' },
      { id: 't5', date: '2023-10-22', description: 'Maintenance Supplies', category: 'Maintenance', amount: 320, type: 'EXPENSE', status: 'COMPLETED' },
      { id: 't6', date: '2023-10-21', description: 'Bar Revenue', category: 'F&B', amount: 2400, type: 'INCOME', status: 'COMPLETED' },
    ]), 400);
  });
};