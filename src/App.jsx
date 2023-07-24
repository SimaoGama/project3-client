import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/Home/LandingPage';
import SignUp from './pages/Signup/Signup';
import Navbar from './components/Header/Navbar/Navbar';
import { useContext, useEffect, useState } from 'react';
import { ColorModeContext, tokens } from './context/theme.context';
import LogIn from './pages/Login/Login';
import IsAnon from './components/Validation/isAnon';
import IsPrivate from './components/Validation/isPrivate';
import Dashboard from './pages/Dashboard/Dashboard';
import { ThemeProvider } from '@mui/material';
import { Helmet } from 'react-helmet';
import NewTrip from './components/CreateTrip/NewTrip';
import { AuthContext } from './context/auth.context';
import TripCard from './components/MyTrips/TripCard';
import TripList from './components/MyTrips/TripList';
import EditTrip from './components/EditTrip/EditTrip';
import Map from './components/Map/Map';
import Explore from './pages/Map/Explore';
import EditDay from './components/EditDay/EditDay';
import TripView from './pages/Trip/TripView';
import { useLocation } from 'react-router-dom';
import './main.css';

function App() {
  const { handleThemeChange: toggleColorMode, theme } =
    useContext(ColorModeContext);
  const colors = tokens(theme.palette.mode);
  const { isLoggedIn, user } = useContext(AuthContext);
  const { pathname } = useLocation();
  const [background, setBackground] = useState(null);

  useEffect(() => {
    if (pathname === '/login') {
      setBackground('/images/img-9.jpg');
    } else if (pathname === '/signup') {
      setBackground('/images/img-6.jpg');
    } else {
      setBackground('white');
    }
  }, [pathname]);

  return (
    <div
      className="backgroundStyle"
      style={{ background: `url(${background}) center center/cover no-repeat` }}
    >
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
                path="/map"
                element={
                  <IsPrivate>
                    <Explore />
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
                path="/trips/edit/:tripId"
                element={
                  <IsPrivate>
                    <EditTrip />
                  </IsPrivate>
                }
              />
              <Route
                path="/trip/:tripId"
                element={
                  <IsPrivate>
                    <TripView />
                  </IsPrivate>
                }
              />
              <Route
                path="/trips/:id/day"
                element={
                  <IsPrivate>
                    <EditDay />
                  </IsPrivate>
                }
              />

              <Route
                path="/trips"
                element={
                  <IsPrivate>
                    <TripList />
                  </IsPrivate>
                }
              />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
