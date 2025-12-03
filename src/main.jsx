import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  // Themes won't cache due to double-mounting with strict mode on
  <StrictMode>
    <App />
  </StrictMode>,
)
