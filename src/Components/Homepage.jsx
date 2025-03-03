import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';
import meme from '../images/meme.jpg';
import quote from '../images/quotes.jpg';
import comics from '../images/comics.jpg';
import img2 from '../images/image2.jpg';
import '../Stylefile/Homestyle.css';


// import SplitText from './SplitText'; // Adjust the path if necessary
import GradientText from './Reactbits/SplitText';

import ScrollVelocity from './Reactbits/ScrollVelocity';
import Magnet from './Reactbits/Magnet';
import SplashCursor from './Reactbits/Splashcursor';





const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};
export default function Homepage() {
  const [recentPosts, setRecentPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
  
    const fetchRecentPosts = async () => {
      setIsLoading(true);
      try {
        
        const response = await new Promise(resolve => 
          setTimeout(() => resolve([
            { id: 1, title: 'Random Memes', image:meme },
            { id: 2, title: 'Motivatinal Quotes', image: quote },
            { id: 3, title: 'Comics', image: comics }
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
    <div className="homepage" >
     
      <Navigation />
      {/* <SplashCursor/> */}

      <header className="homepage-header">
        <h1 className="glowing-text"> 
        <GradientText
  colors={["#4aea2e", "#4aea2e", "#ffffff","#4aea2e"]}
  animationSpeed={5}
  showBorder={false}
  className="custom-class"
>
  Post Creator!
</GradientText>
 </h1>
        <p><ScrollVelocity
  texts={['<Create a Multiple Type Of Post with>','Post-Creator']} 
  velocity={30} 
  className="custom-scroll-text"
/>
          
        </p>
      </header>

      <main className="homepage-main">
        <section className="hero">
          <div className="hero-content">
            <h2>Create Stunning Content with PostCreator</h2>
            <p>Manage Your Daily Post Upload with PostCreator</p>
           <div>
           <Magnet padding={50} disabled={false} magnetStrength={50}>
            <Link to="/generate" className="cta-button">
              <p>Start Creating</p>
              </Link>
              </Magnet>
           </div>
          
           
          </div>
          <div className="hero-image">
            <img src={img2} alt="AI-generated art" className="floating" />
          </div>
        </section>

        <section className="feature">
          <h2>Powerful Features</h2>
          <div className="feature-grid">
            <div className="feature-cards">
              <i className="fas fa-magic">Ease Create</i>
             
              <p>Create unique content with a click</p>
            </div>
            <div className="feature-cards">
              <i className="fas fa-palette">Free Download</i>
              
              <p>Download Freely</p>
            </div>
            <div className="feature-cards">
              <i className="fas fa-chart-line">Share Directly</i>
            
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

    <Footer/>
    </div>
  );
}