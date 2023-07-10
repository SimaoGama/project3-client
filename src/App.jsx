import { Routes, Route } from 'react-router-dom';
// import { useContext } from "react";
import LandingPage from './pages/Home/LandingPage';
import SignUp from './pages/Signup/Signup';
import Navbar from './components/Navbar';
import Login from './pages/Login/Login';
import { useContext } from 'react';
import { ColorModeContext } from './context/theme.context';
import LogIn from './pages/Login/Login';

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

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/test" element={<TestComponent />} />
      </Routes>
    </>
  );
}

export default App;
