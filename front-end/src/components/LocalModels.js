import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tree } from 'react-arborist';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Button, CircularProgress } from '@mui/material';

// LocalModels component to display and manage local model files
const LocalModels = () => {
  const { t } = useTranslation(); // Internationalization hook
  const [treeData, setTreeData] = useState([]); // Tree structure of local models
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch local models tree structure
  useEffect(() => {
    const fetchLocalModels = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/local-models/tree`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setTreeData(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        toast.error(t('fetchError', 'Failed to fetch local models'));
        setTreeData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchLocalModels();
  }, [t]);

  // Handle model deletion
  const handleDelete = async (model) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/uninstall`,
        { source: model.source, identifier: model.identifier, file_name: model.name },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      toast.success(t('modelDeleted', 'Model deleted successfully'));
      // Refresh tree data
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/local-models/tree`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setTreeData(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      toast.error(t('deleteError', 'Failed to delete model'));
    }
  };

  // Custom node renderer for the tree
  const Node = ({ node, style, dragHandle }) => (
    <div style={style} ref={dragHandle}>
      <span>{node.data.name} ({node.data.size.toFixed(2)} MB)</span>
      {!node.children && (
        <Button
          onClick={() => handleDelete(node.data)}
          color="error"
          aria-label={`${t('delete', 'Delete')} ${node.data.name}`}
        >
          {t('delete', 'Delete')}
        </Button>
      )}
    </div>
  );

  // Loading and empty states
  if (loading) return <CircularProgress />;
  if (!treeData.length) return <p>{t('noLocalModels', 'No local models found.')}</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>{t('localModels', 'Local Models')}</h2>
      <Tree
        data={treeData}
        width={600}
        height={400}
        indent={24}
        rowHeight={36}
        renderNode={Node}
        aria-label={t('localModelsTree', 'Local Models Tree')}
      />
    </div>
  );
};

export default LocalModels;