import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme } from '../../themes';
import Dashboard from '../Dashboard';

describe('Dashboard Component', () => {
  const setTheme = jest.fn();

  test('renders without crashing', () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <MemoryRouter>
          <Dashboard setTheme={setTheme} />
        </MemoryRouter>
      </ThemeProvider>
    );
  });

  test('displays the dashboard title', () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <MemoryRouter>
          <Dashboard setTheme={setTheme} />
        </MemoryRouter>
      </ThemeProvider>
    );
    const titleElement = screen.getByText('Dashboard');
    expect(titleElement).toBeInTheDocument();
  });

  test('displays all navigation cards', () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <MemoryRouter>
          <Dashboard setTheme={setTheme} />
        </MemoryRouter>
      </ThemeProvider>
    );
    expect(screen.getByText('Browse Models')).toBeInTheDocument();
    expect(screen.getByText('Download Queue')).toBeInTheDocument();
    expect(screen.getByText('Disk Usage')).toBeInTheDocument();
    expect(screen.getByText('Model Lists')).toBeInTheDocument();
    expect(screen.getByText('Local Models')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    const goButtons = screen.getAllByText('Go');
    expect(goButtons).toHaveLength(6);
  });

  test('navigation buttons link to correct routes', () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <MemoryRouter>
          <Dashboard setTheme={setTheme} />
        </MemoryRouter>
      </ThemeProvider>
    );
    const links = screen.getAllByRole('link', { name: /go/i });
    expect(links[0]).toHaveAttribute('href', '/browse');
    expect(links[1]).toHaveAttribute('href', '/queue');
    expect(links[2]).toHaveAttribute('href', '/disk-usage');
    expect(links[3]).toHaveAttribute('href', '/lists');
    expect(links[4]).toHaveAttribute('href', '/local-models');
    expect(links[5]).toHaveAttribute('href', '/settings');
  });
});