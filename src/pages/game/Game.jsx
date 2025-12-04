import { useState } from 'react'
import ScoreBoard from '../../components/ScoreBoard/ScoreBoard'
import './Game.css'
import Paddle from '../../components/Paddle/Paddle'

function Game() {
  const [leftScore, setLeftScore] = useState(0)
  const [rightScore, setRightScore] = useState(0)

  return (
    <>
      <ScoreBoard leftScore={leftScore} rightScore={rightScore}/>
      <div className='vertical-line'></div>
      <Paddle owner='player'/>
      <Paddle owner='computer'/>
    </>
  )
}

export default Game