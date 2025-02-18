import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import html2canvas from 'html2canvas';
import '../Stylefile/Story.css';

export default function Story() {
  const [story, setStory] = useState('');
  const [title, setTitle] = useState('');
  const [moral, setMoral] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState('');

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

  const captureStory = () => {
    const storyElement = document.querySelector('.story-display');
    return html2canvas(storyElement).then(canvas => {
      return canvas.toDataURL('image/jpeg');
    });
  };

  const downloadStory = async () => {
    const imgData = await captureStory();
    const link = document.createElement('a');
    link.href = imgData;
    link.download = 'story.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const shareStory = async () => {
    const imgData = await captureStory();
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Generated Story',
          text: 'Check out this story!',
          files: [new File([imgData], 'story.jpg', { type: 'image/jpeg' })],
        });
        console.log('Story shared successfully');
      } catch (error) {
        console.log('Error sharing story:', error);
      }
    } else {
      alert('Web Share API not supported in your browser');
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
              style={{
                backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
                backgroundColor: backgroundImage ? 'transparent' : '#2c2c2c'
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <div className="story-content">
                <h3 className="story-title">{title}</h3>
                <p className="story-text">{story}</p>
                <p className="story-moral">Moral: {moral}</p>
                <p className="story-signature">-@post-Creator</p>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="story-actions">
            <div className="file-input-wrapper">
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
                onClick={downloadStory} 
                className="action-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={!story}
              >
                Download
              </motion.button>
              <motion.button 
                onClick={shareStory} 
                className="action-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={!story}
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