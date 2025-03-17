import React, { useEffect } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import comics from'../images/comicsspider.jpg';
import memes from'../images/memes.png';
import story from'../images/story.jpg';
import jokes from'../images/jokes.png';
import '../Stylefile/About.css';

export default function About() {
  // Add useEffect hook to implement JavaScript functionality
  useEffect(() => {
    // Function to handle button click and scroll to video section
    const scrollToVideo = () => {
      const videoSection = document.querySelector('.overview-container');
      if (videoSection) {
        videoSection.scrollIntoView({ behavior: 'smooth' });
      }
    };

    // Function to handle fade and appear effects on scroll
    const handleScrollEffects = () => {
      const sections = [
        document.querySelector('.overview-container'),
        document.querySelector('#main'),
        document.querySelector('#main1'),
        document.querySelector('.testimonial-section')
      ];
      
      const topSection = document.querySelector('#top');
      
      // Check if elements exist
      if (!sections.every(section => section) || !topSection) return;
      
      window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        
        // Fade out top section as user scrolls down
        const topOpacity = Math.max(0, 1 - scrollPosition / 500);
        topSection.style.opacity = topOpacity;
        
        // Make sections appear slowly when scrolled into view
        sections.forEach(section => {
          if (!section) return;
          
          const sectionTop = section.getBoundingClientRect().top;
          const windowHeight = window.innerHeight;
          
          // When section is entering viewport
          if (sectionTop < windowHeight * 0.8) {
            section.style.opacity = 1;
            section.style.transform = 'translateY(0)';
          } else {
            section.style.opacity = 0;
            section.style.transform = 'translateY(50px)';
          }
        });
      });
      
      // Initialize sections to be hidden
      sections.forEach(section => {
        if (section) {
          section.style.opacity = 0;
          section.style.transform = 'translateY(50px)';
          section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        }
      });
    };

    // Add click event to the button
    const button = document.querySelector('.button');
    if (button) {
      button.addEventListener('click', scrollToVideo);
    }
    
    // Initialize scroll effects
    handleScrollEffects();
    
    // Cleanup event listeners on component unmount
    return () => {
      const button = document.querySelector('.button');
      if (button) {
        button.removeEventListener('click', scrollToVideo);
      }
      window.removeEventListener('scroll', handleScrollEffects);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div id='mainview'>
      {/* Navigation Component */}
      <Navigation />

      {/* Top Section */}
      <div id='top'>
        <h1 id='h1'>Get to work, with a lot less work</h1>
        <h2 className='change'>
          Post Creator delivers tools that help you move your work forward faster, keep it safe, and let you embed with ease.
        </h2>
        <div id='imagesetor'>
          {/* <img src={comics} alt="img" /> */}
        </div>
      
        <div className="about-container">
          <p className='text'>We create memes, quotes, facts, stories, and comics for everyone!
            <h4>About Our Platform</h4>
            <button className='button'>click here</button>
          </p>
          {/* <h3 className='change1'>"We create hilarious memes, mind-blowing facts, inspiring quotes, and captivating stories—all designed to entertain, educate, and inspire you."</h3> */}
        </div>
      </div>

      <div className="overview-container">
        <table>
          <tr>
            <td className="overview-text">
              <h2>Play the Video for Effective Use of Our Website</h2>
              <p>Learn how to navigate and make the most out of our platform with this quick guide.</p>
            </td>
            <td className="overview-video">
              <video autoPlay muted loop controls>
                <source src="../images/video2/video1.mp4" type="video/mp4"/>
                Your browser does not support the video tag.
              </video>
            </td>
          </tr>
        </table>
      </div>

      <div id='main'>
        <table>
          <tr>
            <td className="content-column">
              <div className="container">
                <h1>Welcome to Our Interactive Content Section</h1>
                <p>Explore different types of content below. You can also create your own content by visiting the respective sections!</p>

                <details className="content-box">
                  <summary>Memes</summary>
                  <p><strong>What are Memes?</strong> Memes are humorous images, videos, or text that are shared widely online, often with slight variations. They reflect cultural trends and humor.</p>
                  <p><em>Create your own memes:</em> Visit our <a href="../Components/Memes.jsx">Meme Creation Section</a> for user-friendly tools to design and share your memes!</p>
                </details>

                <details className="content-box">
                  <summary>Quotes</summary>
                  <p><strong>What are Quotes?</strong> Quotes are short, impactful statements from famous personalities, books, or speeches that inspire or provoke thought.</p>
                  <p><em>Share your favorite quotes:</em> Head over to our <a href="#quote-section">Quote Submission Section</a> to add your favorite quotes to our collection!</p>
                </details>

                <details className="content-box">
                  <summary>Facts</summary>
                  <p><strong>What are Facts?</strong> Facts are pieces of information that are proven to be true and are often used to educate or inform people.</p>
                  <p><em>Submit interesting facts:</em> Go to our <a href="#fact-section">Fact Submission Section</a> to contribute fascinating facts about any topic!</p>
                </details>

                <details className="content-box">
                  <summary>Stories</summary>
                  <p><strong>What are Stories?</strong> Stories are narratives that convey events, emotions, or lessons through characters and plots.</p>
                  <p><em>Write your own stories:</em> Visit our <a href="#story-section">Story Writing Section</a> to craft and publish your own tales!</p>
                </details>

                <details className="content-box">
                  <summary>Jokes</summary>
                  <p><strong>What are Jokes?</strong> Jokes are short, funny statements or stories intended to make people laugh.</p>
                  <p><em>Share your jokes:</em> Check out our <a href="#joke-section">Joke Submission Section</a> to spread laughter with your humor!</p>
                </details>
              </div>
            </td>
            <td className="side-column">
              <div id='side1'>
                <div className="know-more">
                  <span className="arrow">←</span>
                  <span> <strong className='know'>Use this for Know More</strong><br />
                  <span className='txt'>Use the left-side content box to explore more information about Facts, Jokes, Stories, and Comics—click to reveal interesting insights! </span>
                  </span>
                </div>
              </div>
              <div className="content-container">
                <div className="content-card">
                  <img src={memes} alt="memes"/>
                  <div className="content-title">memes</div>
                  <div className="player-count">10000+</div>
                </div>
                <div className="content-card">
                  <img src={jokes} alt="jokes"/>
                  <div className="content-title">jokes</div>
                  <div className="player-count">1000+</div>
                </div>
                <div className="content-card">
                  <img src={comics} alt="commics"/>
                  <div className="content-title">commics</div>
                  <div className="player-count">500+</div>
                </div>
                <div className="content-card">
                  <img src={story} alt="story"/>
                  <div className="content-title">story</div>
                  <div className="player-count">1500+</div>
                </div>
              </div>
            </td>
          </tr>
        </table>
      </div>

      <div id='main1'>
        <section className="testimonial-section">
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
                <img src={comics} alt="User Image"/>
                <div>
                  <p className="user-name">John Doe</p>
                  <p className="user-role">Founder, Post-Creation</p>
                </div>
              </div>
            </div>
            <div className="testimonial-title">
              <h2>Here's what our users say <br/> about our platform</h2>
            </div>
          </div>
          <div className="container1">
            <h3 id='h3'>Empowering Growth with Data-Driven Success – Your Journey to Higher Revenue, Loyal Customers, and Business Expansion Starts Here!</h3>
            <div className="card">
              <div className="circle" style={{ "--percentage": "40" }}>40%</div>
              <p>CURRENT PROJECT CAPACITY</p>
            </div>
            <div className="card">
              <div className="circle" style={{ "--percentage": "80" }}>80%</div>
              <p>AVG. CLIENT REVENUE INCREASE</p>
            </div>
            <div className="card">
              <div className="circle" style={{ "--percentage": "57" }}>57%</div>
              <p>CLIENTS WHO WENT ON TO GET FUNDING</p>
            </div>
            <div className="card">
              <div className="circle" style={{ "--percentage": "83" }}>83%</div>
              <p>REPEAT CUSTOMERS</p>
            </div>
            <div className="card">
              <div className="circle" style={{ "--percentage": "93" }}>93%</div>
              <p>NEW BUSINESS FROM REFERRALS</p>
            </div>
          </div>
        </section>
      </div>
      <Footer/>
    </div>
  );
}