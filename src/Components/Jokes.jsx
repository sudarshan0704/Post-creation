import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import '../Stylefile/Jokes.css';

export default function Jokes() {
  const [joke, setJoke] = useState('');
  const [backgroundImage, setBackgroundImage] = useState('');
  const [sampleJokes, setSampleJokes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  const downloadJoke = () => {
    const element = document.createElement('a');
    const file = new Blob([joke], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = 'joke.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const shareJoke = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Funny Joke',
        text: joke,
      }).then(() => console.log('Shared successfully'))
        .catch((error) => console.log('Error sharing:', error));
    } else {
      alert('Web Share API not supported in your browser');
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
              className="joke-display" 
              style={{backgroundImage: `url(${backgroundImage})`}}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <p>{joke || 'Click "Generate Joke" to get a random joke!'}</p>
            </motion.div>
          </AnimatePresence>
          <div className="joke-actions">
            <input type="file" accept="image/*" onChange={handleBackgroundChange} className="bg-input" />
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