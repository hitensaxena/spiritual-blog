import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '../App.tsx'
import '../styles/globals.css'

// Performance monitoring (optional - can be removed in production)
if (process.env.NODE_ENV === 'development') {
  console.log('🚀 Consciousness Exploration Website - Development Mode')
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)