import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Draggable from 'react-draggable';
import html2canvas from 'html2canvas';

import '../Stylefile/Memestyle.css';
import Navigation from './Navigation';
import Footer from './Footer';

export default function Memes() {
  const [memeUrl, setMemeUrl] = useState('');
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [topTextColor, setTopTextColor] = useState('#ffffff'); // Default white
  const [bottomTextColor, setBottomTextColor] = useState('#ffffff'); // Default white
  const [isLoading, setIsLoading] = useState(true);
  const [usedMemes, setUsedMemes] = useState([]);
  const memeRef = useRef(null);
  useEffect(() => {
    generateMeme();
  }, []);

  const generateMeme = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://api.imgflip.com/get_memes');
      const memes = response.data.data.memes;
      let randomMeme;
      do {
        randomMeme = memes[Math.floor(Math.random() * memes.length)];
      } while (usedMemes.includes(randomMeme.id));
      
      setMemeUrl(randomMeme.url);
      setUsedMemes(prev => [...prev, randomMeme.id]);
      setTopText('');
      setBottomText('');
      
    } catch (error) {
      console.error('Error fetching meme:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadMeme = async () => {
    if (memeRef.current) {
      try {
        const canvas = await html2canvas(memeRef.current, {
          useCORS: true,
          allowTaint: true,
          scrollY: -window.scrollY
        });
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = 'meme.png';
        link.click();
      } catch (error) {
        console.error('Error downloading meme:', error);
      }
    }
  };

  const shareMeme = async () => {
    if (memeRef.current) {
      try {
        const canvas = await html2canvas(memeRef.current, {
          useCORS: true,
          allowTaint: true,
          scrollY: -window.scrollY
        });
        canvas.toBlob(async (blob) => {
          const file = new File([blob], 'meme.png', { type: 'image/png' });
          if (navigator.share) {
            try {
              await navigator.share({
                files: [file],
                title: 'Check out this meme!',
              });
            } catch (error) {
              console.error('Error sharing:', error);
            }
          } else {
            console.log('Web Share API not supported');
            alert('Sharing is not supported on this device. You can download the meme instead.');
          }
        });
      } catch (error) {
        console.error('Error sharing meme:', error);
      }
    }
  };



  return (
    <div className="meme-page">
    
      <div className="meme-generator">
        <header className="meme-header">
          <h1 className="glowing-text">Meme Creator</h1>
          <p>Create and share hilarious memes in seconds!</p>
        </header>

        <main className="meme-main">
          <div className="meme-container" ref={memeRef}>
            {isLoading ? (
              <div className="loading-indicator">Loading amazing meme...</div>
            ) : (
              <img src={memeUrl} alt="Meme" className="meme-image" crossOrigin="anonymous" />
            )}
            <h2 className="meme-text top" style={{ color: topTextColor }}>{topText}</h2>
            <h2 className="meme-text bottom" style={{ color: bottomTextColor }}>{bottomText}</h2>
          </div>

          <div className="controls">
            <div className="text-control">
              <input
                type="text"
                placeholder="Top Text"
                value={topText}
                onChange={(e) => setTopText(e.target.value)}
              />
              <input
                type="color"
                value={topTextColor}
                onChange={(e) => setTopTextColor(e.target.value)}
                title="Choose top text color"
              />
            </div>
            <div className="text-control">
              <input
                type="text"
                placeholder="Bottom Text"
                value={bottomText}
                onChange={(e) => setBottomText(e.target.value)}
              />
              <input
                type="color"
                value={bottomTextColor}
                onChange={(e) => setBottomTextColor(e.target.value)}
                title="Choose bottom text color"
              />
            </div>
            <button onClick={generateMeme} className="cta-button">Generate New Meme</button>
            <button onClick={downloadMeme} className="cta-button">Download Meme</button>
            <button onClick={shareMeme} className="cta-button">Share Meme</button>
          </div>
        </main>

        <section className="features">
          <h2>Meme Creator Features</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <i className="fas fa-random"></i>
              <h3>Random Memes</h3>
              <p>Get a new meme template with each generation</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-palette"></i>
              <h3>Colorful Text</h3>
              <p>Customize your meme text with any color</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-download"></i>
              <h3>Easy Download</h3>
              <p>Save your meme with a single click</p>
            </div>
          </div>
        </section>
      </div>
      
    </div>
  );
}