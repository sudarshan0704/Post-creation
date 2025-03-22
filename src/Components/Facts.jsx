import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import html2canvas from 'html2canvas';
import '../Stylefile/Facts.css';

export default function Facts() {
  const [fact, setFact] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState('');
  const [customizeOpen, setCustomizeOpen] = useState(false);
  const [textColor, setTextColor] = useState('#ffffff');
  const [fontSize, setFontSize] = useState(18);
  const [fontFamily, setFontFamily] = useState('Roboto, sans-serif');
  const [opacity, setOpacity] = useState(0.7);
  const factDisplayRef = useRef(null);

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
    if (!factDisplayRef.current) return;
    
    try {
      const canvas = await html2canvas(factDisplayRef.current, {
        useCORS: true,
        allowTaint: true,
        backgroundColor: backgroundImage ? null : '#121212'
      });
      
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = 'amazing-fact.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading fact:', error);
      alert('Failed to download the image. Please try again.');
    }
  };

  const shareFact = async () => {
    if (!factDisplayRef.current) return;
    
    try {
      const canvas = await html2canvas(factDisplayRef.current, {
        useCORS: true,
        allowTaint: true,
        backgroundColor: backgroundImage ? null : '#121212'
      });
      
      canvas.toBlob(async (blob) => {
        if (!blob) {
          alert('Failed to create image for sharing');
          return;
        }
        
        const file = new File([blob], 'amazing-fact.png', { type: 'image/png' });
        
        if (navigator.share) {
          try {
            await navigator.share({
              title: 'Amazing Fact',
              text: fact,
              files: [file]
            });
          } catch (error) {
            console.error('Error sharing:', error);
            fallbackShare(canvas.toDataURL('image/png'));
          }
        } else {
          fallbackShare(canvas.toDataURL('image/png'));
        }
      });
    } catch (error) {
      console.error('Error sharing fact:', error);
      alert('Failed to share the image. Please try again.');
    }
  };
  
  const fallbackShare = (dataUrl) => {
    // Fallback method if Web Share API is not available
    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(`
        <html>
          <head>
            <title>Amazing Fact</title>
          </head>
          <body style="margin: 0; display: flex; flex-direction: column; align-items: center; padding: 20px; text-align: center; background-color: #121212; color: white;">
            <h3>Right-click on the image to save or copy it:</h3>
            <img src="${dataUrl}" alt="Amazing Fact" style="max-width: 100%; margin-top: 20px;" />
            <p style="margin-top: 20px;">${fact}</p>
          </body>
        </html>
      `);
    } else {
      alert('Could not open sharing window. Please check your pop-up blocker.');
    }
  };

  const toggleCustomizePanel = () => {
    setCustomizeOpen(!customizeOpen);
  };

  const resetCustomization = () => {
    setTextColor('#ffffff');
    setFontSize(18);
    setFontFamily('Roboto, sans-serif');
    setOpacity(0.7);
    setBackgroundImage('');
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
          <div className="controls-header">
            <h2>Generate Random Facts</h2>
            <motion.button 
              onClick={toggleCustomizePanel}
              className="customize-toggle-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {customizeOpen ? 'Hide Customization' : 'Customize'}
            </motion.button>
          </div>
          
          <AnimatePresence>
            {customizeOpen && (
              <motion.div 
                className="customize-panel"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="customize-section">
                  <h3>Customize Your Fact Card</h3>
                  
                  <div className="customize-row">
                    <div className="customize-group">
                      <label>Text Color</label>
                      <input 
                        type="color" 
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="color-picker"
                      />
                    </div>
                    
                    <div className="customize-group">
                      <label>Font Size: {fontSize}px</label>
                      <input 
                        type="range" 
                        min="12" 
                        max="32" 
                        value={fontSize}
                        onChange={(e) => setFontSize(parseInt(e.target.value))}
                        className="range-slider"
                      />
                    </div>
                  </div>
                  
                  <div className="customize-row">
                    <div className="customize-group">
                      <label>Font Family</label>
                      <select 
                        value={fontFamily}
                        onChange={(e) => setFontFamily(e.target.value)}
                        className="font-selector"
                      >
                        <option value="Roboto, sans-serif">Roboto</option>
                        <option value="'Playfair Display', serif">Playfair Display</option>
                        <option value="'Courier New', monospace">Courier New</option>
                        <option value="'Arial', sans-serif">Arial</option>
                        <option value="'Georgia', serif">Georgia</option>
                      </select>
                    </div>
                    
                    <div className="customize-group">
                      <label>Background Opacity: {opacity}</label>
                      <input 
                        type="range" 
                        min="0.1" 
                        max="1" 
                        step="0.1"
                        value={opacity}
                        onChange={(e) => setOpacity(parseFloat(e.target.value))}
                        className="range-slider"
                      />
                    </div>
                  </div>
                  
                  <div className="customize-group full-width">
                    <label>Background Image</label>
                    <div className="file-input-container">
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleBackgroundChange} 
                        className="background-input" 
                        id="background-upload"
                      />
                      <label htmlFor="background-upload" className="file-input-button">
                        {backgroundImage ? 'Change Image' : 'Choose Image'}
                      </label>
                      {backgroundImage && (
                        <motion.button
                          onClick={() => setBackgroundImage('')}
                          className="remove-bg-btn"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Remove
                        </motion.button>
                      )}
                    </div>
                  </div>
                  
                  <motion.button 
                    onClick={resetCustomization} 
                    className="reset-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Reset to Default
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
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
              ref={factDisplayRef}
              style={{
                backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
                backgroundColor: backgroundImage ? 'transparent' : '#121212',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <div 
                className="fact-content"
                style={{ 
                  backgroundColor: `rgba(0, 0, 0, ${opacity})`,
                  fontFamily: fontFamily
                }}
              >
                <p 
                  className="fact-text"
                  style={{ 
                    color: textColor,
                    fontSize: `${fontSize}px`
                  }}
                >
                  {fact || 'Click "Generate Fact" to learn something amazing!'}
                </p>
                <p 
                  className="fact-signature"
                  style={{ color: textColor }}
                >
                  -@post-Creator
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="fact-actions">
            <motion.button 
              onClick={downloadFact} 
              className="action-btn download-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={!fact}
            >
              Download
            </motion.button>
            <motion.button 
              onClick={shareFact} 
              className="action-btn share-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={!fact}
            >
              Share
            </motion.button>
          </div>
        </motion.section>
      </div>
    </div>
  );
}