import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Grid, Paper, Typography, Button } from '@mui/material';

/**
 * Dashboard component serves as the central hub for navigation within the Modella Manager application.
 * It provides links to key sections such as Model Browser, Download Queue, Disk Usage, Model Lists, Local Models, and Settings.
 * This aligns with User Story #43: "As a user, I want a dashboard to monitor downloads and tasks."
 */
const Dashboard = () => {
  const { t } = useTranslation(); // Hook to access translation function for internationalization (User Story #47)

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        {t('dashboard', 'Dashboard')} {/* Translates 'dashboard' based on selected language */}
      </Typography>
      <Grid container spacing={3}>
        {/* Grid item for navigating to Model Browser */}
        <Grid item xs={12} sm={4}>
          <Paper style={{ padding: '20px', textAlign: 'center' }}>
            <Typography variant="h6">{t('browseModels', 'Browse Models')}</Typography>
            <Button
              component={Link}
              to="/browse"
              variant="contained"
              color="primary"
              aria-label={t('browseModels')} // Accessibility feature (User Story #57)
            >
              {t('go', 'Go')}
            </Button>
          </Paper>
        </Grid>
        {/* Grid item for navigating to Download Queue */}
        <Grid item xs={12} sm={4}>
          <Paper style={{ padding: '20px', textAlign: 'center' }}>
            <Typography variant="h6">{t('downloadQueue', 'Download Queue')}</Typography>
            <Button
              component={Link}
              to="/queue"
              variant="contained"
              color="primary"
              aria-label={t('downloadQueue')} // Accessibility feature (User Story #57)
            >
              {t('go', 'Go')}
            </Button>
          </Paper>
        </Grid>
        {/* Grid item for navigating to Disk Usage */}
        <Grid item xs={12} sm={4}>
          <Paper style={{ padding: '20px', textAlign: 'center' }}>
            <Typography variant="h6">{t('diskUsage', 'Disk Usage')}</Typography>
            <Button
              component={Link}
              to="/disk-usage"
              variant="contained"
              color="primary"
              aria-label={t('diskUsage')} // Accessibility feature (User Story #57)
            >
              {t('go', 'Go')}
            </Button>
          </Paper>
        </Grid>
        {/* Grid item for navigating to Model Lists */}
        <Grid item xs={12} sm={4}>
          <Paper style={{ padding: '20px', textAlign: 'center' }}>
            <Typography variant="h6">{t('modelLists', 'Model Lists')}</Typography>
            <Button
              component={Link}
              to="/lists"
              variant="contained"
              color="primary"
              aria-label={t('modelLists')} // Accessibility feature (User Story #57)
            >
              {t('go', 'Go')}
            </Button>
          </Paper>
        </Grid>
        {/* Grid item for navigating to Local Models */}
        <Grid item xs={12} sm={4}>
          <Paper style={{ padding: '20px', textAlign: 'center' }}>
            <Typography variant="h6">{t('localModels', 'Local Models')}</Typography>
            <Button
              component={Link}
              to="/local-models"
              variant="contained"
              color="primary"
              aria-label={t('localModels')} // Accessibility feature (User Story #57)
            >
              {t('go', 'Go')}
            </Button>
          </Paper>
        </Grid>
        {/* Grid item for navigating to Settings */}
        <Grid item xs={12} sm={4}>
          <Paper style={{ padding: '20px', textAlign: 'center' }}>
            <Typography variant="h6">{t('settings', 'Settings')}</Typography>
            <Button
              component={Link}
              to="/settings"
              variant="contained"
              color="primary"
              aria-label={t('settings')} // Accessibility feature (User Story #57)
            >
              {t('go', 'Go')}
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;