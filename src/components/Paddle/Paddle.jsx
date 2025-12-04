import { useEffect, useRef, useState } from 'react'
import './Paddle.css'

function Paddle({owner}) {
  const paddleRef = useRef(null)
  const [y, setY] = useState(40)

  // Focus paddle on mount and assign correct style
  useEffect(() => {
    if (owner === 'player') {
      paddleRef.current.focus()
    }
    paddleRef.current.classList.add(owner + '-paddle')
  }, [])

  useEffect(() => {
    paddleRef.current.style.top = `${y}%`
  }, [y])

  // Refocus on paddle every time page is clicked
  useEffect(() => {
    if (owner === "player") {
      const handleClick = () => {paddleRef.current.focus()}
      document.addEventListener("click", handleClick)
      return () => document.removeEventListener("click", handleClick)
    }
  }, [])

  const handleKeyDown = (event) => {
    switch(event.key) {
      case "ArrowUp":
        setY(y => Math.max(0, y - 2))
        break
      case "ArrowDown":
        setY(y => Math.min(y + 2, 80))
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