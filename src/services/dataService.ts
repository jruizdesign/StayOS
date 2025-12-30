
import { Booking, Room, RoomStatus, Transaction, RoomType, BookingStatus } from '../types';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase-config';

// MOCK DATA for Demo Mode
const MOCK_ROOMS: Room[] = [
  { id: '101', number: '101', type: RoomType.STANDARD, status: RoomStatus.OCCUPIED, price: 150, floor: 1 },
  { id: '102', number: '102', type: RoomType.STANDARD, status: RoomStatus.DIRTY, price: 150, floor: 1 },
  { id: '103', number: '103', type: RoomType.STANDARD, status: RoomStatus.AVAILABLE, price: 150, floor: 1 },
  { id: '104', number: '104', type: RoomType.DELUXE, status: RoomStatus.AVAILABLE, price: 250, floor: 1 },
  { id: '201', number: '201', type: RoomType.DELUXE, status: RoomStatus.OCCUPIED, price: 250, floor: 2 },
  { id: '202', number: '202', type: RoomType.SUITE, status: RoomStatus.MAINTENANCE, price: 450, floor: 2 },
  { id: '301', number: '301', type: RoomType.PENTHOUSE, status: RoomStatus.AVAILABLE, price: 1200, floor: 3 },
];

const MOCK_BOOKINGS: Booking[] = [
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

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 't1', date: '2023-10-25', description: 'Room 301 Payment', category: 'Revenue', amount: 1200, type: 'INCOME', status: 'COMPLETED' },
  { id: 't2', date: '2023-10-24', description: 'Laundry Service Vendor', category: 'Operations', amount: 450, type: 'EXPENSE', status: 'COMPLETED' },
  { id: 't3', date: '2023-10-24', description: 'Minibar Restock', category: 'F&B', amount: 1200, type: 'EXPENSE', status: 'PENDING' },
  { id: 't4', date: '2023-10-23', description: 'Room 104 Payment', category: 'Revenue', amount: 850, type: 'INCOME', status: 'COMPLETED' },
  { id: 't5', date: '2023-10-22', description: 'Maintenance Supplies', category: 'Maintenance', amount: 320, type: 'EXPENSE', status: 'COMPLETED' },
  { id: 't6', date: '2023-10-21', description: 'Bar Revenue', category: 'F&B', amount: 2400, type: 'INCOME', status: 'COMPLETED' },
];

let rooms = [...MOCK_ROOMS];
let bookings = [...MOCK_BOOKINGS];
let transactions = [...MOCK_TRANSACTIONS];

// Function to check if demo mode is enabled. 
// For now, we will use a simple localStorage flag.
const isDemoMode = () => localStorage.getItem('isDemoMode') !== 'false';

// Function to reset demo data
export const resetDemoData = () => {
  rooms = [...MOCK_ROOMS];
  bookings = [...MOCK_BOOKINGS];
  transactions = [...MOCK_TRANSACTIONS];
};


export const getRooms = async (): Promise<Room[]> => {
  if (isDemoMode()) {
    return new Promise(resolve => setTimeout(() => resolve(rooms), 300));
  }
  const roomsCol = collection(db, 'rooms');
  const roomSnapshot = await getDocs(roomsCol);
  const roomList = roomSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Room));
  return roomList;
};

export const updateRoomStatus = async (roomId: string, status: RoomStatus): Promise<Room> => {
  if (isDemoMode()) {
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
  }
  const roomRef = doc(db, 'rooms', roomId);
  await updateDoc(roomRef, { status });
  return { id: roomId, status } as Room; // Partial update
};

export const getBookings = async (): Promise<Booking[]> => {
  if (isDemoMode()) {
    return new Promise((resolve) => setTimeout(() => resolve(bookings), 300));
  }
  const bookingsCol = collection(db, 'bookings');
  const bookingSnapshot = await getDocs(bookingsCol);
  const bookingList = bookingSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Booking));
  return bookingList;
};


// ... (rest of the mock data functions remain the same)

export const getRecentRevenue = async (): Promise<{date: string, amount: number}[]> => {
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
  if (isDemoMode()) {
    return new Promise((resolve) => setTimeout(() => resolve(transactions), 400));
  }
  const transactionsCol = collection(db, 'transactions');
  const transactionSnapshot = await getDocs(transactionsCol);
  const transactionList = transactionSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Transaction));
  return transactionList;
};
