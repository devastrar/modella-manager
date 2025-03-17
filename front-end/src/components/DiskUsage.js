import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { useTranslation } from 'react-i18next';
import { Button, Select, MenuItem } from '@mui/material';
import { toast } from 'react-toastify';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

/**
 * DiskUsage component visualizes disk space usage by different model sources, base models, and model types.
 * Supports User Story #36: "View disk size and usage through a visual control," #38: "Break down disk usage by categories,"
 * and #37: "Offer different graph types for visualization."
 */
const DiskUsage = () => {
  const { t } = useTranslation(); // Hook for internationalization (User Story #47)
  const [usage, setUsage] = useState({
    bySource: { civitai: 0, huggingface: 0, other: 0 },
    byBaseModel: {},
    byModelType: {},
  }); // State to hold disk usage data
  const [graphType, setGraphType] = useState('pie'); // State for graph type selection (User Story 37)

  /**
   * Fetches disk usage data from the back-end API endpoint `/api/disk-usage`.
   * Updates the state with the received data and handles errors with user-friendly messages (User Story #42).
   */
  const fetchUsage = async () => {
    try {
      const response = await axios.get('/api/disk-usage', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }, // Secure API call (User Story #49)
      });
      setUsage(response.data);
    } catch (error) {
      console.error('Error fetching disk usage:', error);
      toast.error(t('fetchDiskUsageError', 'Failed to fetch disk usage data.')); // User-friendly error (User Story #42)
    }
  };

  useEffect(() => {
    fetchUsage(); // Fetch data on component mount
  }, []);

  // Prepare data for charts with translated labels
  const dataBySource = {
    labels: [t('civitai', 'CivitAI'), t('huggingFace', 'Hugging Face'), t('other', 'Other')],
    datasets: [
      {
        data: [usage.bySource.civitai, usage.bySource.huggingface, usage.bySource.other],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], // High-contrast colors (User Story #59)
      },
    ],
  };
  const dataByBaseModel = {
    labels: Object.keys(usage.byBaseModel),
    datasets: [
      {
        data: Object.values(usage.byBaseModel),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };
  const dataByModelType = {
    labels: Object.keys(usage.byModelType),
    datasets: [
      {
        data: Object.values(usage.byModelType),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const ChartComponent = graphType === 'pie' ? Pie : Bar;

  return (
    <div style={{ padding: '20px' }}>
      <h2>{t('diskUsage', 'Disk Usage')}</h2>
      <Select
        value={graphType}
        onChange={(e) => setGraphType(e.target.value)}
        style={{ marginBottom: '20px' }}
      >
        <MenuItem value="pie">{t('pieChart', 'Pie Chart')}</MenuItem>
        <MenuItem value="bar">{t('barChart', 'Bar Chart')}</MenuItem>
      </Select>
      <h3>{t('bySource', 'By Source')}</h3>
      <ChartComponent data={dataBySource} aria-label={t('diskUsageChartBySource', 'Disk Usage Chart by Source')} />
      <h3>{t('byBaseModel', 'By Base Model')}</h3>
      <ChartComponent data={dataByBaseModel} aria-label={t('diskUsageChartByBaseModel', 'Disk Usage Chart by Base Model')} />
      <h3>{t('byModelType', 'By Model Type')}</h3>
      <ChartComponent data={dataByModelType} aria-label={t('diskUsageChartByModelType', 'Disk Usage Chart by Model Type')} />
      <Button
        onClick={fetchUsage}
        variant="contained"
        color="primary"
        style={{ marginTop: '20px' }}
      >
        {t('refresh', 'Refresh')} {/* Allows manual refresh of data */}
      </Button>
      {/* Hidden table for accessibility, providing data in a tabular format (User Story #57) */}
      <table style={{ display: 'none' }} aria-label={t('diskUsageData', 'Disk Usage Data')}>
        <thead>
          <tr>
            <th>{t('source', 'Source')}</th>
            <th>{t('usageGB', 'Usage (GB)')}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{t('civitai', 'CivitAI')}</td>
            <td>{usage.bySource.civitai}</td>
          </tr>
          <tr>
            <td>{t('huggingFace', 'Hugging Face')}</td>
            <td>{usage.bySource.huggingface}</td>
          </tr>
          <tr>
            <td>{t('other', 'Other')}</td>
            <td>{usage.bySource.other}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DiskUsage;