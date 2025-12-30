import React, { useEffect, useState } from 'react';
import { getRooms, updateRoomStatus } from '../services/dataService';
import { Room, RoomStatus, RoomType } from '../types';
import { BedDouble, Wind, Bath, DollarSign, CheckCircle, XCircle, Wrench, Search } from 'lucide-react';

const RoomCard: React.FC<{ room: Room, onStatusChange: (id: string, status: RoomStatus) => void }> = ({ room, onStatusChange }) => {
    const statusStyles: any = {
        [RoomStatus.AVAILABLE]: { bg: 'bg-green-100', text: 'text-green-800', icon: <CheckCircle className="w-4 h-4" /> },
        [RoomStatus.OCCUPIED]: { bg: 'bg-blue-100', text: 'text-blue-800', icon: <BedDouble className="w-4 h-4" /> },
        [RoomStatus.DIRTY]: { bg: 'bg-orange-100', text: 'text-orange-800', icon: <XCircle className="w-4 h-4" /> },
        [RoomStatus.MAINTENANCE]: { bg: 'bg-purple-100', text: 'text-purple-800', icon: <Wrench className="w-4 h-4" /> },
    };

    const currentStatus = statusStyles[room.status];

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-slate-200">
            <div className={`p-4 bg-gray-50 flex justify-between items-center border-b border-slate-200`}>
                <h3 className="text-xl font-bold text-slate-900">Room {room.number}</h3>
                <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-semibold ${currentStatus.bg} ${currentStatus.text}`}>
                    {currentStatus.icon}
                    <span>{room.status.replace('_', ' ')}</span>
                </div>
            </div>
            <div className="p-4">
                <div className="flex items-center justify-between text-slate-600 mb-4">
                    <span className="flex items-center"><BedDouble className="w-4 h-4 mr-2 text-slate-400" /> {room.type}</span>
                    <span className="text-2xl font-bold text-slate-800">${room.price}<span className="text-sm font-normal">/night</span></span>
                </div>

                <div className="text-sm text-slate-500 mb-4">
                   Floor: {room.floor}
                </div>

                <div className="flex space-x-2">
                    <select 
                        value={room.status} 
                        onChange={(e) => onStatusChange(room.id, e.target.value as RoomStatus)}
                        className="w-full p-2 border rounded-md bg-slate-50 hover:bg-slate-100"
                    >
                        {Object.values(RoomStatus).map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
            </div>
        </div>
    );
};

const Rooms: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<RoomStatus | 'ALL'>('ALL');

  useEffect(() => {
    setLoading(true);
    getRooms().then(data => {
      setRooms(data);
      setFilteredRooms(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    let result = rooms;
    if (searchTerm) {
        result = result.filter(r => r.number.includes(searchTerm));
    }
    if (statusFilter !== 'ALL') {
        result = result.filter(r => r.status === statusFilter);
    }
    setFilteredRooms(result);
  }, [searchTerm, statusFilter, rooms]);

  const handleStatusChange = async (id: string, status: RoomStatus) => {
    // Optimistic update
    const originalRooms = rooms;
    const updatedRooms = rooms.map(r => r.id === id ? {...r, status} : r);
    setRooms(updatedRooms);

    try {
        await updateRoomStatus(id, status);
    } catch (error) {
        setRooms(originalRooms); // Rollback on error
        alert('Failed to update room status.');
    }
  };

  return (
    <div className="space-y-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border flex justify-between items-center">
            <div className="relative w-full max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                    type="text"
                    placeholder="Search room number..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full p-2 pl-10 border rounded-md"
                />
            </div>
            <div>
                 <select 
                    value={statusFilter} 
                    onChange={(e) => setStatusFilter(e.target.value as any)}
                    className="p-2 border rounded-md bg-white"
                >
                    <option value="ALL">All Statuses</option>
                    {Object.values(RoomStatus).map(s => <option key={s} value={s}>{s}</option>)}
                </select>
            </div>
        </div>

        {loading ? (
            <div className="text-center">Loading rooms...</div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredRooms.map(room => (
                    <RoomCard key={room.id} room={room} onStatusChange={handleStatusChange} />
                ))}
            </div>
        )}
    </div>
  );
};

export default Rooms;