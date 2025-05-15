import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import { AppRouter } from './router/Approuter'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <AppRouter />
    </StrictMode>,
  </BrowserRouter>
)
