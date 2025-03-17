import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme } from '../../themes';
import ModelDetails from '../ModelDetails';

jest.mock('axios');

describe('ModelDetails Component', () => {
  test('displays model details', async () => {
    const mockModel = {
      name: 'Model 1',
      versions: [{ id: '1', version_name: 'Version 1', file_size: 100 }],
    };
    axios.get.mockResolvedValue({ data: mockModel });
    render(
      <ThemeProvider theme={lightTheme}>
        <ModelDetails />
      </ThemeProvider>
    );
    const modelName = await screen.findByText('Model 1');
    expect(modelName).toBeInTheDocument();
  });

  test('installs selected versions', async () => {
    const mockModel = {
      name: 'Model 1',
      versions: [{ id: '1', version_name: 'Version 1', file_size: 100 }],
    };
    axios.get.mockResolvedValue({ data: mockModel });
    axios.post.mockResolvedValue({});
    render(
      <ThemeProvider theme={lightTheme}>
        <ModelDetails />
      </ThemeProvider>
    );
    const installButton = await screen.findByText('Install Selected');
    fireEvent.click(installButton);
    expect(axios.post).toHaveBeenCalledWith(
      `${process.env.REACT_APP_API_URL}/api/download`,
      { modelId: '1', versionIds: ['1'], type: undefined, baseModel: undefined },
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
    );
  });
});