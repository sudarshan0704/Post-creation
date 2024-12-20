import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import html2canvas from 'html2canvas';
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
        width: 730,
        height: 500,
        scale: 1,
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
        width: 730,
        height: 500,
        scale: 1,
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

  return (
    <div className="quote-generator">
      <div 
        ref={quoteRef} 
        className="quote-container"
        style={{
          backgroundColor: backgroundImage ? 'transparent' : backgroundColor,
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: fontColor,
          fontFamily: fontFamily,
        }}
      >
        <div className="quote-text">"{quote}"</div>
        <div className="quote-author">- {author}</div>
        <div className='name' style={{color:"black"}}>-@post-Creator</div>
      </div>
      <div className="customization-options">
        <input 
          type="color" 
          value={backgroundColor} 
          onChange={(e) => setBackgroundColor(e.target.value)}
          title="Background Color"
        />
        <input 
          type="color" 
          value={fontColor} 
          onChange={(e) => setFontColor(e.target.value)}
          title="Font Color"
        />
        <select 
          value={fontFamily} 
          onChange={(e) => setFontFamily(e.target.value)}
          title="Font Family"
        >
          <option value="Arial, sans-serif">Arial</option>
          <option value="'Times New Roman', serif">Times New Roman</option>
          <option value="'Courier New', monospace">Courier New</option>
          <option value="'Georgia', serif">Georgia</option>
          <option value="'Verdana', sans-serif">Verdana</option>
        </select>
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleBackgroundImageUpload}
          ref={fileInputRef}
          style={{ display: 'none' }}
        />
        <button onClick={() => fileInputRef.current.click()}>
          Upload Background Image
        </button>
      </div>
      <div className="button-container">
        <button
          className="generate-button"
          onClick={generateQuote}
          disabled={isLoading}
        >
          {isLoading ? 'Generating...' : 'Generate New Quote'}
        </button>
        <button
          className="download-button"
          onClick={downloadQuote}
        >
          Download Quote
        </button>
        <button
          className="share-button"
          onClick={shareQuote}
        >
          Share Quote
        </button>
      </div>
    </div>
  );
};

export default QuoteGenerator;