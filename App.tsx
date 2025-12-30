import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';
import Rooms from './pages/Rooms';
import Housekeeping from './pages/Housekeeping';
import Accounting from './pages/Accounting';
import Login from './pages/Login';
import AIAssistant from './components/AIAssistant';

// Private Route Wrapper
const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const AppContent: React.FC = () => {
    const { isAuthenticated } = useAuth();

    return (
        <>
            <Routes>
                <Route path="/login" element={<Login />} />
                
                <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
                    <Route index element={<Dashboard />} />
                    <Route path="bookings" element={<Bookings />} />
                    <Route path="rooms" element={<Rooms />} />
                    <Route path="housekeeping" element={<Housekeeping />} />
                    <Route path="accounting" element={<Accounting />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Route>
            </Routes>
            {isAuthenticated && <AIAssistant />}
        </>
    );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </AuthProvider>
  );
};

export default App;