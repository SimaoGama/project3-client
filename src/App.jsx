import { Routes, Route } from "react-router-dom";
// import { useContext } from "react";
import LandingPage from "./pages/Home/LandingPage";
import SignUp from "./pages/Signup/Signup";
import Navbar from "./components/Navbar";
import { useContext } from "react";
import { ColorModeContext } from "./context/theme.context";
import LogIn from "./pages/Login/Login";
import IsAnon from "./components/Validation/isAnon";
import IsPrivate from "./components/Validation/isPrivate";
import { ToastContainer } from "react-toastify";
import CreateTrip from "./components/CreateTrip/CreateTrip";
import Dashboard from "./pages/Dashboard/Dashboard";
import Topbar from "./components/Topbar/Topbar";

// const TestComponent = () => {
//   const { theme, handleThemeChange } = useContext(ColorModeContext);
//   console.log(theme);
//   return (
//     <div onClick={() => handleThemeChange()}>
//       <p>Hello World</p>
//     </div>
//   );
// };

function App() {
  return (
    <>
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
              <CreateTrip />
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
    </>
  );
}

export default App;
