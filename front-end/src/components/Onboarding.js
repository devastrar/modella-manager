import React from 'react';
import Joyride from 'react-joyride';

/**
 * Onboarding component provides a guided tour for new users, highlighting key features.
 * Uses Joyride library to create an interactive walkthrough, enhancing usability.
 */
const steps = [
  { target: '.model-browser', content: 'Browse and search for models here.' },
  { target: '.download-queue', content: 'Monitor your downloads in this section.' },
  { target: '.disk-usage', content: 'Check your disk usage by source.' },
  { target: '.model-lists', content: 'Organize models into custom lists.' },
  { target: '.local-models', content: 'Manage your locally stored models.' },
  { target: '.settings', content: 'Configure API keys and preferences.' },
];

const Onboarding = () => (
  <Joyride
    steps={steps}
    continuous
    showSkipButton
    styles={{ options: { primaryColor: '#1976d2' } }} // High-contrast color (User Story #59)
    run={true} // Auto-start on first load
  />
);

export default Onboarding;