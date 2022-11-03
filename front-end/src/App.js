import React from 'react';
import Header from './components/Header/index';
import { BrowserRouter } from 'react-router-dom';
import { Routers } from './routes';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routers />
    </BrowserRouter>
  );
}
