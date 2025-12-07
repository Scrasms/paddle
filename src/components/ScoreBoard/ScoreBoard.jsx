import { useContext } from 'react';
import { ScoreContext } from '../../contexts/Score/ScoreContext';
import './ScoreBoard.css';

function ScoreBoard() {
  const { leftScore, rightScore } = useContext(ScoreContext);
  return (
    <>
      <div className="score-container">
        <div className="left-score">{leftScore}</div>
        <div className="right-score">{rightScore}</div>
      </div>
    </>
  );
}

export default ScoreBoard;
