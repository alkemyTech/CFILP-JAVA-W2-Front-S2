import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router'
import './index.css'
import { AppRouter } from './router/AppRouter'
import { store } from './store'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <StrictMode>
        <AppRouter />
      </StrictMode>,
    </BrowserRouter>
  </Provider>

)
