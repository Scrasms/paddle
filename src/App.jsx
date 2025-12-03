import { BrowserRouter, Routes, Route } from "react-router"
import ThemeProvider from "./context/ThemeProvider"
import Home from "./pages/home/Home"
import Game from "./pages/game/Game"

function App() {
  return (
    <>
      <BrowserRouter basename="/paddle">
        <ThemeProvider>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/game" element={<Game/>}/>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  )
}

export default App
