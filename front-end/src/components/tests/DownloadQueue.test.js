import { render, screen } from '@testing-library/react';
import axios from 'axios';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme } from '../../themes';
import DownloadQueue from '../DownloadQueue';

jest.mock('axios');

describe('DownloadQueue Component', () => {
  test('displays progress bar for downloading item', async () => {
    axios.get.mockResolvedValue({
      data: [{ id: 1, model: 'Test Model', status: 'started', progress: 50 }],
    });
    render(
      <ThemeProvider theme={lightTheme}>
        <DownloadQueue />
      </ThemeProvider>
    );
    expect(await screen.findByRole('progressbar')).toBeInTheDocument();
  });

  test('handles large file download completion', async () => {
    axios.get
      .mockResolvedValueOnce({
        data: [{ id: 1, model: 'Large Model', status: 'started', progress: 10 }],
      })
      .mockResolvedValueOnce({
        data: [{ id: 1, model: 'Large Model', status: 'completed' }],
      });
    render(
      <ThemeProvider theme={lightTheme}>
        <DownloadQueue />
      </ThemeProvider>
    );
    expect(await screen.findByText('Large Model - Completed')).toBeInTheDocument();
  });
});