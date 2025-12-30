
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

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
