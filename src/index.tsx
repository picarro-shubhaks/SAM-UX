import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './components/app/App';
import { Provider } from 'react-redux';
import { store } from './Store';
import { BrowserRouter } from 'react-router-dom';
//import { ErrorBoundary } from './components/error/ErrorBoundary';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
