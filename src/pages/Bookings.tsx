import React, { useEffect, useState } from 'react';
import { getBookings } from '../services/dataService';
import { Booking, BookingStatus } from '../types';
import { format } from 'date-fns'; // Note: In a real env, install date-fns. Using standard JS date here for zero-dep.

const Bookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    getBookings().then(setBookings);
  }, []);

  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
        case BookingStatus.CONFIRMED: return <span className="px-2 py-1 text-xs rounded-md bg-blue-100 text-blue-700">Confirmed</span>;
        case BookingStatus.CHECKED_IN: return <span className="px-2 py-1 text-xs rounded-md bg-green-100 text-green-700">Checked In</span>;
        case BookingStatus.CHECKED_OUT: return <span className="px-2 py-1 text-xs rounded-md bg-slate-100 text-slate-700">Checked Out</span>;
        case BookingStatus.CANCELLED: return <span className="px-2 py-1 text-xs rounded-md bg-red-100 text-red-700">Cancelled</span>;
    }
  };

  return (
    <div className="space-y-6">
       <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Reservations</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200">
            New Booking
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                    <tr>
                        <th className="p-4 border-b border-slate-200">Guest</th>
                        <th className="p-4 border-b border-slate-200">Room</th>
                        <th className="p-4 border-b border-slate-200">Check In</th>
                        <th className="p-4 border-b border-slate-200">Check Out</th>
                        <th className="p-4 border-b border-slate-200">Status</th>
                        <th className="p-4 border-b border-slate-200 text-right">Amount</th>
                        <th className="p-4 border-b border-slate-200">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                    {bookings.map((booking) => (
                        <tr key={booking.id} className="hover:bg-slate-50 transition-colors">
                            <td className="p-4">
                                <div className="font-medium text-slate-900">{booking.guestName}</div>
                                <div className="text-slate-500 text-xs">{booking.guestEmail}</div>
                            </td>
                            <td className="p-4 font-mono text-slate-600">{booking.roomNumber}</td>
                            <td className="p-4 text-slate-600">{formatDate(booking.checkInDate)}</td>
                            <td className="p-4 text-slate-600">{formatDate(booking.checkOutDate)}</td>
                            <td className="p-4">{getStatusBadge(booking.status)}</td>
                            <td className="p-4 text-right font-medium text-slate-700">${booking.totalAmount}</td>
                            <td className="p-4">
                                <button className="text-blue-600 hover:text-blue-800 text-xs font-semibold">
                                    Manage
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        {bookings.length === 0 && (
            <div className="p-8 text-center text-slate-500">No bookings found.</div>
        )}
      </div>
    </div>
  );
};

export default Bookings;