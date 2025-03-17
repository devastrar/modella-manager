const fs = require('fs');
const path = require('path');

const translationDir = path.join(__dirname, '../src/translations');
const baseLang = 'en.json';

const baseTranslations = JSON.parse(fs.readFileSync(path.join(translationDir, baseLang), 'utf8'));

fs.readdirSync(translationDir).forEach((file) => {
  if (file !== baseLang) {
    const translations = JSON.parse(fs.readFileSync(path.join(translationDir, file), 'utf8'));
    const missingKeys = Object.keys(baseTranslations).filter(
      (key) => !(key in translations)
    );
    if (missingKeys.length) {
      console.warn(`${file} is missing keys: ${missingKeys.join(', ')}`);
    }
  }
});

console.log('Translation validation complete');