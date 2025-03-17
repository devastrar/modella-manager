import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import { Tree } from 'react-arborist';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Button, Dialog, DialogTitle, DialogActions, List, ListItem, ListItemText, TextField } from '@mui/material';
import hfPackages from '../assets/hf-packages.json'; // Import static JSON

// HuggingFaceBrowser component for browsing Hugging Face models
const HuggingFaceBrowser = () => {
  const { t } = useTranslation(); // Internationalization hook
  const [selectedModels, setSelectedModels] = useState([]); // Selected models
  const [openDialog, setOpenDialog] = useState(false); // Dialog state for adding to list
  const [lists, setLists] = useState([]); // User lists
  const [selectedList, setSelectedList] = useState(null); // Selected list ID
  const [downloadPath, setDownloadPath] = useState('/default/path'); // State for custom download path (User Story 32)

  // Transform hf-packages.json into a tree structure grouped by ModelCategory (User Story 6)
  const treeData = useMemo(() => {
    return hfPackages.reduce((acc, model) => {
      const category = model.ModelCategory;
      const existingCategory = acc.find((node) => node.id === category);
      if (existingCategory) {
        existingCategory.children.push({
          id: model.ModelName,
          name: model.ModelName,
          data: model, // Store full model data for download/list actions
        });
      } else {
        acc.push({
          id: category,
          name: category,
          children: [
            {
              id: model.ModelName,
              name: model.ModelName,
              data: model,
            },
          ],
        });
      }
      return acc;
    }, []);
  }, []);

  // Fetch user lists
  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/lists`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setLists(response.data.lists);
      } catch (err) {
        toast.error(t('fetchListsError', 'Failed to fetch lists'));
      }
    };
    fetchLists();
  }, [t]);

  // Handle tree node selection (select only leaf nodes, i.e., models)
  const handleSelect = (nodes) => {
    setSelectedModels(nodes.filter((node) => !node.children).map((node) => node.data));
  };

  // Initiate download of selected models with custom path (User Story 32)
  const handleDownload = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/download/huggingface`,
        { models: selectedModels, path: downloadPath }, // Include path in payload
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      toast.success(t('downloadStarted', 'Started downloading selected models'));
    } catch (err) {
      toast.error(t('downloadError', 'Failed to start downloading selected models'));
    }
  };

  // Add selected models to a list
  const handleAddToList = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/lists/${selectedList}/add`,
        { modelIds: selectedModels.map((m) => m.ModelName) }, // Use ModelName as identifier
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      toast.success(t('addedToList', 'Models added to list'));
      setOpenDialog(false);
      setSelectedModels([]);
    } catch (err) {
      toast.error(t('addToListError', 'Failed to add models to list'));
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>{t('huggingFaceBrowser', 'Hugging Face Models')}</h2>
      <TextField
        label={t('downloadPath', 'Download Path')}
        value={downloadPath}
        onChange={(e) => setDownloadPath(e.target.value)}
        style={{ marginBottom: '10px', width: '100%' }}
      />
      <Tree
        data={treeData}
        onSelect={handleSelect}
        width={600}
        height={400}
        indent={24}
        rowHeight={36}
        aria-label={t('huggingFaceTree', 'Hugging Face Model Tree')}
      />
      <Button
        onClick={handleDownload}
        disabled={selectedModels.length === 0}
        variant="contained"
        color="primary"
        aria-label={t('downloadSelected', 'Download Selected')}
      >
        {t('downloadSelected', 'Download Selected')}
      </Button>
      <Button
        onClick={() => setOpenDialog(true)}
        disabled={selectedModels.length === 0}
        variant="contained"
        color="secondary"
        style={{ marginLeft: '10px' }}
        aria-label={t('addToList', 'Add to List')}
      >
        {t('addToList', 'Add to List')}
      </Button>
      {/* Dialog for selecting a list */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{t('selectList', 'Select List')}</DialogTitle>
        <List>
          {lists.map((list) => (
            <ListItem button onClick={() => setSelectedList(list.id)} key={list.id}>
              <ListItemText primary={list.name} />
            </ListItem>
          ))}
        </List>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>{t('cancel', 'Cancel')}</Button>
          <Button onClick={handleAddToList} disabled={!selectedList} color="primary">
            {t('add', 'Add')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default HuggingFaceBrowser;