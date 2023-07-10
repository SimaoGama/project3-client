import { Routes, Route } from "react-router-dom";
// import { useContext } from 'react';
import LandingPage from "./pages/Home/LandingPage";
import SignUp from "./pages/Signup/Signup";
import Navbar from "./components/Navbar";
import Login from "./pages/Login/Login";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
