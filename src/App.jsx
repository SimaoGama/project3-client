import { Routes, Route } from 'react-router-dom';
// import { useContext } from 'react';
import LandingPage from './pages/Home/LandingPage';
import SignUp from './pages/Signup/Signup';

function App() {
  return (
    <>
      <div>MY APP</div>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
