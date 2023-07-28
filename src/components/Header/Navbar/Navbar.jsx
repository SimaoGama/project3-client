import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useNavigationType,
} from "react-router-dom";
import "./Navbar.css";
import { GiWorld } from "react-icons/gi";

import { FaBars, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { useContext, useEffect, useState } from "react";
import { tokens } from "../../../context/theme.context";
import { Avatar, Box, Button, MenuItem, Typography } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import Topbar from "../Topbar/Topbar";
import { ColorModeContext } from "../../../context/theme.context";
import { AuthContext } from "../../../context/auth.context";
import LoginIcon from "@mui/icons-material/Login";
import KeyboardReturnOutlinedIcon from "@mui/icons-material/KeyboardReturnOutlined";
import HowToRegTwoToneIcon from "@mui/icons-material/HowToRegTwoTone";
import Darkmode from "../Darkmode";

const Navbar = () => {
  const [isClicked, setIsClicked] = useState(false);
  const { isLoggedIn, user } = useContext(AuthContext);
  const [isDashboard, setIsDashboard] = useState(false);
  const [isHoverActive, setIsHoverActive] = useState(false);

  const { handleThemeChange: toggleColorMode, theme } =
    useContext(ColorModeContext);
  const colors = tokens(theme.palette.mode);

  const handleToggleTheme = () => {
    toggleColorMode(); // Call toggleColorMode to switch between light and dark mode
  };

  const handleClick = () => setIsClicked(!isClicked);

  const closeMobileMenu = () => setIsClicked(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const location = useLocation();
  const firstEndpoint = pathname.split("/")[1];

  useEffect(() => {
    if (pathname === "/dashboard") {
      setIsDashboard(true);
    }
  }, [pathname]);

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <IconContext.Provider value={{ color: "#fff" }}>
          <nav className="navbar">
            <div className="navbar-container container">
              <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                <GiWorld className="navbar-icon" onClick={closeMobileMenu} />
                <Typography component="h1" variant="h3">
                  JOURNEYO
                </Typography>
              </Link>
              <div className="menu-icon" onClick={handleClick}>
                {isClicked ? <FaTimes /> : <FaBars />}
              </div>
              <ul className={isClicked ? "nav-menu active" : "nav-menu"}>
                {/* //HANDLE USER PRIVATE OPTIONS */}

                {isLoggedIn && (
                  <>
                    {location.pathname !== "/" && (
                      <Box display="flex">
                        <Button
                          sx={{ color: "rgb(252,252,252)" }}
                          onClick={() => navigate(-1)}
                        >
                          <Typography
                            variant="h5"
                            sx={{
                              "&:hover": {
                                color: `${colors.greenAccent[500]}`,
                              },
                            }}
                          >
                            <KeyboardReturnOutlinedIcon />
                          </Typography>
                        </Button>
                      </Box>
                    )}
                    {isDashboard && pathname === "/" ? (
                      <li className="nav-item">
                        <NavLink
                          to={"/dashboard"}
                          className={({ isActive }) =>
                            "nav-links" + (isActive ? " activated" : "")
                          }
                        >
                          <Typography component="h2" variant="h4">
                            {`Welcome ${user.firstName}` +
                              " " +
                              `${user.lastName}`}
                          </Typography>
                        </NavLink>
                      </li>
                    ) : (
                      <li className="nav-item">
                        <NavLink
                          to={"/dashboard"}
                          className={
                            isHoverActive ? "nav-links activated" : "nav-links"
                          }
                          onMouseEnter={() => setIsHoverActive(true)}
                          onMouseLeave={() => setIsHoverActive(false)}
                          // sx={{
                          //   "&:hover": {
                          //     transition: "opacity 0.8s ease",
                          //   },
                          // }}
                        >
                          <Typography component="h2" variant="h4">
                            {isHoverActive
                              ? "Dashboard"
                              : capitalizeFirstLetter(firstEndpoint)}
                          </Typography>
                        </NavLink>
                      </li>
                    )}
                    <Box display="flex">
                      <Topbar user={user} />
                    </Box>
                  </>
                )}

                {/* //HANDLE ANON OPTIONS */}

                {!isLoggedIn && (
                  <>
                    <li className="nav-item">
                      <NavLink
                        to="/signup"
                        className={({ isActive }) =>
                          "nav-links" + (isActive ? " activated" : "")
                        }
                        onClick={closeMobileMenu}
                      >
                        <div className="menu-item">
                          {" "}
                          {/* Change the wrapping element to div */}
                          <span className="icon-container">
                            <HowToRegTwoToneIcon className="fade-icon" />
                          </span>
                          <Typography className="menu-text">Signup</Typography>
                        </div>
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        to="/login"
                        className={({ isActive }) =>
                          "nav-links" + (isActive ? " activated" : "")
                        }
                        onClick={closeMobileMenu}
                      >
                        <div className="menu-item">
                          {" "}
                          {/* Change the wrapping element to div */}
                          <span className="icon-container">
                            <LoginIcon className="fade-icon" />
                          </span>
                          <Typography className="menu-text">Login</Typography>
                        </div>
                      </NavLink>
                    </li>

                    <Darkmode />
                  </>
                )}
              </ul>
            </div>
          </nav>
        </IconContext.Provider>
      </ThemeProvider>
    </>
  );
};

export default Navbar;
