import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/TranslatorPage.css';

// Simulated translation function (replace with actual API call in production)
const translateText = async (text, targetLanguage) => {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simulated translations for demonstration purposes
  const translations = {
    es: {
      apple: 'manzana',
      banana: 'plátano',
      orange: 'naranja',
      grape: 'uva',
      strawberry: 'fresa'
    },
    fr: {
      apple: 'pomme',
      banana: 'banane',
      orange: 'orange',
      grape: 'raisin',
      strawberry: 'fraise'
    },
    de: {
      apple: 'Apfel',
      banana: 'Banane',
      orange: 'Orange',
      grape: 'Traube',
      strawberry: 'Erdbeere'
    }
  };

  return translations[targetLanguage][text.toLowerCase()] || text;
};

const languages = [
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' }
];

export default function TranslatorPage() {
  const [inputText, setInputText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [translatedText, setTranslatedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleTranslate = async () => {
    if (!inputText) return;

    setIsLoading(true);
    try {
      const result = await translateText(inputText, targetLanguage);
      setTranslatedText(result);
    } catch (error) {
      console.error('Translation error:', error);
      setTranslatedText('Error occurred during translation');
    }
    setIsLoading(false);
  };

  return (
    <div className="translator-container">
      <h1 className="translator-title">Fruit Translator</h1>
      <div className="translator-card">
        <div className="input-group">
          <label htmlFor="inputText">Enter a fruit name:</label>
          <input
            type="text"
            id="inputText"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="e.g., Apple"
          />
        </div>
        <div className="input-group">
          <label htmlFor="targetLanguage">Select target language:</label>
          <select
            id="targetLanguage"
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
        <button onClick={handleTranslate} className="btn translate-btn" disabled={isLoading}>
          {isLoading ? 'Translating...' : 'Translate'}
        </button>
        {translatedText && (
          <div className="result-group">
            <h2>Translation:</h2>
            <p className="translated-text">{translatedText}</p>
          </div>
        )}
      </div>
      <Link to="/home" className="btn back-link">
        Back to Home
      </Link>
    </div>
  );
}