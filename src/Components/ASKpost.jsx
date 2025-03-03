import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';
import "../Stylefile/Askpost.css";
import GradientText from './Reactbits/SplitText';
import ScrollVelocity from './Reactbits/ScrollVelocity';
import Magnet from './Reactbits/Magnet';

function ASKpost() {
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);

  // Predefined prompt suggestions with example responses
  const promptSuggestions = [
    {
      title: "Instagram Carousel Ideas",
      prompt: "Generate 5 creative Instagram carousel post ideas for a fitness brand",
      response: "1. Before & After Transformations: Share client success stories with a slide for each month of progress.\n\n2. Myth-Busting Series: Debunk common fitness misconceptions with facts and science-backed information.\n\n3. Workout Form Guide: Show proper exercise techniques with common mistakes to avoid.\n\n4. Day-in-the-Life: Showcase a healthy daily routine from morning to night with nutrition and workout tips.\n\n5. Client Q&A: Feature questions from followers with detailed answers from fitness professionals."
    },
    {
      title: "LinkedIn Article Topics",
      prompt: "Suggest professional LinkedIn article topics for a tech startup founder",
      response: "1. \"From Idea to Launch: Our Startup Journey and Key Lessons Learned\"\n\n2. \"How We Built a Remote-First Culture That Actually Works\"\n\n3. \"The Technology Stack Behind Our Success: Why We Chose It\"\n\n4. \"Fundraising in a Competitive Market: Strategies That Worked For Us\"\n\n5. \"Building With Users in Mind: Our Customer-Centric Development Approach\""
    },
    {
      title: "TikTok Content Ideas",
      prompt: "Create engaging TikTok content ideas for a small bakery",
      response: "1. Behind-the-Scenes Timelapse: Show the process of decorating an intricate cake from start to finish.\n\n2. Recipe Hacks: Share quick 15-second baking shortcuts and tricks.\n\n3. Taste Test Challenge: Blindfold staff to guess unusual flavor combinations.\n\n4. Day in the Life: Document a baker's day starting at 4 AM.\n\n5. Transformation Videos: Show a plain cake being transformed into a showstopper with trending music."
    },
    {
      title: "Twitter Thread Ideas",
      prompt: "Generate Twitter thread topics for a personal finance expert",
      response: "1. \"10 Money Habits That Changed My Financial Life (A Thread)\"\n\n2. \"The Truth About Index Fund Investing That No One Tells You\"\n\n3. \"How I Paid Off $50K in Student Loans in 18 Months: Step by Step\"\n\n4. \"Breaking Down the FIRE Movement: Is Financial Independence Really Possible?\"\n\n5. \"Common Tax Deductions Most People Miss: Save Thousands This Year\""
    }
  ];

  const handleSuggestionClick = (suggestion) => {
    setUserInput(suggestion.prompt);
    setSelectedSuggestion(suggestion);
  };

  const handleUseResponse = () => {
    if (selectedSuggestion) {
      setResponse(selectedSuggestion.response);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setResponse('Loading...');
    setSelectedSuggestion(null);

    const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCxrjWwKYDy9mAn3GwDbzxbxI6KsDeAHhY";
    const payload = {
      contents: [{
        parts: [{ text: userInput }]
      }]
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (data.candidates && data.candidates.length > 0) {
        const content = data.candidates[0].content;
        let formattedContent = '';
        content.parts.forEach(part => {
          formattedContent += part.text;
        });
        setResponse(formattedContent);
      } else {
        console.log('No content found');
        setResponse('No content found');
      }
    } catch (error) {
      console.error('Error:', error);
      setResponse('Error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="askpost-page">
      <Navigation />

      {/* <header className="askpost-header">
        {/* <h1 className="glowing-text">
          <GradientText
            colors={["#4aea2e", "#4aea2e", "#ffffff", "#4aea2e"]}
            animationSpeed={5}
            showBorder={false}
            className="custom-class"
          >
            Idea Generator
          </GradientText>
        </h1> */}
        {/* <p>
          <ScrollVelocity
            texts={['<Generate new ideas for>', 'Different types of posts']}
            velocity={30}
            className="custom-scroll-text"
          />
        </p> 
      </header> */}

      <main className="askpost-main">
        <section className="idea-generator">
          <div className="idea-generator-content">
            <h2>Get Inspired with AI-Powered Ideas</h2>
            <p>Enter a topic or theme to generate creative post ideas</p>
            <form onSubmit={handleSubmit} className="idea-form">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Enter your topic or theme"
                required
              />
              <Magnet padding={20} disabled={false} magnetStrength={30}>
                <button type="submit" className="generate-button">Generate Ideas</button>
              </Magnet>
            </form>
          </div>
        </section>

        {/* New Suggestion Section */}
      
        <section className="response-section">
          <h2>Generated Ideas</h2>
          <div className="response-container">
            {isLoading ? (
              <p>Generating amazing ideas...</p>
            ) : (
              response.split('\n').map((paragraph, index) => (
                <p key={index} className="response-paragraph">{paragraph}</p>
              ))
            )}
          </div>
        </section>
        <section className="suggestion-section">
          <h2>Try These Prompts</h2>
          <p>Click on any suggestion to use it as your prompt</p>
          
          <div className="suggestion-cards">
            {promptSuggestions.map((suggestion, index) => (
              <div 
                key={index} 
                className={`suggestion-card ${selectedSuggestion === suggestion ? 'selected' : ''}`}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <h3>{suggestion.title}</h3>
                <p className="suggestion-prompt">{suggestion.prompt}</p>
                {selectedSuggestion === suggestion && (
                  <button 
                    className="use-example-button"
                    onClick={handleUseResponse}
                  >
                    See Example Response
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>


        <section className="features">
          <h2>Why Use Our Idea Generator?</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <i className="fas fa-lightbulb"></i>
              <h3>Instant Inspiration</h3>
              <p>Get creative ideas in seconds</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-brain"></i>
              <h3>AI-Powered</h3>
              <p>Leverage advanced AI for unique suggestions</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-chart-line"></i>
              <h3>Boost Engagement</h3>
              <p>Create content that resonates with your audience</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default ASKpost;