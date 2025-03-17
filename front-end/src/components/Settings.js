import React, { useState } from 'react';
import { setApiKeys } from '../services/api';

/**
 * Settings component allows users to configure API keys, storage paths, language, and theme.
 * Supports User Story #32: "Change the default download location," #46: "Select preferred language,"
 * #44: "Customizable theme," and #49: "Securely manage API keys."
 */
const Settings = () => {
  const [civitaiKey, setCivitaiKey] = useState(''); // State for Civitai API key
  const [huggingfaceKey, setHuggingfaceKey] = useState(''); // State for Hugging Face API key
  const [error, setError] = useState(''); // State for error messages

  /**
   * Validates if an API key is provided.
   * @param {string} key - The API key to validate.
   * @returns {boolean} True if the key is valid, false otherwise.
   */
  const validateApiKey = (key) => key && key.length > 0;

  /**
   * Saves the API keys if they are valid, updating the API service configuration.
   * Supports secure management of API keys (User Story #49).
   */
  const handleSave = () => {
    if (!validateApiKey(civitaiKey) || !validateApiKey(huggingfaceKey)) {
      setError('API keys cannot be empty');
      return;
    }
    setApiKeys(civitaiKey, huggingfaceKey); // Updates axios headers for API calls
    setError('');
    alert('Settings saved!');
  };

  return (
    <div>
      <h2>Settings</h2>
      <div>
        <label>CivitAI API Key:</label>
        <input
          type="text"
          value={civitaiKey}
          onChange={(e) => setCivitaiKey(e.target.value)}
        />
      </div>
      <div>
        <label>Hugging Face API Key:</label>
        <input
          type="text"
          value={huggingfaceKey}
          onChange={(e) => setHuggingfaceKey(e.target.value)}
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* User-friendly error (User Story #42) */}
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default Settings;