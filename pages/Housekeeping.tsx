import React, { useEffect, useState } from 'react';
import { getRooms, updateRoomStatus } from '../services/dataService';
import { Room, RoomStatus } from '../types';
import { CheckCircle2, AlertCircle, Clock } from 'lucide-react';

const Housekeeping: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const data = await getRooms();
      setRooms(data.filter(r => r.status === RoomStatus.DIRTY || r.status === RoomStatus.OCCUPIED));
      setLoading(false);
    };
    fetch();
  }, []);

  const markClean = async (id: string) => {
    setRooms(prev => prev.filter(r => r.id !== id));
    await updateRoomStatus(id, RoomStatus.AVAILABLE);
  };

  if (loading) return <div className="p-4">Loading schedule...</div>;

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Housekeeping Schedule</h2>
        <p className="text-slate-500">
            You have <span className="font-bold text-slate-900">{rooms.filter(r => r.status === RoomStatus.DIRTY).length}</span> dirty rooms pending.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map(room => (
            <div key={room.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden group">
                <div className={`h-2 ${room.status === RoomStatus.DIRTY ? 'bg-red-500' : 'bg-blue-500'}`} />
                <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-3xl font-bold text-slate-800">{room.number}</h3>
                        {room.status === RoomStatus.DIRTY ? (
                            <span className="flex items-center text-red-600 bg-red-50 px-2 py-1 rounded text-xs font-bold uppercase">
                                <AlertCircle className="w-3 h-3 mr-1" /> Dirty
                            </span>
                        ) : (
                             <span className="flex items-center text-blue-600 bg-blue-50 px-2 py-1 rounded text-xs font-bold uppercase">
                                <Clock className="w-3 h-3 mr-1" /> Occupied
                            </span>
                        )}
                    </div>
                    
                    <div className="text-sm text-slate-500 mb-6">
                        Type: {room.type} <br/>
                        Floor: {room.floor}
                    </div>

                    {room.status === RoomStatus.DIRTY && (
                        <button 
                            onClick={() => markClean(room.id)}
                            className="w-full flex items-center justify-center py-3 bg-slate-900 text-white rounded-lg hover:bg-green-600 transition-colors"
                        >
                            <CheckCircle2 className="w-5 h-5 mr-2" />
                            Mark as Clean
                        </button>
                    )}
                    {room.status === RoomStatus.OCCUPIED && (
                        <button disabled className="w-full py-3 bg-slate-100 text-slate-400 rounded-lg cursor-not-allowed">
                            Currently Occupied
                        </button>
                    )}
                </div>
            </div>
        ))}

        {rooms.length === 0 && (
            <div className="col-span-full text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-800">All Caught Up!</h3>
                <p className="text-slate-500">No rooms require attention right now.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default Housekeeping;