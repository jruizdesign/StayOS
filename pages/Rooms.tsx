import React, { useEffect, useState } from 'react';
import { getRooms, updateRoomStatus } from '../services/dataService';
import { Room, RoomStatus } from '../types';
import { Filter, Search } from 'lucide-react';

const Rooms: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [filter, setFilter] = useState<RoomStatus | 'ALL'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    const data = await getRooms();
    setRooms(data);
  };

  const handleStatusChange = async (roomId: string, newStatus: RoomStatus) => {
    // Optimistic update
    setRooms(prev => prev.map(r => r.id === roomId ? { ...r, status: newStatus } : r));
    try {
      await updateRoomStatus(roomId, newStatus);
    } catch (e) {
      console.error("Failed to update room", e);
      loadRooms(); // Revert on error
    }
  };

  const getStatusColor = (status: RoomStatus) => {
    switch (status) {
      case RoomStatus.AVAILABLE: return 'bg-green-100 text-green-700 border-green-200';
      case RoomStatus.OCCUPIED: return 'bg-blue-100 text-blue-700 border-blue-200';
      case RoomStatus.DIRTY: return 'bg-red-100 text-red-700 border-red-200';
      case RoomStatus.MAINTENANCE: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const filteredRooms = rooms.filter(room => {
    const matchesFilter = filter === 'ALL' || room.status === filter;
    const matchesSearch = room.number.includes(searchTerm);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-slate-800">Room Management</h2>
        
        <div className="flex items-center space-x-3 bg-white p-2 rounded-lg shadow-sm border border-slate-200">
            <Search className="w-5 h-5 text-slate-400 ml-2" />
            <input 
                type="text" 
                placeholder="Search room..." 
                className="outline-none text-sm text-slate-700 w-32 md:w-48"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {['ALL', ...Object.values(RoomStatus)].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status as RoomStatus | 'ALL')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              filter === status 
                ? 'bg-slate-800 text-white' 
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {status.replace('_', ' ')}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredRooms.map((room) => (
          <div key={room.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <span className="text-2xl font-bold text-slate-800">{room.number}</span>
                <span className="text-xs font-semibold text-slate-400">{room.type}</span>
            </div>
            
            <div className={`px-3 py-1 rounded-full text-xs font-bold text-center border mb-4 ${getStatusColor(room.status)}`}>
                {room.status}
            </div>

            <div className="space-y-2">
                <p className="text-xs text-slate-500 flex justify-between">
                    <span>Floor:</span> <span>{room.floor}</span>
                </p>
                <p className="text-xs text-slate-500 flex justify-between">
                    <span>Rate:</span> <span>${room.price}/n</span>
                </p>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 flex justify-end">
                {room.status === RoomStatus.DIRTY && (
                    <button 
                        onClick={() => handleStatusChange(room.id, RoomStatus.AVAILABLE)}
                        className="text-xs bg-green-50 text-green-700 px-3 py-1.5 rounded-lg hover:bg-green-100 font-medium"
                    >
                        Mark Clean
                    </button>
                )}
                 {room.status === RoomStatus.AVAILABLE && (
                    <button 
                        onClick={() => handleStatusChange(room.id, RoomStatus.MAINTENANCE)}
                        className="text-xs bg-slate-50 text-slate-700 px-3 py-1.5 rounded-lg hover:bg-slate-100 font-medium"
                    >
                        Maintenance
                    </button>
                )}
                 {room.status === RoomStatus.MAINTENANCE && (
                    <button 
                        onClick={() => handleStatusChange(room.id, RoomStatus.AVAILABLE)}
                        className="text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg hover:bg-blue-100 font-medium"
                    >
                        Release
                    </button>
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rooms;