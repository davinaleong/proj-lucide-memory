import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
// import AppNew from './App.new.tsx'

// Initialize Capacitor plugins
import { SplashScreen } from '@capacitor/splash-screen'
import { StatusBar, Style } from '@capacitor/status-bar'
import { Capacitor } from '@capacitor/core'

// Hide splash screen when app is ready
if (Capacitor.isNativePlatform()) {
  SplashScreen.hide()
  StatusBar.setStyle({ style: Style.Dark })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
