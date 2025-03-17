import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme } from '../../themes';
import LocalModels from '../LocalModels';

jest.mock('axios');

describe('LocalModels Component', () => {
  test('displays local models', async () => {
    const mockTreeData = [{ id: '1', name: 'Model 1', size: 100 }];
    axios.get.mockResolvedValue({ data: mockTreeData });
    render(
      <ThemeProvider theme={lightTheme}>
        <LocalModels />
      </ThemeProvider>
    );
    const model1 = await screen.findByText('Model 1 (100.00 MB)');
    expect(model1).toBeInTheDocument();
  });

  test('deletes a local model', async () => {
    const mockTreeData = [{ id: '1', name: 'Model 1', size: 100 }];
    axios.get.mockResolvedValue({ data: mockTreeData });
    axios.delete.mockResolvedValue({});
    render(
      <ThemeProvider theme={lightTheme}>
        <LocalModels />
      </ThemeProvider>
    );
    const deleteButton = await screen.findByText('Delete');
    fireEvent.click(deleteButton);
    expect(axios.delete).toHaveBeenCalledWith(
      `${process.env.REACT_APP_API_URL}/local-models/undefined/1`,
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
    );
  });
});