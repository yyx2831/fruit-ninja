import React from 'react';

function StartScreen({ onStartGame }) {
  return (
    <div className="start-screen">
      <button onClick={onStartGame}>Play</button>
    </div>
  );
}

export default StartScreen;
