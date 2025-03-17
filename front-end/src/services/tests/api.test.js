import axios from 'axios';
import api from '../../services/api';
import { toast } from 'react-toastify';

jest.mock('axios');
jest.mock('react-toastify', () => ({ toast: { error: jest.fn() } }));

describe('API Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('handles 429 rate limit error with retry', async () => {
    axios.get.mockRejectedValueOnce({
      response: { status: 429, headers: { 'retry-after': 1 } },
    });
    axios.get.mockResolvedValueOnce({ data: { success: true } });

    const response = await api.get('/test-endpoint');
    expect(axios.get).toHaveBeenCalledTimes(2);
    expect(response.data).toEqual({ success: true });
  });

  test('handles 404 error', async () => {
    axios.get.mockRejectedValueOnce({ response: { status: 404 } });
    await expect(api.get('/test-endpoint')).rejects.toThrow();
    expect(toast.error).toHaveBeenCalledWith('Resource not found');
  });

  test('handles network error', async () => {
    axios.get.mockRejectedValueOnce({ request: {} });
    await expect(api.get('/test-endpoint')).rejects.toThrow();
    expect(toast.error).toHaveBeenCalledWith('Network error, please check your connection');
  });

  test('handles invalid JSON response', async () => {
    axios.get.mockResolvedValueOnce({ data: 'invalid json' });
    const response = await api.get('/test-endpoint');
    expect(response.data).toBe('invalid json'); // Ensure no crash
  });
});