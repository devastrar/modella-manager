import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2', contrastText: '#ffffff' },
    secondary: { main: '#dc004e', contrastText: '#ffffff' },
    background: { default: '#ffffff', paper: '#f5f5f5' },
    text: { primary: '#000000', secondary: '#555555' },
  },
  typography: { fontFamily: 'Roboto, sans-serif' },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#90caf9', contrastText: '#000000' },
    secondary: { main: '#f48fb1', contrastText: '#000000' },
    background: { default: '#121212', paper: '#1d1d1d' },
    text: { primary: '#ffffff', secondary: '#bbbbbb' },
  },
  typography: { fontFamily: 'Roboto, sans-serif' },
});

export const blueTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
  },
});

export const greenTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#4caf50' },
    secondary: { main: '#ff9800' },
  },
});