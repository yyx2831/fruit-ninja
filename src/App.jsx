// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import StartScreen from './components/StartScreen.jsx';
import Game from './components/Game.jsx';


function App() {
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => {
    setGameStarted(true);
  };

  const endGame = () => {
    setGameStarted(false);
  };

  return (
    <div className="App">
      {gameStarted ? <Game onEndGame={endGame} /> : <StartScreen onStartGame={startGame} />}
    </div>
  );
}

export default App;
