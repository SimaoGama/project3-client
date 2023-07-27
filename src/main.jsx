import React from "react";
import ReactDOM from "react-dom/client";
// import { ThemeProvider } from './context/theme.context';
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import ThemeProviderWrapper from "./context/theme.context.jsx";
import { AuthProviderWrapper } from "./context/auth.context.jsx";
import { TripColorsProvider } from "./context/tripColors.context.jsx";
import "./main.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <ThemeProviderWrapper>
        <TripColorsProvider>
          <CssBaseline />
          <AuthProviderWrapper>
            <App />
          </AuthProviderWrapper>
        </TripColorsProvider>
      </ThemeProviderWrapper>
      <ToastContainer />
    </Router>
  </React.StrictMode>
);
