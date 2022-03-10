import { StrictMode } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { render } from 'react-dom';
import './index.css';
import Main from './pages/Main';
import Login from './pages/Login';

const rootElement = document.getElementById("root");

render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
  rootElement
);
