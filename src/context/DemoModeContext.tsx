import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { resetDemoData } from '../services/dataService';

interface DemoModeContextType {
  isDemoMode: boolean;
  toggleDemoMode: () => void;
}

const DemoModeContext = createContext<DemoModeContextType | undefined>(undefined);

export const DemoModeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDemoMode, setIsDemoMode] = useState(() => {
    // Initialize state from localStorage, defaulting to true (demo mode on)
    return localStorage.getItem('isDemoMode') !== 'false';
  });

  const toggleDemoMode = () => {
    const newIsDemoMode = !isDemoMode;
    localStorage.setItem('isDemoMode', String(newIsDemoMode));
    setIsDemoMode(newIsDemoMode);
    
    // If we are switching TO demo mode (or toggling in general where we might want a clean slate),
    // or if the intention is to reset when coming OUT of demo mode (which implies re-fetching real data),
    // resetting the mock data ensures that if we go back to demo mode, it starts fresh.
    // However, the user specifically asked to "reset the accounting portion as well when it comes out of demo mode".
    // "Coming out of demo mode" usually means switching to real data. 
    // If the request implies resetting the *mock* data so that next time demo mode is entered it's fresh,
    // OR if it means clearing some local state that might persist.
    // Given the previous context (resetting rooms/bookings), it likely means resetting the mock stores.
    
    if (newIsDemoMode) {
        resetDemoData();
    }
    
    window.location.reload(); // Refresh to apply changes
  };

  return (
    <DemoModeContext.Provider value={{ isDemoMode, toggleDemoMode }}>
      {children}
    </DemoModeContext.Provider>
  );
};

export const useDemoMode = () => {
  const context = useContext(DemoModeContext);
  if (context === undefined) {
    throw new Error('useDemoMode must be used within a DemoModeProvider');
  }
  return context;
};
