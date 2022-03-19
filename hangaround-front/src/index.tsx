import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { render } from 'react-dom'
import { StyledEngineProvider } from '@mui/material'
import './index.css'
import Login from './pages/Login'
import Main from './pages/Main'
import Room from './pages/Room'
import './statics/fonts/index.css'

const rootElement = document.getElementById('root')

render(
  <StyledEngineProvider injectFirst>
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route path="/" element={<Main />} />
        <Route path="/room" element={<Room />} />
      </Routes>
    </BrowserRouter>
  </StyledEngineProvider>,
  rootElement
)
