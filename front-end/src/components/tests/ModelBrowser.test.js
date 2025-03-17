import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme } from '../../themes';
import ModelBrowser from '../ModelBrowser';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

jest.mock('axios');

describe('ModelBrowser Component', () => {
  const mockT = (key) => key; // Simple mock for translation
  jest.spyOn(require('react-i18next'), 'useTranslation').mockReturnValue({ t: mockT });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders without crashing', () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <MemoryRouter>
          <ModelBrowser />
        </MemoryRouter>
      </ThemeProvider>
    );
    expect(screen.getByLabelText('searchModels')).toBeInTheDocument();
  });

  test('handles search', async () => {
    axios.get.mockResolvedValue({ data: { items: [], metadata: {} } });
    render(
      <ThemeProvider theme={lightTheme}>
        <MemoryRouter>
          <ModelBrowser />
        </MemoryRouter>
      </ThemeProvider>
    );
    const searchInput = screen.getByLabelText('searchModels');
    fireEvent.change(searchInput, { target: { value: 'test' } });
    fireEvent.keyPress(searchInput, { key: 'Enter', code: 'Enter', charCode: 13 });
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        'https://civitai.com/api/v1/models?query=test',
        expect.any(Object)
      );
    });
  });

  test('handles API failure', async () => {
    axios.get.mockRejectedValue(new Error('API Error'));
    render(
      <ThemeProvider theme={lightTheme}>
        <MemoryRouter>
          <ModelBrowser />
        </MemoryRouter>
      </ThemeProvider>
    );
    await waitFor(() => {
      expect(screen.getByText('fetchModelsError')).toBeInTheDocument();
    });
  });

  test('handles rate limit error', async () => {
    axios.get.mockRejectedValue({ response: { status: 429, headers: { 'retry-after': '1' } } });
    render(
      <ThemeProvider theme={lightTheme}>
        <MemoryRouter>
          <ModelBrowser />
        </MemoryRouter>
      </ThemeProvider>
    );
    await waitFor(() => {
      expect(screen.getByText('fetchModelsError')).toBeInTheDocument();
    });
  });
});