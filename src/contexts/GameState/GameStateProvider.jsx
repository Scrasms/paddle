import { useState } from 'react';
import { GameStateContext } from './GameStateContext.jsx';

function GameStateProvider({ children }) {
  const [gameRunning, setGameRunning] = useState(true);

  return (
    <GameStateContext.Provider
      value={{ gameRunning, setGameRunning }}
    >
      {children}
    </GameStateContext.Provider>
  );
}

export default GameStateProvider;
