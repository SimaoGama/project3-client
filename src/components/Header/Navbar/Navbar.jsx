import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import { GiWorld } from "react-icons/gi";

import { FaBars, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { useContext, useState } from "react";
import { tokens } from "../../../context/theme.context";
import { Avatar, Box, MenuItem, Typography } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import Topbar from "../Topbar/Topbar";
import { ColorModeContext } from "../../../context/theme.context";
import { AuthContext } from "../../../context/auth.context";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegTwoToneIcon from "@mui/icons-material/HowToRegTwoTone";
import Darkmode from "../Darkmode";

const Navbar = () => {
  const [isClicked, setIsClicked] = useState(false);
  const { isLoggedIn, user } = useContext(AuthContext);

  const { handleThemeChange: toggleColorMode, theme } =
    useContext(ColorModeContext);
  const colors = tokens(theme.palette.mode);

  const handleToggleTheme = () => {
    toggleColorMode(); // Call toggleColorMode to switch between light and dark mode
  };

  const handleClick = () => setIsClicked(!isClicked);

  const closeMobileMenu = () => setIsClicked(false);

  return (
    <>
      <ThemeProvider theme={theme}>
        <IconContext.Provider value={{ color: "#fff" }}>
          <nav className="navbar">
            <div className="navbar-container container">
              <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                <GiWorld className="navbar-icon" onClick={closeMobileMenu} />
                <Typography component="h1" variant="h3">
                  Travel App
                </Typography>
              </Link>
              <div className="menu-icon" onClick={handleClick}>
                {isClicked ? <FaTimes /> : <FaBars />}
              </div>
              <ul className={isClicked ? "nav-menu active" : "nav-menu"}>
                <li className="nav-item">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      "nav-links" + (isActive ? " activated" : "")
                    }
                    onClick={closeMobileMenu}
                  >
                    <Typography component="h1" variant="h4">
                      Home
                    </Typography>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/about"
                    className={({ isActive }) =>
                      "nav-links" + (isActive ? " activated" : "")
                    }
                    onClick={closeMobileMenu}
                  >
                    <Typography component="h1" variant="h4">
                      About
                    </Typography>
                  </NavLink>
                </li>

                {/* //HANDLE USER PRIVATE OPTIONS */}

                {isLoggedIn && (
                  <>
                    <li className="nav-item">
                      <NavLink
                        className={({ isActive }) =>
                          "nav-links" + (isActive ? " activated" : "")
                        }
                      >
                        <Typography component="h2" variant="h5">
                          {`Welcome ${user.firstName}` +
                            " " +
                            `${user.lastName}`}
                        </Typography>
                      </NavLink>
                    </li>
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
                        <MenuItem className="menu-item">
                          <span className="icon-container">
                            <HowToRegTwoToneIcon className="fade-icon" />
                          </span>
                          <Typography className="menu-text">Signup</Typography>
                        </MenuItem>
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
                        <MenuItem className="menu-item">
                          <span className="icon-container">
                            <LoginIcon className="fade-icon" />
                          </span>
                          <Typography className="menu-text">Login</Typography>
                        </MenuItem>
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
