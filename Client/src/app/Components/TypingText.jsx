'use client';

import { useEffect, useState } from 'react';

export default function TypingText({ text = '', typingSpeed = 40, startDelay = 0, className = '', showCaret = true }) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let timeoutId;
    let index = 0;

    const start = () => {
      timeoutId = setInterval(() => {
        index += 1;
        setDisplayed(text.slice(0, index));
        if (index >= text.length) {
          clearInterval(timeoutId);
        }
      }, typingSpeed);
    };

    const delayId = setTimeout(start, startDelay);
    return () => {
      clearTimeout(delayId);
      if (timeoutId) clearInterval(timeoutId);
    };
  }, [text, typingSpeed, startDelay]);

  return (
    <span className={className}>
      {displayed}
      {showCaret && <span className="caret">|</span>}
    </span>
  );
}


