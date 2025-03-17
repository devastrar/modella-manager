import React, { createContext, useState, useContext } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from '../themes';

// Create a context for theme management
const ThemeContext = createContext();

// Custom hook to access the theme context
export const useTheme = () => useContext(ThemeContext);

// Theme provider component to wrap the application
export const ThemeProviderWrapper = ({ children }) => {
  const [theme, setTheme] = useState('dark'); // Default theme is 'dark'

  // Select the appropriate theme object based on the current theme state
  const appliedTheme = theme === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ThemeProvider theme={appliedTheme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
