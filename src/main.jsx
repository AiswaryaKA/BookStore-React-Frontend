import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Contextshare from './context/Contextshare.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId='67825625620-g78abbv66a1sc9lv54lqehkp83u5en3l.apps.googleusercontent.com'>

        <Contextshare>
          <App />
        </Contextshare>

      </GoogleOAuthProvider>
    </BrowserRouter>

  </StrictMode>,
)
