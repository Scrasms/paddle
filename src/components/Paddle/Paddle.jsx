import { useEffect, useRef, useState } from 'react'
import './Paddle.css'

function Paddle({owner}) {
  const padSpeed = 800
  const paddleRef = useRef(null)
  const padDir = useRef(0)
  const prevTimeRef = useRef(performance.now())
  const [y, setY] = useState(0)

  useEffect(() => {
    // Focus paddle on mount
    if (owner === 'player') {
      paddleRef.current.focus()
    }

    // Assign correct style
    paddleRef.current.classList.add(owner + '-paddle')

    // Set correct initial height
    const paddleHeight = paddleRef.current.getBoundingClientRect().height
    setY(window.innerHeight / 2 - paddleHeight / 2)
  }, [])

  // Refocus on paddle every time page is clicked
  useEffect(() => {
    if (owner !== "player") return

    const handleClick = () => {paddleRef.current.focus()}
    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [])

  // Move paddle
  useEffect(() => {
    paddleRef.current.style.transform = `translateY(${y}px)`
  }, [y])

  // Animations
  useEffect(() => {
    if (owner !== "player") return

    // Paddle animation loop
    let animationID
    const paddleLoop = (currentTime) => {
      const delta = (currentTime - prevTimeRef.current) / 1000
      prevTimeRef.current = currentTime

      handlePaddle(delta)
      animationID = requestAnimationFrame(paddleLoop)
    }

    prevTimeRef.current = performance.now()
    animationID = requestAnimationFrame(paddleLoop)

    return () => {
      cancelAnimationFrame(animationID)
    }
  }, [])

  // Handle paddle movement
  const handlePaddle = (delta) => setY(y => updateY(y, delta))

  // Calculate new y-coordinate
  const updateY = (y, delta) => {
    const paddleHeight = paddleRef.current.getBoundingClientRect().height
    let newY = y + padSpeed * padDir.current * delta

    // Clamp to window
    return Math.min(Math.max(0, newY), window.innerHeight - paddleHeight)
  }

  const handleKeyDown = (event) => {
    // Set paddle direction appropriately
    if (event.key === "ArrowUp") {
      padDir.current = -1
    } else if (event.key === "ArrowDown") {
      padDir.current = 1
    }
  }

  const handleKeyUp = (event) => {
    // Stop paddle movement when associated key released
    if (event.key === "ArrowUp" && padDir.current === -1 ||
      event.key === "ArrowDown" && padDir.current === 1
    ) {
      padDir.current = 0
    }
  }

  const paddleProps = {
    className: "paddle",
    ref: paddleRef,
    onKeyDown: owner === "player" ? handleKeyDown : null,
    onKeyUp: owner === "player" ? handleKeyUp : null,
    tabIndex: 0
  }

  return (
    <>
      <div {...paddleProps}></div>
    </>
  )
}

export default Paddle