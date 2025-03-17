import React from 'react';
import { Card, CardContent, Typography, Box } from '@material-ui/core';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const ModelCard = ({ model }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const imageUrl = model.modelVersions?.[0]?.images?.[0]?.url || 'placeholder.jpg';
  const stats = model.stats || model.modelVersions?.[0]?.stats || {};
  const baseModel = model.modelVersions?.[0]?.baseModel || 'Unknown';
  const type = model.type || 'Unknown';

  const handleClick = () => navigate(`/model/${model.id}`);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  };

  return (
    <Card
      style={{ cursor: 'pointer', position: 'relative' }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={t('modelCardAriaLabel', {
        name: model.name || 'Unnamed',
        type,
        downloads: stats.downloadCount || 0,
        rating: stats.rating || 'N/A',
      })}
    >
      <Box position="relative">
        <LazyLoadImage
          src={imageUrl}
          alt={model.name || 'Model Image'}
          effect="blur"
          width="100%"
          height="200px"
          style={{ objectFit: 'cover' }}
        />
        <Typography
          variant="caption"
          style={{
            position: 'absolute',
            top: '5px',
            left: '5px',
            background: 'rgba(0,0,0,0.7)',
            color: 'white',
            padding: '2px 5px',
          }}
        >
          {baseModel}
        </Typography>
        <Typography
          variant="caption"
          style={{
            position: 'absolute',
            top: '5px',
            right: '5px',
            background: 'rgba(0,0,0,0.7)',
            color: 'white',
            padding: '2px 5px',
          }}
        >
          {type}
        </Typography>
      </Box>
      <CardContent>
        <Typography variant="h6" noWrap>
          {model.name || t('unnamedModel', 'Unnamed Model')}
        </Typography>
        <Typography variant="body2" color="textSecondary" noWrap>
          {model.description?.substring(0, 100) || t('noDescription', 'No description available')}...
        </Typography>
        <Box
          display="flex"
          justifyContent="space-between"
          mt={1}
          style={{ background: 'rgba(0,0,0,0.7)', padding: '5px', color: 'white' }}
        >
          <Typography variant="caption">
            {t('downloads')}: {stats.downloadCount || 0}
          </Typography>
          <Typography variant="caption">
            {t('likes')}: {stats.favoriteCount || 0}
          </Typography>
          <Typography variant="caption">
            {t('rating')}: {stats.rating || 'N/A'}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ModelCard;