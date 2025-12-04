import { useEffect, useRef, useState } from 'react'
import ScoreBoard from '../../components/ScoreBoard/ScoreBoard'
import Paddle from '../../components/Paddle/Paddle'
import Ball from '../../components/Ball/Ball'
import './Game.css'

function Game() {
  const ballSpeed = 1
  const ballRef = useRef(null)
  const [ballX, setBallX] = useState(50)
  const [ballY, setBallY] = useState(50)
  const [gameRunning, setGameRunning] = useState(true)
  const [leftScore, setLeftScore] = useState(0)
  const [rightScore, setRightScore] = useState(0)
  const xDir = useRef(-1)
  const yDir = useRef(1)

  useEffect(() => {
    const interval = setInterval(() => {
      handleBall()
    }, 16);

    return () => clearInterval(interval)
  }, [gameRunning])

  // Move ball
  useEffect(() => {
    ballRef.current.style.left = `${ballX}%`
    ballRef.current.style.top = `${ballY}%`
  }, [ballX, ballY])

  // Handle ball movement logic
  const handleBall = () => {
    setBallX(x => updatePos(x, xDir, true))
    setBallY(y => updatePos(y, yDir, false))
  }

  // Collision logic
  const updatePos = (pos, posDir, isX) => {
    const ballRect = ballRef.current.getBoundingClientRect();
		const playerRect = document.querySelector('.player-paddle').getBoundingClientRect();
		const compRect = document.querySelector('.computer-paddle').getBoundingClientRect();

    let newPos = pos + ballSpeed * posDir.current

    // Change directions whenever the border is hit OR end the round
    if (newPos <= 0) {
      newPos = 0
      if (isX) {
        setRightScore(score => score + 1)
        resetGame()
      } else {
        posDir.current *= -1
      }
    } else if (newPos >= 100) {
      newPos = 100
      if (isX) {
        setLeftScore(score => score + 1)
        resetGame()
      } else {
        posDir.current *= -1
      }
    }

    // Bounce on paddle collision
    if (
      xDir.current < 0 &&
      ballRect.left <= playerRect.right &&
      ballRect.right >= playerRect.left &&
      ballRect.top <= playerRect.bottom &&
      ballRect.bottom >= playerRect.top
    ) {
      xDir.current = 1;
    } else if (
      xDir.current > 0 &&
      ballRect.left <= compRect.right &&
      ballRect.right >= compRect.left &&
      ballRect.top <= compRect.bottom &&
      ballRect.bottom >= compRect.top
    ) {
      xDir.current = -1;
    }

    return newPos
  }

  // Reset game state
  const resetGame = () => {
    setBallX(50)
    setBallY(50)
    xDir.current = Math.round(Math.random() * 100) < 50 ? -1 : 1
  }

  return (
    <>
      <ScoreBoard leftScore={leftScore} rightScore={rightScore}/>
      <div className='vertical-line'></div>
      <Paddle owner='player'/>
      <Paddle owner='computer'/>
      <Ball ballRef={ballRef}/>
    </>
  )
}

export default Game