import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './components/app/App';
import { Provider } from 'react-redux';
import { store } from './Store';
import { BrowserRouter } from 'react-router-dom';
//import { ErrorBoundary } from './components/error/ErrorBoundary';
import { theme } from './theme';
import { ThemeProvider } from '@mui/material/styles';
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
