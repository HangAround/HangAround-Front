import React, { ReactElement } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { StyledEngineProvider } from '@mui/material'

import './index.css'
import Login from './pages/Login'
import Main from './pages/Main'
import './statics/fonts/index.css'
import GameRoom from './pages/gameRoom'

export default function App(): ReactElement {
  return (
    <StyledEngineProvider injectFirst>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/room/:roomCode" element={<GameRoom />} />
          <Route path="/" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </StyledEngineProvider>
  )
}
