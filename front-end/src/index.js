import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import App from './App';
import './style.css';
import en from './translations/en.json';
import fr from './translations/fr.json';
import es from './translations/es.json';
import de from './translations/de.json';
import ru from './translations/ru.json';
import zh from './translations/zh.json';
import ja from './translations/ja.json';

const supportedLanguages = ['en', 'fr', 'es', 'de', 'ru', 'zh', 'ja'];
const userLang = navigator.language.split('-')[0];
const initialLang = supportedLanguages.includes(userLang) ? userLang : 'en';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    fr: { translation: fr },
    es: { translation: es },
    de: { translation: de },
    ru: { translation: ru },
    zh: { translation: zh },
    ja: { translation: ja },
  },
  lng: initialLang,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);