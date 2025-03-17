import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

/**
 * ModelLists component allows users to create, view, and delete custom lists of models.
 * Supports User Story #34: "Add a model selection to a saved, user-named list/template" and #35: "Import or remove an entire list/template."
 */
const ModelLists = () => {
  const { t } = useTranslation(); // Hook for internationalization (User Story #47)
  const [lists, setLists] = useState([]); // State to hold the list of custom lists
  const [newListName, setNewListName] = useState(''); // State for new list name input
  const [loading, setLoading] = useState(true); // State to manage loading indicator

  useEffect(() => {
    /**
     * Fetches the list of custom lists from the back-end endpoint `/api/lists`.
     */
    const fetchLists = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/lists`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }, // Secure API call (User Story #49)
        });
        setLists(response.data.lists);
      } catch (err) {
        toast.error(t('fetchError', 'Failed to fetch model lists')); // User-friendly error (User Story #42)
      } finally {
        setLoading(false);
      }
    };
    fetchLists();
  }, [t]);

  /**
   * Creates a new custom list with the provided name via the back-end endpoint `/api/lists`.
   * Supports User Story #34.
   */
  const handleCreateList = async () => {
    if (!newListName) return;
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/lists`,
        { name: newListName },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setLists([...lists, response.data]);
      setNewListName('');
      toast.success(t('listCreated', 'List created successfully'));
    } catch (err) {
      toast.error(t('createError', 'Failed to create list')); // User-friendly error (User Story #42)
    }
  };

  /**
   * Deletes a specified custom list via the back-end endpoint `/api/lists/{listId}`.
   * Supports User Story #35 for removal of lists.
   * @param {string} listId - The ID of the list to delete.
   */
  const handleDeleteList = async (listId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/lists/${listId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setLists(lists.filter((list) => list.id !== listId));
      toast.success(t('listDeleted', 'List deleted successfully'));
    } catch (err) {
      toast.error(t('deleteError', 'Failed to delete list')); // User-friendly error (User Story #42)
    }
  };

  if (loading) return <CircularProgress />; // Visual feedback during loading (User Story #45)

  return (
    <div style={{ padding: '20px' }}>
      <TextField
        label={t('newListName', 'New List Name')}
        value={newListName}
        onChange={(e) => setNewListName(e.target.value)}
        variant="outlined"
        style={{ marginBottom: '16px' }}
        inputProps={{ 'aria-label': t('newListName', 'New List Name') }} // Accessibility (User Story #57)
      />
      <Button variant="contained" color="primary" onClick={handleCreateList}>
        {t('createList', 'Create List')}
      </Button>
      <List>
        {lists.map((list) => (
          <ListItem key={list.id}>
            <ListItemText primary={list.name} secondary={`${list.models.length} models`} />
            <IconButton
              onClick={() => handleDeleteList(list.id)}
              aria-label={`${t('delete', 'Delete')} ${list.name}`} // Accessibility (User Story #57)
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ModelLists;