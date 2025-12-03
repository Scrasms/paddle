import { useNavigate } from "react-router"
import { useContext } from "react"
import { ThemeContext } from "../../context/ThemeContext"
import logo from "../../assets/paddle-large.png"
import './Home.css'

function Home() {
  const navigate = useNavigate(null)
  const {themeList, themeNo, setThemeNo} = useContext(ThemeContext)

  return (
    <>
      <div className="home-container">
        <h1> Welcome to Paddle! </h1>
        <img className = "logo" src={logo}/>
        <div className = "button-container">
          <button className="home-button"> Stats </button>

          <button
            className="home-button"
            onClick={() => navigate("/game")}> Play
          </button>

          <button
            className="home-button"
            onClick={() => setThemeNo((themeNo + 1) % themeList.length)}> Theme
          </button>
        </div>
      </div>
    </>
  )
}

export default Home