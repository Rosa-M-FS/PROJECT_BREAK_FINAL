import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CarritoProvider } from './context/CarritoContext.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CarritoProvider>
    <App />
    </CarritoProvider>
  </React.StrictMode>,
)
