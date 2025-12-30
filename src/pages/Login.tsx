import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { ShieldCheck, User, KeyRound } from 'lucide-react';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (role: UserRole) => {
    login(role);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-8 bg-slate-50 border-b border-slate-100 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg">
                <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800">StayOS PMS</h1>
            <p className="text-slate-500 mt-2">Secure Property Management Access</p>
        </div>

        <div className="p-8">
            <p className="text-center text-sm text-slate-500 mb-6">Select a demo role to proceed:</p>
            
            <div className="space-y-3">
                <button
                    onClick={() => handleLogin(UserRole.MANAGER)}
                    className="w-full flex items-center p-4 border border-slate-200 rounded-xl hover:bg-blue-50 hover:border-blue-200 transition-all group"
                >
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <KeyRound className="w-5 h-5" />
                    </div>
                    <div className="ml-4 text-left">
                        <p className="font-semibold text-slate-800">General Manager</p>
                        <p className="text-xs text-slate-500">Full Access</p>
                    </div>
                </button>

                <button
                    onClick={() => handleLogin(UserRole.FRONT_DESK)}
                    className="w-full flex items-center p-4 border border-slate-200 rounded-xl hover:bg-purple-50 hover:border-purple-200 transition-all group"
                >
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                        <User className="w-5 h-5" />
                    </div>
                    <div className="ml-4 text-left">
                        <p className="font-semibold text-slate-800">Front Desk</p>
                        <p className="text-xs text-slate-500">Bookings & Guests</p>
                    </div>
                </button>

                <button
                    onClick={() => handleLogin(UserRole.HOUSEKEEPING)}
                    className="w-full flex items-center p-4 border border-slate-200 rounded-xl hover:bg-green-50 hover:border-green-200 transition-all group"
                >
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
                        <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div className="ml-4 text-left">
                        <p className="font-semibold text-slate-800">Housekeeping</p>
                        <p className="text-xs text-slate-500">Room Status Only</p>
                    </div>
                </button>
            </div>
        </div>
        
        <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 text-center text-xs text-slate-400">
            Powered by Google Gemini AI & React
        </div>
      </div>
    </div>
  );
};

export default Login;