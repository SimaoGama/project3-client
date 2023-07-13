import { Routes, Route } from "react-router-dom";
// import { useContext } from "react";
import LandingPage from "./pages/Home/LandingPage";
import SignUp from "./pages/Signup/Signup";
import Navbar from "./components/Header/Navbar/Navbar";
import { useContext } from "react";
import { ColorModeContext, tokens } from "./context/theme.context";
import LogIn from "./pages/Login/Login";
import IsAnon from "./components/Validation/isAnon";
import IsPrivate from "./components/Validation/isPrivate";
import { ToastContainer } from "react-toastify";
import Dashboard from "./pages/Dashboard/Dashboard";
import Topbar from "./components/Header/Topbar/Topbar";
import { ThemeProvider } from "@mui/material";
import NewTrip from "./components/CreateTrip/NewTrip";

function App() {
  const { handleThemeChange: toggleColorMode, theme } =
    useContext(ColorModeContext);
  const colors = tokens(theme.palette.mode);

  return (
    <>
      <ThemeProvider theme={theme}>
        {/* <Dashboard /> */}
        <Navbar />
        {/* <Topbar /> */}

        <ToastContainer position="bottom-center" />

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/signup"
            element={
              <IsAnon>
                <SignUp />
              </IsAnon>
            }
          />
          <Route
            path="/login"
            element={
              <IsAnon>
                <LogIn />
              </IsAnon>
            }
          />
          <Route
            path="/trips/new"
            element={
              <IsPrivate>
                <NewTrip />
              </IsPrivate>
            }
          />
          <Route
            path="/dashboard"
            element={
              <IsPrivate>
                <Dashboard />
              </IsPrivate>
            }
          />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
