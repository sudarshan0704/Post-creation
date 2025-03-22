import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import html2canvas from 'html2canvas';
import { motion, AnimatePresence } from 'framer-motion';
import '../Stylefile/Quote.css';

const QuoteGenerator = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [fontColor, setFontColor] = useState('#000000');
  const [fontFamily, setFontFamily] = useState('Arial, sans-serif');
  const [backgroundImage, setBackgroundImage] = useState('');
  const quoteRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    generateQuote();
  }, []);

  const generateQuote = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://dummyjson.com/quotes/random');
      setQuote(response.data.quote);
      setAuthor(response.data.author);
    } catch (error) {
      console.error('Error fetching quote:', error);
      setQuote('Failed to fetch quote. Please try again.');
      setAuthor('');
    }
    setIsLoading(false);
  };

  const downloadQuote = async () => {
    if (quoteRef.current) {
      const canvas = await html2canvas(quoteRef.current, {
        width: quoteRef.current.offsetWidth,
        height: quoteRef.current.offsetHeight,
        scale: 2,
      });
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = 'quote.png';
      link.click();
    }
  };

  const shareQuote = async () => {
    if (quoteRef.current) {
      const canvas = await html2canvas(quoteRef.current, {
        width: quoteRef.current.offsetWidth,
        height: quoteRef.current.offsetHeight,
        scale: 2,
      });
      canvas.toBlob(async (blob) => {
        const file = new File([blob], 'quote.png', { type: 'image/png' });
        if (navigator.share) {
          try {
            await navigator.share({
              files: [file],
              title: 'Check out this quote!',
              text: `"${quote}" - ${author}`,
            });
          } catch (error) {
            console.error('Error sharing:', error);
          }
        } else {
          console.log('Web Share API not supported');
          // Fallback: You could implement a different sharing method here
        }
      });
    }
  };

  const handleBackgroundImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setBackgroundImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const removeBackgroundImage = () => {
    setBackgroundImage('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="quotes-container">
      <motion.h1 
        className="page-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Quote Generator
      </motion.h1>
      
      <div className="content-wrapper">
        <motion.section 
          className="quote-generator"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Generate a Random Quote</h2>
          
          <AnimatePresence mode="wait">
            <motion.div 
              ref={quoteRef}
              className="quote-display"
              style={{
                backgroundColor: backgroundImage ? 'transparent' : backgroundColor,
                backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: fontColor,
                fontFamily: fontFamily,
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <div className="quote-text">"{quote}"</div>
              <div className="quote-author">- {author}</div>
              <div className="name">-Post-Creator</div>
            </motion.div>
          </AnimatePresence>

          <div className="customization-panel">
            <h3>Customize Your Quote</h3>
            <div className="customization-options">
              Background<input 
                type="color" 
                value={backgroundColor} 
                onChange={(e) => setBackgroundColor(e.target.value)}
                title="Background Color"
                
              />
               text<input 
                type="color" 
                value={fontColor} 
                onChange={(e) => setFontColor(e.target.value)}
                title="Font Color"
              />
              <select 
                value={fontFamily} 
                onChange={(e) => setFontFamily(e.target.value)}
              >
                <option value="Arial, sans-serif">Arial</option>
                <option value="'Times New Roman', serif">Times New Roman</option>
                <option value="'Georgia', serif">Georgia</option>
                <option value="'Verdana', sans-serif">Verdana</option>
              </select>
              <motion.button 
                onClick={() => fileInputRef.current.click()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Upload Background
              </motion.button>
              {backgroundImage && (
                <motion.button 
                  onClick={removeBackgroundImage}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="remove-bg-btn"
                >
                  Remove Background
                </motion.button>
              )}
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleBackgroundImageUpload}
                ref={fileInputRef}
                style={{ display: 'none' }}
              />
            </div>
          </div>

          <div className="button-container">
            <motion.button
              className="generate-btn"
              onClick={generateQuote}
              disabled={isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isLoading ? 'Generating...' : 'Generate New Quote'}
            </motion.button>
            <motion.button
              className="action-btn"
              onClick={downloadQuote}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download Quote
            </motion.button>
            <motion.button
              className="action-btn"
              onClick={shareQuote}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Share Quote
            </motion.button>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default QuoteGenerator;