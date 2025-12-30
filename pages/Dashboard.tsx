import React, { useEffect, useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import StatCard from '../components/StatCard';
import { DollarSign, Users, BedDouble, CalendarCheck } from 'lucide-react';
import { getRecentRevenue } from '../services/dataService';

const Dashboard: React.FC = () => {
  const [revenueData, setRevenueData] = useState<{date: string, amount: number}[]>([]);

  useEffect(() => {
    getRecentRevenue().then(setRevenueData);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Dashboard Overview</h2>
        <div className="text-sm text-slate-500">Last updated: Just now</div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Revenue" 
          value="$12,450" 
          change="12%" 
          isPositive={true} 
          icon={DollarSign}
          colorClass="text-green-600 bg-green-600"
        />
        <StatCard 
          title="Occupancy Rate" 
          value="78%" 
          change="5%" 
          isPositive={true} 
          icon={BedDouble}
          colorClass="text-blue-600 bg-blue-600"
        />
         <StatCard 
          title="New Bookings" 
          value="24" 
          change="2%" 
          isPositive={false} 
          icon={CalendarCheck}
          colorClass="text-purple-600 bg-purple-600"
        />
        <StatCard 
          title="Guests In-House" 
          value="142" 
          change="8%" 
          isPositive={true} 
          icon={Users}
          colorClass="text-orange-600 bg-orange-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Revenue Trend (Last 7 Days)</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} prefix="$" />
                <Tooltip 
                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Area 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorPv)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Recent Activity</h3>
            <div className="space-y-6">
                {[
                    { text: 'Room 304 checked out', time: '10 mins ago', type: 'out' },
                    { text: 'New booking from Expedia', time: '25 mins ago', type: 'book' },
                    { text: 'Housekeeping requested Room 201', time: '1 hour ago', type: 'clean' },
                    { text: 'Room 105 checked in', time: '2 hours ago', type: 'in' },
                ].map((item, i) => (
                    <div key={i} className="flex items-start space-x-3">
                        <div className={`w-2 h-2 mt-2 rounded-full ${
                            item.type === 'out' ? 'bg-orange-400' :
                            item.type === 'in' ? 'bg-green-400' :
                            item.type === 'clean' ? 'bg-red-400' : 'bg-blue-400'
                        }`} />
                        <div>
                            <p className="text-sm text-slate-700 font-medium">{item.text}</p>
                            <p className="text-xs text-slate-400">{item.time}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button className="w-full mt-6 py-2 text-sm text-blue-600 font-medium bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                View All Activity
            </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;