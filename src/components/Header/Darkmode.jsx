import { Box, IconButton } from '@mui/material';
import { useContext, useState } from 'react';

import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { ColorModeContext, tokens } from '../../context/theme.context';

const Darkmode = () => {
  const { handleThemeChange: toggleColorMode, theme } =
    useContext(ColorModeContext);
  const colors = tokens(theme.palette.mode);

  const handleToggleTheme = () => {
    toggleColorMode(); // Call toggleColorMode to switch between light and dark mode
  };
  return (
    <Box display="flex">
      <IconButton onClick={handleToggleTheme}>
        {theme.palette.mode === 'light' ? (
          <DarkModeOutlinedIcon style={{ color: 'white' }} />
        ) : (
          <LightModeOutlinedIcon style={{ color: 'white' }} />
        )}
      </IconButton>
    </Box>
  );
};

export default Darkmode;
