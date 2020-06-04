import React from 'react';
import './App.css';
import { Routes } from './routes';
import { Content } from './shared/components/Content';

function App() {
  return (
    <>
      <Content>
        <Routes />
      </Content>
    </>
  );
}

export default App;
