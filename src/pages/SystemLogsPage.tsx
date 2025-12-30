import React, { useEffect, useState, useRef } from 'react';
import { getSystemLogs } from '../services/dataService';
import { SystemLog } from '../types';
import { Terminal, RefreshCw, Trash2, Filter } from 'lucide-react';

const SystemLogsPage: React.FC = () => {
  const [logs, setLogs] = useState<SystemLog[]>([]);
  const [filter, setFilter] = useState<string>('ALL');
  const scrollRef = useRef<HTMLDivElement>(null);

  const fetchLogs = async () => {
    const data = await getSystemLogs();
    setLogs(data);
  };

  useEffect(() => {
    fetchLogs();
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchLogs, 30000);
    return () => clearInterval(interval);
  }, []);

  const getModuleColor = (module: string) => {
    switch (module) {
      case 'AUTH': return 'text-yellow-400';
      case 'ROOMS': return 'text-green-400';
      case 'SYSTEM': return 'text-blue-400';
      case 'BOOKINGS': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  const filteredLogs = filter === 'ALL' ? logs : logs.filter(log => log.module === filter);

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Terminal className="w-6 h-6" /> System Logs
        </h2>
        <div className="flex gap-2">
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="bg-white border border-slate-300 text-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
          >
            <option value="ALL">All Modules</option>
            <option value="AUTH">Auth</option>
            <option value="ROOMS">Rooms</option>
            <option value="BOOKINGS">Bookings</option>
            <option value="SYSTEM">System</option>
          </select>
          <button 
            onClick={fetchLogs}
            className="p-2 text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            title="Refresh Logs"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 bg-[#1e1e1e] rounded-xl shadow-lg overflow-hidden border border-slate-700 flex flex-col font-mono text-sm">
        {/* Terminal Header */}
        <div className="bg-[#2d2d2d] px-4 py-2 border-b border-slate-700 flex items-center gap-2 select-none">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="ml-2 text-gray-400 text-xs">root@stayos-server:~/logs</span>
        </div>

        {/* Terminal Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar" ref={scrollRef}>
          {filteredLogs.length === 0 ? (
            <div className="text-gray-500 italic">No logs found...</div>
          ) : (
            filteredLogs.map((log) => (
              <div key={log.id} className="flex gap-3 hover:bg-[#2d2d2d] p-1 rounded transition-colors group">
                <span className="text-gray-500 shrink-0 select-none">
                  {new Date(log.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit' })}
                </span>
                <span className={`font-bold shrink-0 w-24 ${getModuleColor(log.module)}`}>
                  [{log.module}]
                </span>
                <span className="text-gray-300 flex-1">
                  <span className="text-blue-300 font-semibold mr-2">{log.action}:</span>
                  {log.details}
                </span>
                <span className="text-gray-600 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  by {log.userName}
                </span>
              </div>
            ))
          )}
          <div className="animate-pulse text-green-500 mt-2">_</div>
        </div>
      </div>
    </div>
  );
};

export default SystemLogsPage;
