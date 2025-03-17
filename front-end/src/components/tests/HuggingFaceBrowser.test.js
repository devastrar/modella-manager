import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme } from '../../themes';
import HuggingFaceBrowser from '../HuggingFaceBrowser';

jest.mock('axios');

describe('HuggingFaceBrowser Component', () => {
  test('displays Hugging Face models', async () => {
    const mockTreeData = [{ id: '1', name: 'Model 1' }];
    axios.get.mockResolvedValue({ data: mockTreeData });
    render(
      <ThemeProvider theme={lightTheme}>
        <HuggingFaceBrowser />
      </ThemeProvider>
    );
    const model1 = await screen.findByText('Model 1');
    expect(model1).toBeInTheDocument();
  });

  test('downloads selected models', async () => {
    const mockTreeData = [{ id: '1', name: 'Model 1' }];
    axios.get.mockResolvedValue({ data: mockTreeData });
    axios.post.mockResolvedValue({});
    render(
      <ThemeProvider theme={lightTheme}>
        <HuggingFaceBrowser />
      </ThemeProvider>
    );
    const downloadButton = await screen.findByText('Download Selected');
    fireEvent.click(downloadButton);
    expect(axios.post).toHaveBeenCalledWith(
      `${process.env.REACT_APP_API_URL}/api/download/huggingface`,
      { models: [{ id: '1', name: 'Model 1' }] },
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
    );
  });
});