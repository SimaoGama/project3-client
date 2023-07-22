import React from 'react';
import ReactDOM from 'react-dom/client';
// import { ThemeProvider } from './context/theme.context';
import App from './App.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import ThemeProviderWrapper from './context/theme.context.jsx';
import { AuthProviderWrapper } from './context/auth.context.jsx';
import './main.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <ThemeProviderWrapper>
        <CssBaseline />
        <AuthProviderWrapper>
          <App />
        </AuthProviderWrapper>
      </ThemeProviderWrapper>
    </Router>
  </React.StrictMode>
);
