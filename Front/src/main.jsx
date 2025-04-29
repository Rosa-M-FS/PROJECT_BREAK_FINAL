import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CarritoProvider } from './context/CarritoContext.jsx'
import { WishlistProvider } from './context/WishlistContext.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CarritoProvider>
      <WishlistProvider>
        <App />
      </WishlistProvider>
    </CarritoProvider>
  </React.StrictMode>,
)
