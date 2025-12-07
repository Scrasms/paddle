import { useNavigate } from 'react-router';
import { useContext } from 'react';
import { ThemeContext } from '../../contexts//Theme/ThemeContext';
import logo from '../../assets/paddle-large.png';
import './Home.css';

function Home() {
  const navigate = useNavigate(null);
  const { themeList, themeNo, setThemeNo } = useContext(ThemeContext);

  return (
    <>
      <div className="home-container">
        <h1> Welcome to Paddle! </h1>
        <img className="logo" src={logo} />
        <div className="button-container">
          <button className="home-button"> STATS </button>

          <button className="home-button" onClick={() => navigate('/game')}>
            PLAY
          </button>

          <button
            className="home-button"
            onClick={() => setThemeNo((themeNo + 1) % themeList.length)}
          >
            {themeList[themeNo].toUpperCase()}
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;
