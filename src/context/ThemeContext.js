import React, { createContext, useContext } from 'react';

const colors = {
  background: '#F7F4EF',
  foreground: '#1A3328',
  primary: '#1B5E3B',
  'primary-foreground': '#F7F4EF',
  secondary: '#C4A265',
  card: '#FFFFFF',
  muted: '#EDE9E2',
  'muted-foreground': '#7A8E86',
  border: '#E5DFD6',
  destructive: '#EF4444'
};

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  return (
    <ThemeContext.Provider value={{ colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
