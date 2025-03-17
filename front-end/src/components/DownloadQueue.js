import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { toast } from 'react-toastify';
import { Grid, Button, LinearProgress, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import api from '../services/api';

// Initialize Socket.IO client with improved reconnection settings
const socket = io(process.env.REACT_APP_API_URL || 'http://localhost:5000', {
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
});

const DownloadQueue = () => {
  const { t } = useTranslation();
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    // Load initial queue from localStorage
    const storedQueue = JSON.parse(localStorage.getItem('downloadQueue') || '[]');
    setQueue(storedQueue);

    // Handle socket connection and errors
    socket.on('connect', () => toast.info(t('socketConnected', 'Connected to server')));
    socket.on('connect_error', () => toast.error(t('socketError', 'Failed to connect to server. Retrying...')));
    socket.on('queue_update', (updates) => {
      setQueue((prevQueue) => {
        const updatedQueue = prevQueue.map((item) => {
          const update = updates.find((u) => u.id === item.taskId);
          if (update) {
            if (update.status === 'completed') {
              toast.success(t('downloadComplete', { name: item.modelName }));
              return null;
            } else if (update.status === 'failed') {
              toast.error(t('downloadFailed', { name: item.modelName }));
              return null;
            }
            return { ...item, progress: update.progress };
          }
          return item;
        }).filter(Boolean);
        localStorage.setItem('downloadQueue', JSON.stringify(updatedQueue));
        return updatedQueue;
      });
    });

    // Cleanup socket listeners
    return () => {
      socket.off('connect');
      socket.off('connect_error');
      socket.off('queue_update');
    };
  }, [t]);

  // Cancel a download task
  const cancelDownload = async (taskId) => {
    try {
      await api.post(`/api/download/cancel/${taskId}`);
      setQueue((prev) => {
        const newQueue = prev.filter((item) => item.taskId !== taskId);
        localStorage.setItem('downloadQueue', JSON.stringify(newQueue));
        return newQueue;
      });
      toast.info(t('downloadCancelled'));
    } catch (error) {
      toast.error(t('cancelDownloadError', 'Failed to cancel download'));
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        {t('downloadQueue')}
      </Typography>
      {queue.length === 0 ? (
        <Typography>{t('noDownloads')}</Typography>
      ) : (
        <Grid container spacing={2}>
          {queue.map((item) => (
            <Grid item xs={12} key={item.taskId}>
              <Typography>{item.modelName}</Typography>
              <LinearProgress variant="determinate" value={item.progress || 0} />
              <Typography>{Math.round(item.progress || 0)}%</Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => cancelDownload(item.taskId)}
                style={{ marginTop: '10px' }}
              >
                {t('cancel')}
              </Button>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default DownloadQueue;