import React from 'react';
import ReactDOM from 'react-dom/client';
// import { ThemeProvider } from './context/theme.context';
import App from './App.jsx';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import ThemeProviderWrapper from './context/theme.context.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <ThemeProviderWrapper>
        <App />
      </ThemeProviderWrapper>
    </Router>
  </React.StrictMode>
);
