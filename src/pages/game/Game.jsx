import ScoreBoard from '../../components/ScoreBoard/ScoreBoard';
import Paddle from '../../components/Paddle/Paddle';
import Ball from '../../components/Ball/Ball';
import ScoreProvider from '../../contexts/Score/ScoreProvider';
import GameStateProvider from '../../contexts/GameState/GameStateProvider';
import './Game.css';

function Game() {
  return (
    <>
      <ScoreProvider>
        <ScoreBoard />
        <div className="vertical-line"></div>
        <GameStateProvider>
          <Paddle owner="player" />
          <Paddle owner="computer" />
          <Ball />
        </GameStateProvider>
      </ScoreProvider>
    </>
  );
}

export default Game;
