import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import html2canvas from 'html2canvas';
import { motion, AnimatePresence } from 'framer-motion';
import '../Stylefile/Story.css';

export default function Story() {
  const [story, setStory] = useState('');
  const [title, setTitle] = useState('');
  const [moral, setMoral] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState('');
  const storyDisplayRef = useRef(null);
  const fileInputRef = useRef(null);
  
  // New state variables for customization
  const [backgroundColor, setBackgroundColor] = useState('#2c2c2c');
  const [fontColor, setFontColor] = useState('#ffffff');
  const [fontFamily, setFontFamily] = useState('Georgia, serif');
  const [fontSize, setFontSize] = useState('16px');
  const [titleColor, setTitleColor] = useState('#f5d76e');
  const [moralColor, setMoralColor] = useState('#7bd67b');

  useEffect(() => {
    fetchStory();
  }, []);

  const fetchStory = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://shortstories-api.onrender.com/');
      setStory(response.data.story);
      setTitle(response.data.title || 'Untitled Story');
      setMoral(response.data.moral || 'Every story has a lesson to learn.');
    } catch (error) {
      console.error('Error fetching story:', error);
      setStory('Oops! Failed to fetch a story. Please try again.');
      setTitle('Error');
      setMoral('');
    } finally {
      setIsLoading(false);
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

  const downloadStory = async () => {
    if (!storyDisplayRef.current) return;
    
    try {
      const canvas = await html2canvas(storyDisplayRef.current, {
        width: storyDisplayRef.current.offsetWidth,
        height: storyDisplayRef.current.offsetHeight,
        scale: 2,
      });
      const jpeg = canvas.toDataURL('image/jpeg');
      
      const link = document.createElement('a');
      link.href = jpeg;
      link.download = `${title.replace(/\s+/g, '-').toLowerCase()}.jpeg`;
      link.click();
      
      return jpeg; // Return the jpeg data URL for potential sharing
    } catch (error) {
      console.error('Error creating image:', error);
      alert('Failed to create image. Please try again.');
      return null;
    }
  };

  const shareStory = async () => {
    if (!navigator.share) {
      alert('Web Share API not supported in your browser');
      return;
    }

    try {
      // Generate the image using html2canvas
      const canvas = await html2canvas(storyDisplayRef.current, {
        width: storyDisplayRef.current.offsetWidth,
        height: storyDisplayRef.current.offsetHeight,
        scale: 2,
      });
      
      // Convert to blob
      canvas.toBlob(async (blob) => {
        if (!blob) {
          console.error('Failed to create blob');
          return;
        }
        
        // Create a File object from the blob
        const file = new File([blob], `${title.replace(/\s+/g, '-').toLowerCase()}.jpeg`, { type: 'image/jpeg' });
        
        // Share the file
        try {
          await navigator.share({
            title: title,
            text: `Check out this story: ${title}`,
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
    <div className="story-container">
      <motion.h1 
        className="page-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Story Generator
      </motion.h1>
      <div className="content-wrapper">
        <motion.section 
          className="story-generator"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Generate a Random Story</h2>
          <motion.button 
            onClick={fetchStory} 
            className="generate-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isLoading}
          >
            {isLoading ? 'Generating...' : 'Generate Story'}
          </motion.button>
          <AnimatePresence mode="wait">
            <motion.div 
              key={story}
              className="story-display" 
              ref={storyDisplayRef}
              style={{
                backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
                backgroundColor: backgroundImage ? 'transparent' : backgroundColor,
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <div 
                className="story-content"
                style={{
                  fontFamily: fontFamily,
                  fontSize: fontSize,
                  color: fontColor,
                }}
              >
                <h3 
                  className="story-title"
                  style={{ color: titleColor }}
                >
                  {title}
                </h3>
                <p className="story-text">{story}</p>
                <p 
                  className="story-moral"
                  style={{ color: moralColor }}
                >
                  Moral: {moral}
                </p>
                <p className="story-signature">-@post-Creator</p>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* New Customization Panel */}
          <div className="customization-panel">
            <h3 className="customization-title">Customize Your Story</h3>
            
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
                      title="Text Color"
                    />
                  </label>
                </div>
                
                <div className="option-row">
                  <label className="option-label">
                    Title:
                    <input 
                      type="color" 
                      className="color-picker"
                      value={titleColor} 
                      onChange={(e) => setTitleColor(e.target.value)}
                      title="Title Color"
                    />
                  </label>
                  
                  <label className="option-label">
                    Moral:
                    <input 
                      type="color" 
                      className="color-picker"
                      value={moralColor} 
                      onChange={(e) => setMoralColor(e.target.value)}
                      title="Moral Color"
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
                      <option value="Georgia, serif">Georgia</option>
                      <option value="'Times New Roman', serif">Times New Roman</option>
                      <option value="Arial, sans-serif">Arial</option>
                      <option value="'Verdana', sans-serif">Verdana</option>
                      <option value="'Palatino', serif">Palatino</option>
                      <option value="'Bookman', serif">Bookman</option>
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
                      <option value="14px">Small</option>
                      <option value="16px">Medium</option>
                      <option value="18px">Large</option>
                      <option value="20px">X-Large</option>
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
          
          <div className="story-actions">
            <div className="action-buttons">
              <motion.button 
                onClick={downloadStory} 
                className="action-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={!story}
              >
                Download Story
              </motion.button>
              <motion.button 
                onClick={shareStory} 
                className="action-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={!story}
              >
                Share Story
              </motion.button>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}