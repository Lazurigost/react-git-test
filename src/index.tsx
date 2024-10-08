import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './state/store'; 
import App from './App'; 

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
// Инициализация программы завёрнутая в провайдер для взаимодействия с Redux
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);