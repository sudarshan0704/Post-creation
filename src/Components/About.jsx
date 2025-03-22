import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';
import comics from '../images/comicsspider.jpg';
import vdio from '../images/video.mp4';
import memes from '../images/memes.png';
import story from '../images/story.jpg';
import jokes from '../images/jokes.png';
import '../Stylefile/About.css';
import Magnet from './Reactbits/Magnet';
import GradientText from './Reactbits/SplitText';
import ScrollVelocity from './Reactbits/ScrollVelocity';

export default function About() {
  const videoRef = useRef(null);

  useEffect(() => {
    // Handle video autoplay
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Autoplay prevented:", error);
        // Add visual cue for user to interact with video if autoplay fails
      });
    }

    const handleScrollEffects = () => {
      const sections = [
        document.querySelector('.overview-container'),
        document.querySelector('.content-section'),
        document.querySelector('.testimonial-section'),
        document.querySelector('.stats-section')
      ];
      
      const topSection = document.querySelector('.about-header');
      
      if (!sections.every(section => section) || !topSection) return;
      
      const handleScroll = () => {
        const scrollPosition = window.scrollY;
        
        const topOpacity = Math.max(0, 1 - scrollPosition / 500);
        topSection.style.opacity = topOpacity;
        
        sections.forEach(section => {
          if (!section) return;
          
          const sectionTop = section.getBoundingClientRect().top;
          const windowHeight = window.innerHeight;
          
          if (sectionTop < windowHeight * 0.8) {
            section.style.opacity = 1;
            section.style.transform = 'translateY(0)';
          } else {
            section.style.opacity = 0;
            section.style.transform = 'translateY(50px)';
          }
        });
      };
      
      window.addEventListener('scroll', handleScroll);
      
      sections.forEach(section => {
        if (section) {
          section.style.opacity = 0;
          section.style.transform = 'translateY(50px)';
          section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        }
      });
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    };
    
    handleScrollEffects();
    
    return () => {
      window.removeEventListener('scroll', handleScrollEffects);
    };
  }, []);

  return (
    <div className="homepage about-page">
      <Navigation />

      <header className="homepage-header about-header">
        <h1 className="glowing-text"> 
          <GradientText
            colors={["#4aea2e", "#4aea2e", "#ffffff", "#4aea2e"]}
            animationSpeed={5}
            showBorder={false}
            className="custom-class"
          >
            About Us
          </GradientText>
        </h1>
        <p>
          <ScrollVelocity
            texts={['<Get to know the team behind>', 'Post-Creator']} 
            velocity={30} 
            className="custom-scroll-text"
          />
        </p>
      </header>

      <main className="homepage-main">
        <section className="hero">
          <div className="hero-content">
            <h2>Get to work, with a lot less work</h2>
            <p>Post Creator delivers tools that help you move your work forward faster, keep it safe, and let you embed with ease.</p>
            <div>
              <Magnet padding={50} disabled={false} magnetStrength={50}>
                <Link to="/generate" className="cta-button">
                  <p>Start Creating</p>
                </Link>
              </Magnet>
            </div>
          </div>
          <div className="hero-image">
            <img src={comics} alt="Comics showcase" className="floating" />
          </div>
        </section>

        <section className="overview-container feature">
          <h2>How It Works</h2>
          <div className="overview-content">
            <div className="overview-text">
              <h3>Play the Video for Effective Use of Our Website</h3>
              <p>Learn how to navigate and make the most out of our platform with this quick guide.</p>
            </div>
            <div>
      
<video
  ref={videoRef}
  autoPlay
  muted
  loop

  playsInline
  className="feature-video"
>
  <source src={vdio} type="video/mp4"/>
  <img src="./images/fallback-image.jpg" alt="Fallback image" className="fallback-image"/>
  Your browser does not support the video tag.
</video>
    </div>
          </div>
        </section>

        <section className="content-section feature">
          <h2>Content We Create</h2>
          <div className="feature-grid">
            <div className="feature-cards">
              <i className="fas fa-laugh">Memes</i>
              <p>Humorous images that reflect cultural trends</p>
            </div>
            <div className="feature-cards">
              <i className="fas fa-quote-right">Quotes</i>
              <p>Inspiring words from notable personalities</p>
            </div>
            <div className="feature-cards">
              <i className="fas fa-book">Stories</i>
              <p>Engaging narratives to capture imagination</p>
            </div>
            <div className="feature-cards">
              <i className="fas fa-smile">Jokes</i>
              <p>Funny content to brighten your day</p>
            </div>
          </div>
        </section>

        <section className="recent-posts">
          <h2>Explore Our Content</h2>
          <div className="post-grid">
            <div className="post-card">
              <img src={memes} alt="Memes" />
              <h3>Memes</h3>
            </div>
            <div className="post-card">
              <img src={jokes} alt="Jokes" />
              <h3>Jokes</h3>
            </div>
            <div className="post-card">
              <img src={comics} alt="Comics" />
              <h3>Comics</h3>
            </div>
            <div className="post-card">
              <img src={story} alt="Stories" />
              <h3>Stories</h3>
            </div>
          </div>
        </section>

        <section className="testimonial-section feature">
          <h2>What Our Users Say</h2>
          <div className="testimonial-container">
            <div className="testimonial">
              <span className="quote">"</span>
              <p className="testimonial-text">
                They listened to what we needed and wanted for our meme and quotes platform...
              </p>
              <p className="testimonial-subtext">
                The creative tools and easy-to-use interface made it possible to generate content quickly and effectively!
              </p>
              <hr/>
              <div className="user-info">
                <img src={comics} alt="User" />
                <div>
                  <p className="user-name">John Doe</p>
                  <p className="user-role">Founder, Post-Creation</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="stats-section feature">
          <h2>Growth & Success Metrics</h2>
          <h3>Empowering Growth with Data-Driven Success</h3>
          <div className="stats-container">
            <div className="stat-card">
              <div className="stat-value">40%</div>
              <p>CURRENT PROJECT CAPACITY</p>
            </div>
            <div className="stat-card">
              <div className="stat-value">80%</div>
              <p>AVG. CLIENT REVENUE INCREASE</p>
            </div>
            <div className="stat-card">
              <div className="stat-value">57%</div>
              <p>CLIENTS WHO WENT ON TO GET FUNDING</p>
            </div>
            <div className="stat-card">
              <div className="stat-value">83%</div>
              <p>REPEAT CUSTOMERS</p>
            </div>
            <div className="stat-card">
              <div className="stat-value">93%</div>
              <p>NEW BUSINESS FROM REFERRALS</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}