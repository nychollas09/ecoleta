import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { Header } from './shared/components/Header';
import { Home } from './pages/Home';
import CreatePoint from './pages/CreatePoint';

export const Routes = () => {
  return (
    <BrowserRouter>
      <Header />
      <Route component={Home} path="/" exact></Route>
      <Route component={CreatePoint} path="/create-point" exact></Route>
    </BrowserRouter>
  );
};
