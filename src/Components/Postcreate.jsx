import React, { useState } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import Memes from './Memes';
import QuoteGenerator from './Quote';
import Jokes from './Jokes';
import Facts from './Facts';


// In your renderComponent function:

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
      case 'facts':
        return <Facts />;
    
      default:
        return <Memes />;
    }
  };

  return (
    <div className="postcreate-container">
      <Navigation />
      <div className="content-layout">
        <aside className="sidebar">
          <h2>Content Creator</h2>
          <nav className="sidebar-nav">
            <ul>
              <motion.li
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  className={activeComponent === 'memes' ? 'active' : ''}
                  onClick={() => setActiveComponent('memes')}
                >
                  Memes
                </button>
              </motion.li>
              <motion.li
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  className={activeComponent === 'quotes' ? 'active' : ''}
                  onClick={() => setActiveComponent('quotes')}
                >
                  Quotes
                </button>
              </motion.li>
              <motion.li
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  className={activeComponent === 'jokes' ? 'active' : ''}
                  onClick={() => setActiveComponent('jokes')}
                >
                  Jokes
                </button>
              </motion.li>
              <motion.li
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  className={activeComponent === 'story' ? 'active' : ''}
                  onClick={() => setActiveComponent('story')}
                >
                  Story
                </button>
              </motion.li>
              <motion.li
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  className={activeComponent === 'facts' ? 'active' : ''}
                  onClick={() => setActiveComponent('facts')}
                >
                  Facts
                </button>
              </motion.li>
            
            </ul>
          </nav>
        </aside>
        <main className="main-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeComponent}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
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