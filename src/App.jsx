import { Routes, Route } from 'react-router-dom';
// import { useContext } from "react";
import LandingPage from './pages/Home/LandingPage';
import SignUp from './pages/Signup/Signup';
import Navbar from './components/Navbar';
import { useContext } from 'react';
import { ColorModeContext } from './context/theme.context';
import LogIn from './pages/Login/Login';
import IsAnon from './components/Validation/isAnon';
import { ToastContainer } from 'react-toastify';

const TestComponent = () => {
  const { theme, handleThemeChange } = useContext(ColorModeContext);
  console.log(theme);
  return (
    <div onClick={() => handleThemeChange()}>
      <p>Hello World</p>
    </div>
  );
};

function App() {
  return (
    <>
      <Navbar />

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
        <Route path="/test" element={<TestComponent />} />
      </Routes>
    </>
  );
}

export default App;
