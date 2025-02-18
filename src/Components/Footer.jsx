import React, { useState } from 'react';
import '../Stylefile/Footer.css';

function Footer() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Format the message for WhatsApp
    const whatsappMessage = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`
    );
    
    // WhatsApp API URL with your number and pre-filled message
    const whatsappUrl = `https://wa.me/917676045748?text=${whatsappMessage}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
    
    // Clear the form
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>Contact Us</h4>
          <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              placeholder="Name" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input 
              type="email" 
              placeholder="Email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea 
              placeholder="Message" 
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <button type="submit">WhatsApp</button>
          </form>
        </div>

        <div className="footer-section">
          <h4>Analytics Tracking</h4>
          {/* Add analytics tracking */}
          <p>Track your interactions for better service.</p>
        </div>

        <div className="footer-section">
          <h4>Privacy Policy</h4>
          {/* Add privacy policy */}
          <p>Read our <a href="http://type.link/kmragusudarshan">Privacy Policy</a>.</p>
        </div>

        <div className="footer-section">
          <h4>Terms of Service</h4>
          {/* Add terms of service */}
          <p>Read our <a href="/about">Terms of Service</a>.</p>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          {/* Add social media icons */}
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Github</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Cookie Policy</h4>
          {/* Add cookie policy */}
          <p>Read our <a href="/about">Cookie Policy</a>.</p>
        </div>

        <div className="footer-section">
          <h4>Post-Creator</h4>
          {/* Add newsletter subscription */}
          {/* <form>
            <input type="email" placeholder="Subscribe to our newsletter" />
            <button type="submit">Subscribe</button>
          </form> */}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
