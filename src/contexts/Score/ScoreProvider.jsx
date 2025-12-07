import { useState } from 'react';
import { ScoreContext } from './ScoreContext.jsx';

function ScoreProvider({ children }) {
  const [leftScore, setLeftScore] = useState(0);
  const [rightScore, setRightScore] = useState(0);

  return (
    <ScoreContext.Provider
      value={{ leftScore, setLeftScore, rightScore, setRightScore }}
    >
      {children}
    </ScoreContext.Provider>
  );
}

export default ScoreProvider;
