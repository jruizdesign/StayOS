import React, { useEffect, useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import StatCard from '../components/StatCard';
import { DollarSign, TrendingDown, TrendingUp, CreditCard } from 'lucide-react';
import { getFinancialSummary, getTransactions } from '../services/dataService';
import { Transaction } from '../types';

const Accounting: React.FC = () => {
  const [financialData, setFinancialData] = useState<{month: string, income: number, expense: number}[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    getFinancialSummary().then(setFinancialData);
    getTransactions().then(setTransactions);
  }, []);

  const totalRevenue = financialData.reduce((acc, curr) => acc + curr.income, 0);
  const totalExpenses = financialData.reduce((acc, curr) => acc + curr.expense, 0);
  const netProfit = totalRevenue - totalExpenses;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Financial Overview</h2>
        <div className="flex space-x-2">
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">Export Report</button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm shadow-blue-200">New Invoice</button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="YTD Revenue" 
          value={`$${(totalRevenue / 1000).toFixed(1)}k`} 
          change="18%" 
          isPositive={true} 
          icon={TrendingUp}
          colorClass="text-green-600 bg-green-600"
        />
        <StatCard 
          title="YTD Expenses" 
          value={`$${(totalExpenses / 1000).toFixed(1)}k`} 
          change="5%" 
          isPositive={false} 
          icon={TrendingDown}
          colorClass="text-red-600 bg-red-600"
        />
        <StatCard 
          title="Net Profit" 
          value={`$${(netProfit / 1000).toFixed(1)}k`} 
          change="24%" 
          isPositive={true} 
          icon={DollarSign}
          colorClass="text-blue-600 bg-blue-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cash Flow Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Cash Flow Analysis</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={financialData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} prefix="$" />
                <Tooltip 
                    cursor={{fill: '#f1f5f9'}}
                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Legend iconType="circle" />
                <Bar dataKey="income" name="Income" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expense" name="Expense" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Recent Transactions</h3>
            <div className="overflow-y-auto max-h-[320px] space-y-4">
                {transactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors border border-slate-50 hover:border-slate-100">
                        <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-full ${tx.type === 'INCOME' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                <CreditCard className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-800">{tx.description}</p>
                                <p className="text-xs text-slate-400">{tx.date} • {tx.category}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className={`text-sm font-bold ${tx.type === 'INCOME' ? 'text-green-600' : 'text-slate-800'}`}>
                                {tx.type === 'INCOME' ? '+' : '-'}${tx.amount}
                            </p>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded ${tx.status === 'COMPLETED' ? 'bg-slate-100 text-slate-500' : 'bg-amber-50 text-amber-600'}`}>
                                {tx.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <button className="w-full mt-4 py-2 text-sm text-slate-600 hover:text-blue-600 font-medium border-t border-slate-100 transition-colors">
                View All Transactions
            </button>
        </div>
      </div>
    </div>
  );
};

export default Accounting;