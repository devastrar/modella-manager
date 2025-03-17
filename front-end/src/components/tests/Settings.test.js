import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme } from '../../themes';
import Settings from '../Settings';

jest.mock('axios');

describe('Settings Component', () => {
  test('displays settings form', () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <Settings />
      </ThemeProvider>
    );
    const apiKeyInput = screen.getByLabelText('API Key');
    const storagePathInput = screen.getByLabelText('Model Storage Path');
    const languageSelect = screen.getByLabelText('Language');
    const themeSelect = screen.getByLabelText('Theme');
    expect(apiKeyInput).toBeInTheDocument();
    expect(storagePathInput).toBeInTheDocument();
    expect(languageSelect).toBeInTheDocument();
    expect(themeSelect).toBeInTheDocument();
  });

  test('saves settings', async () => {
    axios.post.mockResolvedValue({});
    render(
      <ThemeProvider theme={lightTheme}>
        <Settings />
      </ThemeProvider>
    );
    const apiKeyInput = screen.getByLabelText('API Key');
    fireEvent.change(apiKeyInput, { target: { value: 'test-api-key' } });
    const storagePathInput = screen.getByLabelText('Model Storage Path');
    fireEvent.change(storagePathInput, { target: { value: '/workspace/models' } });
    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);
    expect(axios.post).toHaveBeenCalledWith(
      `${process.env.REACT_APP_API_URL}/api/settings`,
      { apiKey: 'test-api-key', storagePath: '/workspace/models' },
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
    );
  });
});