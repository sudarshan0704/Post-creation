import React, { useState } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import Memes from './Memes';
import QuoteGenerator from './Quote';
import Jokes from './Jokes';
import Story from './Story';
import { motion, AnimatePresence } from 'framer-motion';
import '../Stylefile/Postcreate.css';

export default function Postcreate() {
  const [activeComponent, setActiveComponent] = useState('memes');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'memes':
        return <Memes />;
      case 'quotes':
        return <QuoteGenerator />;
      case 'jokes':
        return <Jokes />;
      case 'story':
        return <Story />;
      default:
        return <Memes />;
    }
  };

  return (
    <div className="postcreate-container">
      <Navigation />
      <div className="content-wrapper">
        <aside className="sidebar">
          <h2>Content Creator</h2>
          <nav>
            <ul>
              <li>
                <button
                  className={activeComponent === 'memes' ? 'active' : ''}
                  onClick={() => setActiveComponent('memes')}
                >
                  Memes
                </button>
              </li>
              <li>
                <button
                  className={activeComponent === 'quotes' ? 'active' : ''}
                  onClick={() => setActiveComponent('quotes')}
                >
                  Quotes
                </button>
              </li>
              <li>
                <button
                  className={activeComponent === 'jokes' ? 'active' : ''}
                  onClick={() => setActiveComponent('jokes')}
                >
                  Jokes
                </button>
              </li>
              <li>
                <button
                  className={activeComponent === 'story' ? 'active' : ''}
                  onClick={() => setActiveComponent('story')}
                >
                  Story
                </button>
              </li>
            </ul>
          </nav>
        </aside>
        <main className="main-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeComponent}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderComponent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      <Footer />
    </div>
  );
}