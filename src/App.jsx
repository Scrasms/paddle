import { BrowserRouter, Routes, Route, HashRouter } from 'react-router';
import ThemeProvider from './contexts/Theme/ThemeProvider';
import Home from './pages/home/Home';
import Game from './pages/game/Game';

function App() {
  return (
    <>
      <HashRouter>
        <ThemeProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game" element={<Game />} />
          </Routes>
        </ThemeProvider>
      </HashRouter>
    </>
  );
}

export default App;
