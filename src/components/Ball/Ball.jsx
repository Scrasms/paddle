import { useContext, useEffect, useRef, useState } from 'react'
import { ScoreContext } from '../../contexts/Score/ScoreContext'
import './Ball.css'

function Ball() {
  const ballSpeed = 5
  const ballRef = useRef(null)
  const [ballX, setBallX] = useState(window.innerWidth / 2)
  const [ballY, setBallY] = useState(window.innerHeight / 2)
  const [gameRunning, setGameRunning] = useState(true)
  const xDir = useRef(-1)
  const yDir = useRef(1)

  const {setLeftScore, setRightScore} = useContext(ScoreContext)

  // Main game loop
  useEffect(() => {
    let animationID
    const gameLoop = () => {
      handleBall()
      animationID = requestAnimationFrame(gameLoop)
    }

    if (gameRunning) {
      gameLoop()
    }

    return () => cancelAnimationFrame(animationID)
  }, [gameRunning])

  // Move ball
  useEffect(() => {
    ballRef.current.style.transform = `translate(${ballX}px, ${ballY}px)`
  }, [ballX, ballY])

  // Update ball movement
  const handleBall = () => {
    setBallX(x => updateX(x))
    setBallY(y => updateY(y))
  }

  // Handle x-collisions
  const updateX = (x) => {
    const ballRect = ballRef.current.getBoundingClientRect()
		const playerRect = document.querySelector('.player-paddle').getBoundingClientRect()
		const compRect = document.querySelector('.computer-paddle').getBoundingClientRect()

    let newX = x + ballSpeed * xDir.current

    // End the round when the x-border is hit
    if (newX <= 0) {
      newX = 0
      setRightScore(score => score + 1)
      resetGame()
    } else if (newX >= window.innerWidth - ballRect.width) {
      newX = window.innerWidth
      setLeftScore(score => score + 1)
      resetGame()
    }

    // Bounce on paddle collision
    if (xDir.current < 0 &&
      ballRect.left <= playerRect.right &&
      ballRect.right >= playerRect.left &&
      ballRect.top <= playerRect.bottom &&
      ballRect.bottom >= playerRect.top
    ) {
      xDir.current *= -1
    } else if (xDir.current > 0 &&
      ballRect.left <= compRect.right &&
      ballRect.right >= compRect.left &&
      ballRect.top <= compRect.bottom &&
      ballRect.bottom >= compRect.top
    ) {
      xDir.current *= -1
    }

    return newX
  }

  // Handle y-collisions
  const updateY = (y) => {
    const ballRect = ballRef.current.getBoundingClientRect()

    let newY = y + ballSpeed * yDir.current

    // Bounce when y-coordinate is hit
    if (newY <= 0) {
      newY = 0
      yDir.current *= -1
    } else if (newY + ballRect.height >= window.innerHeight) {
      newY = window.innerHeight - ballRect.height
      yDir.current *= -1
    }

    return newY
  }

  // Reset game state
  const resetGame = () => {
    setBallX(window.innerWidth / 2)
    setBallY(window.innerHeight / 2)
    xDir.current = Math.round(Math.random() * 100) < 50 ? -1 : 1
    yDir.current = Math.round(Math.random() * 100) < 50 ? -1 : 1
  }

  return (
    <>
      <div className="ball" ref={ballRef}></div>
    </>
  )
}

export default Ball