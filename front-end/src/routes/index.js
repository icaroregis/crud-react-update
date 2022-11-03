import * as React from 'react';
import { Routes, Route } from 'react-router-dom';

//pages
import Home from '../pages/home';
import Registration from '../pages/registration';

export const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/repositories/:owner/:repo" element={<Registration />} />
    </Routes>
  );
};
