import { useEffect, useRef, useState } from 'react';
import './Paddle.css';

function Paddle({ owner }) {
  const padSpeed = 1000;
  const paddleRef = useRef(null);
  const timeRef = useRef(0);
  const padDir = useRef(0);
  const prevTimeRef = useRef(performance.now());
  const [y, setY] = useState(0);

  useEffect(() => {
    // Focus paddle on mount
    if (owner === 'player') {
      paddleRef.current.focus();
    }

    // Assign correct style
    paddleRef.current.classList.add(owner + '-paddle');

    // Set correct initial height
    const paddleHeight = paddleRef.current.getBoundingClientRect().height;
    setY(window.innerHeight / 2 - paddleHeight / 2);
  }, []);

  // Refocus on paddle every time page is clicked
  useEffect(() => {
    if (owner !== 'player') return;

    const handleClick = () => {
      paddleRef.current.focus();
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  // Move paddle
  useEffect(() => {
    paddleRef.current.style.transform = `translateY(${y}px)`;
  }, [y]);

  // Animations
  useEffect(() => {
    // Paddle animation loop
    let animationID;
    const paddleLoop = (currentTime) => {
      const delta = (currentTime - prevTimeRef.current) / 1000;
      prevTimeRef.current = currentTime;

      handlePaddle(delta);
      animationID = requestAnimationFrame(paddleLoop);
    };

    prevTimeRef.current = performance.now();
    animationID = requestAnimationFrame(paddleLoop);

    return () => {
      cancelAnimationFrame(animationID);
    };
  }, []);

  // Handle paddle movement
  const handlePaddle = (delta) => setY((y) => updateY(y, delta));

  // Calculate new y-coordinate
  const updateY = (y, delta) => {
    const paddleRect = paddleRef.current.getBoundingClientRect()

    // Get padDir from location of ball respective to paddle
    if (owner === 'computer') {
      const ballRect = document
        .querySelector('.ball')
        .getBoundingClientRect();

      const paddleCentre = paddleRect.top + paddleRect.height / 2
      const ballCentre = ballRect.top + ballRect.height / 2

      const buffer = 20;
      const error = Math.random() * 30;
      const delay = 0.12;

      timeRef.current += delta;

      // Prevent jitter and also make AI dumber with delay and error margin
      if (timeRef.current >= delay) {
        const target = ballCentre + error;
        const diff = target - paddleCentre;

        if (Math.abs(diff) < buffer) {
          padDir.current = 0;
        } else {
          padDir.current = Math.sign(diff);
        }

        timeRef.current = 0;
      }
    }

    let newY = y + padSpeed * padDir.current * delta;

    // Clamp to window
    return Math.min(Math.max(0, newY), window.innerHeight - paddleRect.height);
  };

  const handleKeyDown = (event) => {
    // Set paddle direction appropriately
    if (event.key === 'ArrowUp') {
      padDir.current = -1;
    } else if (event.key === 'ArrowDown') {
      padDir.current = 1;
    }
  };

  const handleKeyUp = (event) => {
    // Stop paddle movement when associated key is released
    if (
      (event.key === 'ArrowUp' && padDir.current === -1) ||
      (event.key === 'ArrowDown' && padDir.current === 1)
    ) {
      padDir.current = 0;
    }
  };

  const paddleProps = {
    className: 'paddle',
    ref: paddleRef,
    onKeyDown: owner === 'player' ? handleKeyDown : null,
    onKeyUp: owner === 'player' ? handleKeyUp : null,
    tabIndex: 0,
  };

  return (
    <>
      <div {...paddleProps}></div>
    </>
  );
}

export default Paddle;
