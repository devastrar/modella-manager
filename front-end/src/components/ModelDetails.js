import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Grid, Typography, Checkbox, Button, Pagination, IconButton, Tooltip, Box } from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { useTranslation } from 'react-i18next';
import { fetchCivitaiModelDetails, initiateDownload } from '../services/api';
import api from '../services/api';

const ModelDetails = () => {
  const { t } = useTranslation();
  const { modelId } = useParams();
  const [model, setModel] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState({});
  const [page, setPage] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const versionsPerPage = 10;

  useEffect(() => {
    const fetchModel = async () => {
      try {
        const response = await fetchCivitaiModelDetails(modelId);
        setModel(response);
      } catch (error) {
        toast.error(t('fetchModelError', 'Failed to fetch model details.'));
      }
    };
    fetchModel();
  }, [modelId, t]);

  const handleDelete = async () => {
    try {
      await api.delete(`/api/models/remove/${modelId}`);
      toast.success(t('modelDeleted', 'Model deleted successfully'));
      // Redirect or update state as needed
    } catch (error) {
      toast.error(t('deleteError', 'Failed to delete model'));
    }
  };

  const handleCheckboxChange = (versionId, fileId) => {
    setSelectedFiles((prev) => ({
      ...prev,
      [versionId]: prev[versionId]?.includes(fileId)
        ? prev[versionId].filter((id) => id !== fileId)
        : [...(prev[versionId] || []), fileId],
    }));
  };

  const handleDownload = async () => {
    try {
      const downloadData = Object.entries(selectedFiles).flatMap(([versionId, fileIds]) =>
        fileIds.map((fileId) => ({
          modelId,
          versionId,
          fileId,
        }))
      );
      await initiateDownload(downloadData);
      toast.success(t('downloadStarted', 'Download started'));
    } catch (error) {
      toast.error(t('downloadError', 'Failed to start download'));
    }
  };

  if (!model) return <p>{t('loading', 'Loading...')}</p>;

  const versions = model.modelVersions || [];
  const paginatedVersions = versions.slice((page - 1) * versionsPerPage, page * versionsPerPage);
  const allImages = versions.flatMap(v => v.images || []);

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4">{model.name}</Typography>
      <Typography variant="body1">Tags: {model.tags?.join(', ') || 'None'}</Typography>
      <Button variant="contained" color="secondary" onClick={handleDelete}>
        {t('delete', 'Delete Model')}
      </Button>
      {allImages.length > 0 && (
        <Box mt={2}>
          <img src={allImages[currentImageIndex].url} alt="Model preview" style={{ maxWidth: '100%' }} />
          <Box>
            <Button onClick={() => setCurrentImageIndex((prev) => Math.max(0, prev - 1))}>{t('prev')}</Button>
            <Button onClick={() => setCurrentImageIndex((prev) => Math.min(allImages.length - 1, prev + 1))}>{t('next')}</Button>
          </Box>
        </Box>
      )}
      {paginatedVersions.map((version) => (
        <Grid item xs={12} key={version.id}>
          <Typography variant="h6">{version.name}</Typography>
          <Typography>Base Model: {version.baseModel || 'Unknown'}</Typography>
          <Typography>Trained Words: {version.trainedWords?.join(', ') || 'None'}</Typography>
          {version.files.map((file) => (
            <Box key={file.id} display="flex" alignItems="center">
              <Checkbox
                checked={selectedFiles[version.id]?.includes(file.id) || false}
                onChange={() => handleCheckboxChange(version.id, file.id)}
              />
              <Typography>{file.name} ({(file.sizeKB / 1024).toFixed(2)} MB)</Typography>
              {version.trainedWords?.length > 0 && (
                <Tooltip title={t('copyTrainedWords')}>
                  <IconButton onClick={() => navigator.clipboard.writeText(version.trainedWords.join(', '))}>
                    <FileCopyIcon />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          ))}
        </Grid>
      ))}
      <Pagination count={Math.ceil(versions.length / versionsPerPage)} page={page} onChange={(e, p) => setPage(p)} />
      <Button variant="contained" onClick={handleDownload}>{t('download')}</Button>
    </div>
  );
};

export default ModelDetails;