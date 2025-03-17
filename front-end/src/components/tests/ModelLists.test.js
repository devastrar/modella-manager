import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme } from '../../themes';
import ModelLists from '../ModelLists';

jest.mock('axios');

describe('ModelLists Component', () => {
  test('displays model lists', async () => {
    const mockLists = [{ id: '1', name: 'List 1', models: [] }];
    axios.get.mockResolvedValue({ data: { lists: mockLists } });
    render(
      <ThemeProvider theme={lightTheme}>
        <ModelLists />
      </ThemeProvider>
    );
    const list1 = await screen.findByText('List 1');
    expect(list1).toBeInTheDocument();
  });

  test('creates a new list', async () => {
    const mockLists = [{ id: '1', name: 'List 1', models: [] }];
    axios.get.mockResolvedValue({ data: { lists: mockLists } });
    axios.post.mockResolvedValue({ data: { id: '2', name: 'New List', models: [] } });
    render(
      <ThemeProvider theme={lightTheme}>
        <ModelLists />
      </ThemeProvider>
    );
    const input = screen.getByLabelText('New List Name');
    fireEvent.change(input, { target: { value: 'New List' } });
    const createButton = screen.getByText('Create List');
    fireEvent.click(createButton);
    expect(axios.post).toHaveBeenCalledWith(
      `${process.env.REACT_APP_API_URL}/api/lists`,
      { name: 'New List' },
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
    );
  });
});