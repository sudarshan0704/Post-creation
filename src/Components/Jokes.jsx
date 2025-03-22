import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import html2canvas from 'html2canvas';
import { motion, AnimatePresence } from 'framer-motion';
import '../Stylefile/Jokes.css';

export default function Jokes() {
  const [joke, setJoke] = useState('');
  const [backgroundImage, setBackgroundImage] = useState('');
  const [sampleJokes, setSampleJokes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const jokeDisplayRef = useRef(null);
  const fileInputRef = useRef(null);
  
  // New state variables for customization
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [fontColor, setFontColor] = useState('#000000');
  const [fontFamily, setFontFamily] = useState('Arial, sans-serif');
  const [fontSize, setFontSize] = useState('16px');
  const [textAlign, setTextAlign] = useState('center');

  useEffect(() => {
    fetchSampleJokes();
  }, []);

  const fetchJoke = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
      setJoke(`${response.data.setup} ${response.data.punchline}`);
    } catch (error) {
      console.error('Error fetching joke:', error);
      setJoke('Oops! Failed to fetch a joke. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSampleJokes = async () => {
    try {
      const jokes = [];
      for (let i = 0; i < 5; i++) {
        const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
        jokes.push(`${response.data.setup} ${response.data.punchline}`);
      }
      setSampleJokes(jokes);
    } catch (error) {
      console.error('Error fetching sample jokes:', error);
    }
  };

  const handleBackgroundClick = () => {
    if (backgroundImage) {
      // If we already have a background, remove it
      setBackgroundImage('');
    } else {
      // If no background, trigger file input click
      fileInputRef.current.click();
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

  const downloadJoke = async () => {
    if (!jokeDisplayRef.current) return;
    
    try {
      const canvas = await html2canvas(jokeDisplayRef.current, {
        width: jokeDisplayRef.current.offsetWidth,
        height: jokeDisplayRef.current.offsetHeight,
        scale: 2,
      });
      const jpeg = canvas.toDataURL('image/jpeg');
      
      const link = document.createElement('a');
      link.href = jpeg;
      link.download = 'joke.jpeg';
      link.click();
      
      return jpeg; // Return the jpeg data URL for potential sharing
    } catch (error) {
      console.error('Error creating image:', error);
      alert('Failed to create image. Please try again.');
      return null;
    }
  };

  const shareJoke = async () => {
    if (!navigator.share) {
      alert('Web Share API not supported in your browser');
      return;
    }

    try {
      // Generate the image using html2canvas
      const canvas = await html2canvas(jokeDisplayRef.current, {
        width: jokeDisplayRef.current.offsetWidth,
        height: jokeDisplayRef.current.offsetHeight,
        scale: 2,
      });
      
      // Convert to blob
      canvas.toBlob(async (blob) => {
        if (!blob) {
          console.error('Failed to create blob');
          return;
        }
        
        // Create a File object from the blob
        const file = new File([blob], 'joke.jpeg', { type: 'image/jpeg' });
        
        // Share the file
        try {
          await navigator.share({
            title: 'Funny Joke',
            text: joke,
            files: [file]
          });
          console.log('Shared successfully');
        } catch (error) {
          console.error('Error sharing:', error);
          if (error.name !== 'AbortError') { // Don't show alert if user canceled sharing
            alert('Error sharing: ' + error.message);
          }
        }
      }, 'image/jpeg', 0.9);
    } catch (error) {
      console.error('Error creating image for sharing:', error);
      alert('Failed to create image for sharing. Please try again.');
    }
  };

  return (
    <div className="jokes-container">
      <motion.h1 
        className="page-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Joke Generator
      </motion.h1>
      <div className="content-wrapper">
        <motion.section 
          className="joke-generator"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Generate a Random Joke</h2>
          <motion.button 
            onClick={fetchJoke} 
            className="generate-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isLoading}
          >
            {isLoading ? 'Generating...' : 'Generate Joke'}
          </motion.button>
          <AnimatePresence mode="wait">
            <motion.div 
              key={joke}
              id="joke-display"
              ref={jokeDisplayRef}
              className="joke-display-square" 
              style={{
                backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
                backgroundColor: backgroundImage ? 'transparent' : backgroundColor,
                color: fontColor,
                fontFamily: fontFamily,
                fontSize: fontSize,
                textAlign: textAlign,
                aspectRatio: '1/1',
                width: '100%',
                maxWidth: '300px',
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
                boxSizing: 'border-box',
                border: '1px solid #ddd',
                borderRadius: '8px',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <p>{joke || 'Click "Generate Joke" to get a random joke!'}</p>
            </motion.div>
          </AnimatePresence>
          
          {/* New Customization Panel */}
         {/* New Customization Panel with professional styling */}
<div className="customization-panel">
  <h3 className="customization-title">Customize Your Joke</h3>
  
  <div className="customization-options">
    <div className="customization-section">
      <h4 className="section-title">Colors</h4>
      <div className="option-row">
        <label className="option-label">
          Background:
          <input 
            type="color" 
            className="color-picker"
            value={backgroundColor} 
            onChange={(e) => setBackgroundColor(e.target.value)}
            title="Background Color"
          />
        </label>
        
        <label className="option-label">
          Text:
          <input 
            type="color" 
            className="color-picker"
            value={fontColor} 
            onChange={(e) => setFontColor(e.target.value)}
            title="Font Color"
          />
        </label>
      </div>
    </div>
    
    <div className="customization-section">
      <h4 className="section-title">Typography</h4>
      <div className="option-row">
        <label className="option-label">
          Font Family:
          <select 
            className="select-input"
            value={fontFamily} 
            onChange={(e) => setFontFamily(e.target.value)}
          >
            <option value="Arial, sans-serif">Arial</option>
            <option value="'Times New Roman', serif">Times New Roman</option>
            <option value="'Georgia', serif">Georgia</option>
            <option value="'Verdana', sans-serif">Verdana</option>
            <option value="'Comic Sans MS', cursive">Comic Sans</option>
            <option value="'Courier New', monospace">Courier New</option>
          </select>
        </label>
      </div>
      
      <div className="option-row">
        <label className="option-label">
          Font Size:
          <select 
            className="select-input"
            value={fontSize} 
            onChange={(e) => setFontSize(e.target.value)}
          >
            <option value="12px">Small</option>
            <option value="16px">Medium</option>
            <option value="20px">Large</option>
            <option value="24px">X-Large</option>
          </select>
        </label>
        
        <label className="option-label">
          Text Alignment:
          <select 
            className="select-input"
            value={textAlign} 
            onChange={(e) => setTextAlign(e.target.value)}
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </label>
      </div>
    </div>
    
    <div className="customization-section">
      <h4 className="section-title">Background Image</h4>
      <div className="option-row background-options">
        {/* Hidden file input, triggered by the button */}
        <input 
          type="file" 
          ref={fileInputRef}
          accept="image/*" 
          onChange={handleBackgroundChange} 
          style={{ display: 'none' }}
        />
        <motion.button 
          onClick={handleBackgroundClick} 
          className="background-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {backgroundImage ? 'Remove Background Image' : 'Upload Background Image'}
        </motion.button>
      </div>
    </div>
  </div>
</div>
          <div className="joke-actions">
            <motion.button 
              onClick={downloadJoke} 
              className="action-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={!joke}
            >
              Download
            </motion.button>
            <motion.button 
              onClick={shareJoke} 
              className="action-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={!joke}
            >
              Share
            </motion.button>
          </div>
        </motion.section>
        <motion.section 
          className="sample-jokes"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2>Sample Jokes</h2>
          <div className="sample-jokes-scroll">
            {sampleJokes.map((sampleJoke, index) => (
              <motion.div 
                key={index} 
                className="sample-joke"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <p>{sampleJoke}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}