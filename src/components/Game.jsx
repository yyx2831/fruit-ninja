import React, { useEffect, useState } from 'react';

const shapes = [
  { type: 'square', speed: 1, score: 1 },
  { type: 'circle', speed: 1.25, score: 2 },
  { type: 'triangle', speed: 1.5, score: 3 },
  { type: 'hexagon', speed: 1.75, score: 4 },
];

function Game({ onEndGame }) {
  const [elements, setElements] = useState([]);
  const [score, setScore] = useState(0);
  const [swipePath, setSwipePath] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setElements(prev => [
        ...prev,
        { ...shapes[Math.floor(Math.random() * shapes.length)], id: Math.random(), top: 0, left: Math.random() * (window.innerWidth - 50) },
      ]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const moveInterval = setInterval(() => {
      setElements(prev =>
        prev.map(el => ({ ...el, top: el.top + el.speed }))
      );
    }, 50);

    return () => clearInterval(moveInterval);
  }, []);

  useEffect(() => {
    const endGameCheck = elements.some(el => el.top >= window.innerHeight);
    if (endGameCheck) {
      onEndGame();
    }
  }, [elements, onEndGame]);

  const handleSwipe = (x, y) => {
    elements.forEach(el => {
      const elRect = { top: el.top, left: el.left, right: el.left + 50, bottom: el.top + 50 };
      if (x >= elRect.left && x <= elRect.right && y >= elRect.top && y <= elRect.bottom) {
        setElements(prev => prev.filter(element => element.id !== el.id));
        setScore(prev => prev + el.score);
      }
    });
  };

  const handleMouseMove = (event) => {
    setSwipePath(prev => [...prev, { x: event.clientX, y: event.clientY }]);
    handleSwipe(event.clientX, event.clientY);
  };

  const handleTouchMove = (event) => {
    const touch = event.touches[0];
    setSwipePath(prev => [...prev, { x: touch.clientX, y: touch.clientY }]);
    handleSwipe(touch.clientX, touch.clientY);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [elements]);

  return (
    <div className="game">
      <div className="score">Score: {score}</div>
      {elements.map(el => (
        <div
          key={el.id}
          className={`element ${el.type}`}
          style={{ top: el.top, left: el.left }}
        >
          {el.type}
        </div>
      ))}
    </div>
  );
}

export default Game;
