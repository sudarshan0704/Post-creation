import React from 'react';
import '../Stylefile/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>Contact Us</h4>
          {/* Add contact form */}
          <form>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <textarea placeholder="Message"></textarea>
            <button type="submit">Submit</button>
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
          <p>Read our <a href="/privacy-policy">Privacy Policy</a>.</p>
        </div>

        <div className="footer-section">
          <h4>Terms of Service</h4>
          {/* Add terms of service */}
          <p>Read our <a href="/terms-of-service">Terms of Service</a>.</p>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          {/* Add social media icons */}
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Cookie Policy</h4>
          {/* Add cookie policy */}
          <p>Read our <a href="/cookie-policy">Cookie Policy</a>.</p>
        </div>

        <div className="footer-section">
          <h4>Newsletter Subscription</h4>
          {/* Add newsletter subscription */}
          <form>
            <input type="email" placeholder="Subscribe to our newsletter" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
