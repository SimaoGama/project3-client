import { Box, Fade, IconButton } from '@mui/material';
import { useContext, useState } from 'react';
import { tokens } from '../../../data/theme';
import InputBase from '@mui/material/InputBase';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import SearchOutlinedIcon from '@mui/icons-material/Search';

import { ColorModeContext } from '../../../context/theme.context';
import Dropdown from '../Dropdown';
import { AuthContext } from '../../../context/auth.context';
import Darkmode from '../Darkmode';

const Topbar = ({ user }) => {
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);

  const { handleThemeChange: toggleColorMode, theme } =
    useContext(ColorModeContext);
  const colors = tokens(theme.palette.mode);

  const handleToggleTheme = () => {
    toggleColorMode(); // Call toggleColorMode to switch between light and dark mode
  };

  // const handleClick = () => setIsClicked(!isClicked);

  // const closeMobileMenu = () => setIsClicked(false);

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* ICONS */}
      <Darkmode />

      <IconButton>
        <Dropdown user={user} />
      </IconButton>
      {!isSearchBarOpen ? (
        <IconButton
          style={{ color: 'white' }}
          onClick={() => setIsSearchBarOpen(!isSearchBarOpen)}
        >
          <SearchOutlinedIcon />
        </IconButton>
      ) : (
        <Fade in={isSearchBarOpen} timeout={500}>
          <Box
            display="flex"
            backgroundColor={colors.primary[400]}
            borderRadius="3px"
          >
            <InputBase sx={{ ml: 2, flex: 5 }} placeholder="Search ..." />
            <IconButton
              type="button"
              sx={{ p: 1 }}
              onClick={() => setIsSearchBarOpen(!isSearchBarOpen)}
            >
              <SearchOutlinedIcon />
            </IconButton>
          </Box>
        </Fade>
      )}
    </Box>
  );
};
export default Topbar;
