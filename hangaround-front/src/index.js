import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { render } from 'react-dom'
import './index.css'
import Main from './pages/Main'
import Login from './pages/Login'
import './statics/fonts/index.css'

const rootElement = document.getElementById('root')

render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Main />} />
    </Routes>
  </BrowserRouter>,
  rootElement
)
