import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import '../Stylefile/Homestyle.css';

export default function Homepage() {
  const [recentPosts, setRecentPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating an API call to fetch recent posts
    const fetchRecentPosts = async () => {
      setIsLoading(true);
      try {
        // Replace this with an actual API call in the future
        const response = await new Promise(resolve => 
          setTimeout(() => resolve([
            { id: 1, title: 'AI-Generated Landscape', image: 'https://source.unsplash.com/random/800x600?landscape' },
            { id: 2, title: 'Futuristic City', image: 'https://source.unsplash.com/random/800x600?futuristic' },
            { id: 3, title: 'Abstract Art', image: 'https://source.unsplash.com/random/800x600?abstract' }
          ]), 1000)
        );
        setRecentPosts(response);
      } catch (error) {
        console.error('Error fetching recent posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentPosts();
  }, []);

  return (
    <div className="homepage">
      <Navigation />
      <header className="homepage-header">
        <h1 className="glowing-text">Welcome to PostCreator </h1>
        <p>Create a Multiple Type Of Post with post Creator</p>
      </header>

      <main className="homepage-main">
        <section className="hero">
          <div className="hero-content">
            <h2>Create Stunning Content with PostCreator</h2>
            <p>Manage Your Daily Post Upload with PostCreator</p>
            <Link to="/generate" className="cta-button">Start Creating</Link>
          </div>
          <div className="hero-image">
            <img src="https://source.unsplash.com/random/1200x800?ai" alt="AI-generated art" className="floating" />
          </div>
        </section>

        <section className="features">
          <h2>Powerful Features</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <i className="fas fa-magic"></i>
              <h3>Ease Create</h3>
              <p>Create unique content with a click</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-palette"></i>
              <h3>Style Customization</h3>
              <p>Download Freely</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-chart-line"></i>
              <h3>Share Directly</h3>
              <p>Get more Follwers Just by Uploading Post</p>
            </div>
          </div>
        </section>

        <section className="recent-posts">
          <h2>Type of Post...</h2>
          {isLoading ? (
            <p>Generating amazing content...</p>
          ) : (
            <div className="post-grid">
              {recentPosts.map(post => (
                <div key={post.id} className="post-card">
                  <img src={post.image} alt={post.title} />
                  <h3>{post.title}</h3>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="homepage-footer">
        <p>&copy; 2023 PostCreator AI. Empowering creativity through artificial intelligence.</p>
      </footer>
    </div>
  );
}