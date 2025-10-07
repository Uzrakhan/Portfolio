import React from 'react';

/**
 * Splits a string into an array of React spans, separating by words.
 * This is crucial for GSAP staggering effects on text.
 */
const TextSplitter = ({ text }) => {
  if (!text) return null;

  // Split text by space, and map each word to a span
  const words = text.split(/\s+/);

  return (
    // This div contains the words and will effectively hide the initial position
    <div className="inline-block overflow-hidden">
      {words.map((word, index) => (
        <span 
          key={index} 
          // Crucial: Use 'inline-block' so the word can be animated and moved individually
          className="inline-block" 
          style={{ willChange: 'transform, opacity' }}
        >
          {word}
          {/* Add a non-breaking space after each word, except the last one */}
          {index < words.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </div>
  );
};

export default TextSplitter;