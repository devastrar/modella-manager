import React, { useCallback, useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import InfiniteScroll from 'react-infinite-scroll-component';
import { motion } from 'framer-motion';
import { Grid, TextField, Button, CircularProgress, MenuItem } from '@material-ui/core';
import ModelCard from './ModelCard';
import { useTranslation } from 'react-i18next';
import { fetchCivitaiModels } from '../services/api';
import { toast } from 'react-toastify';

// ModelBrowser component for browsing and searching models
const ModelBrowser = () => {
  const { t } = useTranslation(); // Internationalization hook
  const [models, setModels] = useState([]); // List of models
  const [searchQuery, setSearchQuery] = useState(''); // Search input state
  const [sort, setSort] = useState('Newest'); // Default sort
  const [typeFilter, setTypeFilter] = useState(''); // Filter by model type
  const [page, setPage] = useState(1); // Pagination state
  const [hasMore, setHasMore] = useState(true); // Infinite scroll state
  const [loading, setLoading] = useState(false); // Loading state

  // Debounced function to fetch models
  const fetchModels = useCallback(
    debounce(async (pageNum) => {
      if (loading) return;
      setLoading(true);
      try {
        const response = await fetchCivitaiModels({
          query: searchQuery,
          page: pageNum,
          limit: 20,
          sort,
          types: typeFilter
        });
        setModels((prev) => [...prev, ...response.items]);
        setHasMore(!!response.metadata.nextPage);
      } catch (error) {
        toast.error(t('fetchModelsError', 'Failed to fetch models'));
      } finally {
        setLoading(false);
      }
    }, 300),
    [searchQuery, sort, typeFilter, t]
  );

  // Effect to reset and fetch models when search query, sort, or filter changes
  useEffect(() => {
    setModels([]);
    setPage(1);
    fetchModels(1);
  }, [searchQuery, sort, typeFilter, fetchModels]);

  // Load more models for infinite scroll
  const loadMore = () => {
    if (hasMore && !loading) {
      setPage((prev) => prev + 1);
      fetchModels(page + 1);
    }
  };

  // Handle search button click or Enter key
  const handleSearch = () => {
    setModels([]);
    setPage(1);
    fetchModels(1);
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* Search bar, sort, and filter controls */}
      <Grid container spacing={2} alignItems="center" style={{ marginBottom: '20px' }}>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label={t('searchModels')}
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            inputProps={{ 'aria-label': t('searchModels') }}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            select
            label={t('sortBy')}
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            fullWidth
          >
            <MenuItem value="Highest Rated">Rating</MenuItem>
            <MenuItem value="Most Downloaded">Downloads</MenuItem>
            <MenuItem value="Newest">Newest</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={3}>
          <TextField
            select
            label={t('modelType')}
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            fullWidth
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Checkpoint">Checkpoint</MenuItem>
            <MenuItem value="LORA">LORA</MenuItem>
            <MenuItem value="Controlnet">ControlNet</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" color="primary" onClick={handleSearch}>
            {t('search')}
          </Button>
        </Grid>
      </Grid>
      {/* Infinite scroll container */}
      <InfiniteScroll
        dataLength={models.length}
        next={loadMore}
        hasMore={hasMore}
        loader={<CircularProgress style={{ display: 'block', margin: '20px auto' }} />}
        endMessage={<p style={{ textAlign: 'center' }}>{t('noMoreModels')}</p>}
      >
        <Grid container spacing={3}>
          {models.map((model) => (
            <Grid item xs={12} sm={6} md={4} key={model.id}>
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                <ModelCard model={model} />
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
      {/* Return to top button */}
      <Button
        variant="contained"
        color="secondary"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{ position: 'fixed', bottom: '20px', right: '20px' }}
      >
        {t('returnToTop')}
      </Button>
    </div>
  );
};

export default ModelBrowser;