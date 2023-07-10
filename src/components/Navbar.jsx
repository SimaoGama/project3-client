import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';
import { GiWorld } from 'react-icons/gi';
import { MdDarkMode } from 'react-icons/md';
import { MdLightMode } from 'react-icons/md';
import { FaBars, FaTimes } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import { useState } from 'react';
import { tokens, useMode } from '../data/theme';
import { Typography } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import Button from '@mui/material/Button';

const Navbar = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [theme, colorMode] = useMode();
  const { toggleColorMode } = colorMode;
  const colors = tokens(theme.palette.mode);

  const handleToggleTheme = () => {
    toggleColorMode(); // Call toggleColorMode to switch between light and dark mode
  };

  const handleClick = () => setIsClicked(!isClicked);

  const closeMobileMenu = () => setIsClicked(false);

  return (
    <>
      <ThemeProvider theme={theme}>
        <IconContext.Provider value={{ color: '#fff' }}>
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
              <ul className={isClicked ? 'nav-menu active' : 'nav-menu'}>
                <li className="nav-item">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      'nav-links' + (isActive ? ' activated' : '')
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
                      'nav-links' + (isActive ? ' activated' : '')
                    }
                    onClick={closeMobileMenu}
                  >
                    <Typography component="h1" variant="h4">
                      About
                    </Typography>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/signup"
                    className={({ isActive }) =>
                      'nav-links' + (isActive ? ' activated' : '')
                    }
                    onClick={closeMobileMenu}
                  >
                    <Typography component="h1" variant="h4">
                      Signup
                    </Typography>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      'nav-links' + (isActive ? ' activated' : '')
                    }
                    onClick={closeMobileMenu}
                  >
                    <Typography component="h1" variant="h4">
                      Login
                    </Typography>
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>
        </IconContext.Provider>
      </ThemeProvider>
    </>
  );
};

export default Navbar;
