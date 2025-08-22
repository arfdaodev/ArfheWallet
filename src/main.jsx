import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import AppRouter from './AppRouter.jsx'
import { HashRouter } from 'react-router'

const root = document.getElementById('root');

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <HashRouter>
      <AppRouter />
    </HashRouter>
  </React.StrictMode>
)
