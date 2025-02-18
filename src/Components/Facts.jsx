import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import html2canvas from 'html2canvas';
import '../Stylefile/Facts.css';

export default function Facts() {
  const [fact, setFact] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    fetchFact();
  }, []);

  const fetchFact = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://uselessfacts.jsph.pl/api/v2/facts/random?language=en');
      setFact(response.data.text);
    } catch (error) {
      console.error('Error fetching fact:', error);
      setFact('Oops! Failed to fetch a fact. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackgroundChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBackgroundImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadFact = async () => {
    const element = document.querySelector('.fact-display');
    const canvas = await html2canvas(element);
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'amazing-fact.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const shareFact = async () => {
    if (navigator.share) {
      try {
        const element = document.querySelector('.fact-display');
        const canvas = await html2canvas(element);
        const blob = await new Promise(resolve => canvas.toBlob(resolve));
        const file = new File([blob], 'fact.png', { type: 'image/png' });

        await navigator.share({
          title: 'Amazing Fact',
          text: fact,
          files: [file]
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      alert('Web Share API not supported');
    }
  };

  return (
    <div className="facts-container">
      <motion.h1 
        className="page-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Amazing Facts Generator
      </motion.h1>
      <div className="content-wrapper">
        <motion.section 
          className="facts-generator"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Generate Random Facts</h2>
          <motion.button 
            onClick={fetchFact} 
            className="generate-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Generate Fact'}
          </motion.button>

          <AnimatePresence mode="wait">
            <motion.div 
              key={fact}
              className="fact-display" 
              style={{
                backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
                backgroundColor: backgroundImage ? 'transparent' : '#2c2c2c'
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <div className="fact-content">
                <p className="fact-text">{fact || 'Click "Generate Fact" to learn something amazing!'}</p>
                <p className="fact-signature">-@post-Creator</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="fact-actions">
            <div className="file-input-wrapper">
                <label htmlFor="">Add background</label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleBackgroundChange} 
                className="bg-input" 
              />
              {backgroundImage && (
                <motion.button
                  onClick={() => setBackgroundImage('')}
                  className="remove-bg-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Remove Background
                </motion.button>
              )}
            </div>
            <div className="action-buttons">
              <motion.button 
                onClick={downloadFact} 
                className="action-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={!fact}
              >
                Download
              </motion.button>
              <motion.button 
                onClick={shareFact} 
                className="action-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={!fact}
              >
                Share
              </motion.button>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
} 