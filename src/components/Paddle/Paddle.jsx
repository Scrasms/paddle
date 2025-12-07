import { useEffect, useRef, useState } from 'react'
import './Paddle.css'

function Paddle({owner}) {
  const speed = 50
  const paddleRef = useRef(null)
  const [y, setY] = useState(0)

  // Focus paddle on mount, assign correct style and set correct initial height
  useEffect(() => {
    if (owner === 'player') {
      paddleRef.current.focus()
    }
    paddleRef.current.classList.add(owner + '-paddle')

    const paddleHeight = paddleRef.current.getBoundingClientRect().height
    setY(window.innerHeight / 2 - paddleHeight / 2)
  }, [])

  // Refocus on paddle every time page is clicked
  useEffect(() => {
    if (owner === "player") {
      const handleClick = () => {paddleRef.current.focus()}
      document.addEventListener("click", handleClick)
      return () => document.removeEventListener("click", handleClick)
    }
  }, [])

  // Move paddle
  useEffect(() => {
    paddleRef.current.style.transform = `translateY(${y}px)`
  }, [y])

  const handleKeyDown = (event) => {
    const paddleHeight = paddleRef.current.getBoundingClientRect().height

    switch(event.key) {
      case "ArrowUp":
        setY(y => Math.max(0, y - speed))
        break
      case "ArrowDown":
        setY(y => Math.min(y + speed, window.innerHeight - paddleHeight))
        break
      default:
        break
    }
  }

  const paddleProps = {
    className: "paddle",
    ref: paddleRef,
    onKeyDown: owner === "player" ? handleKeyDown : null,
    tabIndex: 0
  }

  return (
    <>
      <div {...paddleProps}></div>
    </>
  )
}

export default Paddle