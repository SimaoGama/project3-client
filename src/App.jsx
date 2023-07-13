import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Home/LandingPage";
import SignUp from "./pages/Signup/Signup";
import Navbar from "./components/Header/Navbar/Navbar";
import { useContext } from "react";
import { ColorModeContext, tokens } from "./context/theme.context";
import LogIn from "./pages/Login/Login";
import IsAnon from "./components/Validation/isAnon";
import IsPrivate from "./components/Validation/isPrivate";
import Dashboard from "./pages/Dashboard/Dashboard";
import { ThemeProvider } from "@mui/material";
import NewTrip from "./components/CreateTrip/NewTrip";
import { AuthContext } from "./context/auth.context";
import TripCard from "./components/MyTrips/TripCard";

function App() {
  const { handleThemeChange: toggleColorMode, theme } =
    useContext(ColorModeContext);
  const colors = tokens(theme.palette.mode);
  const { isLoggedIn, user } = useContext(AuthContext);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Navbar />
        <div className="app">
          {isLoggedIn && <Dashboard />}
          <main className="content">
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
                path="/dashboard"
                element={
                  <IsPrivate>
                    <Dashboard />
                  </IsPrivate>
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
                path="/trips"
                element={
                  <IsPrivate>
                    <TripCard />
                  </IsPrivate>
                }
              />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
