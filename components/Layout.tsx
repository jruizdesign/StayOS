
import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useDemoMode } from '../context/DemoModeContext'; // Import useDemoMode
import { UserRole, NavItem } from '../types';
import { 
  LayoutDashboard, 
  BedDouble, 
  CalendarDays, 
  LogOut, 
  Settings, 
  SprayCan,
  ShieldCheck,
  Menu,
  X,
  PieChart
} from 'lucide-react';

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', path: '/', icon: LayoutDashboard, allowedRoles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.FRONT_DESK] },
  { label: 'Bookings', path: '/bookings', icon: CalendarDays, allowedRoles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.FRONT_DESK] },
  { label: 'Rooms', path: '/rooms', icon: BedDouble, allowedRoles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.FRONT_DESK, UserRole.HOUSEKEEPING] },
  { label: 'Housekeeping', path: '/housekeeping', icon: SprayCan, allowedRoles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.HOUSEKEEPING] },
  { label: 'Accounting', path: '/accounting', icon: PieChart, allowedRoles: [UserRole.ADMIN, UserRole.MANAGER] },
  { label: 'Settings', path: '/settings', icon: Settings, allowedRoles: [UserRole.ADMIN] },
];

const Layout: React.FC = () => {
  const { user, logout } = useAuth();
  const { isDemoMode, toggleDemoMode } = useDemoMode();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const filteredNavItems = NAV_ITEMS.filter(item => item.allowedRoles.includes(user.role));

  return (
    <div className="flex h-screen bg-slate-100 text-slate-800 font-sans overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0 flex flex-col
      `}>
        <div className="h-16 flex items-center justify-center border-b border-slate-700 bg-slate-950 shadow-md">
          <ShieldCheck className="w-8 h-8 text-blue-500 mr-2" />
          <h1 className="text-xl font-bold tracking-wider">STAYOS</h1>
        </div>

        <div className="p-4 border-b border-slate-800">
           <div className="flex items-center space-x-3">
             <img src={user.avatarUrl} alt="User" className="w-10 h-10 rounded-full border-2 border-slate-600" />
             <div>
               <p className="text-sm font-semibold">{user.name}</p>
               <p className="text-xs text-slate-400 capitalize">{user.role.replace('_', ' ')}</p>
             </div>
           </div>
           {/* Demo Mode Toggle */}
           <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-300">Demo Mode</span>
              <label htmlFor="demo-toggle" className="relative inline-flex items-center cursor-pointer">
                  <input 
                      type="checkbox" 
                      id="demo-toggle" 
                      className="sr-only peer" 
                      checked={isDemoMode} 
                      onChange={toggleDemoMode} 
                  />
                  <div className="w-11 h-6 bg-slate-700 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {filteredNavItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-blue-600 text-white shadow-lg' 
                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`
                  }
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6 z-10">
            <button 
              className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X /> : <Menu />}
            </button>
            
            <div className="ml-auto flex items-center space-x-4">
              <span className="text-xs font-mono bg-green-100 text-green-700 px-2 py-1 rounded">System Online</span>
              <span className="text-xs font-mono bg-blue-50 text-blue-700 px-2 py-1 rounded">Property: Downtown Grand</span>
            </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-50 relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
