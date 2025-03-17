import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme } from '../../themes';
import DiskUsage from '../DiskUsage';

jest.mock('axios');

describe('DiskUsage Component', () => {
  test('displays disk usage with pie chart by default', async () => {
    const mockUsage = {
      civitai: 50,
      huggingface: 30,
      total: 80,
      by_model: { 'SD 1.5': 40, 'Flux.1 D': 20 },
      by_type: { 'Checkpoint': 60, 'LORA': 10 },
    };
    axios.get.mockResolvedValue({ data: mockUsage });
    render(
      <ThemeProvider theme={lightTheme}>
        <DiskUsage />
      </ThemeProvider>
    );
    const totalElement = await screen.findByText(/Total: 80\.00 GB/);
    expect(totalElement).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument(); // Pie chart
  });

  test('toggles to bar chart', async () => {
    const mockUsage = {
      civitai: 50,
      huggingface: 30,
      total: 80,
      by_model: { 'SD 1.5': 40, 'Flux.1 D': 20 },
      by_type: { 'Checkpoint': 60, 'LORA': 10 },
    };
    axios.get.mockResolvedValue({ data: mockUsage });
    render(
      <ThemeProvider theme={lightTheme}>
        <DiskUsage />
      </ThemeProvider>
    );
    const barButton = screen.getByText('Bar Chart');
    fireEvent.click(barButton);
    expect(screen.getByRole('img')).toBeInTheDocument(); // Bar chart
  });
});