/**
 * @file index.js
 * @description Main React application entry point, mounting the app and setting up providers.
 * @module index
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/globals.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
