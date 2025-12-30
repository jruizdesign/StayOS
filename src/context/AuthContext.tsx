import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole } from '../types';
import { logAction } from '../services/dataService';

interface AuthContextType {
  user: User | null;
  login: (role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (role: UserRole) => {
    // Mock login logic
    const mockUser: User = {
      id: 'u_1',
      name: 'Alex Employee',
      email: 'alex@stayos.com',
      role: role,
      avatarUrl: 'https://picsum.photos/200/200',
    };
    setUser(mockUser);
    
    // Log the login action
    logAction('LOGIN', `User logged in as ${role}`, 'AUTH', { id: mockUser.id, name: mockUser.name });
  };

  const logout = () => {
    if (user) {
        logAction('LOGOUT', `User ${user.name} logged out`, 'AUTH', { id: user.id, name: user.name });
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
