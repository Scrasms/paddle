import './Ball.css'

function Ball({ballRef}) {
  return (
    <>
      <div className="ball" ref={ballRef}></div>
    </>
  )
}

export default Ball