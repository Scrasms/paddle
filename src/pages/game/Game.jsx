import ScoreBoard from '../../components/ScoreBoard/ScoreBoard'
import Paddle from '../../components/Paddle/Paddle'
import Ball from '../../components/Ball/Ball'
import ScoreProvider from '../../contexts/Score/ScoreProvider'
import './Game.css'

function Game() {

  return (
    <>
      <ScoreProvider>
        <ScoreBoard/>
        <div className='vertical-line'></div>
        <Paddle owner='player'/>
        <Paddle owner='computer'/>
        <Ball/>
      </ScoreProvider>
    </>
  )
}

export default Game