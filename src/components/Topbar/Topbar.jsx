import { Box, IconButton, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { tokens } from "../../data/theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutline";
import SearchOutlinedIcon from "@mui/icons-material/Search";
import { useMode } from "../../data/theme";
import { AuthContext } from "../../context/auth.context";

const Topbar = () => {
  const [isClicked, setIsClicked] = useState(false);
  const { isLoggedIn, logOutUser } = useContext(AuthContext);

  const [theme, colorMode] = useMode();
  const { toggleColorMode } = colorMode;
  const colors = tokens(theme.palette.mode);

  const handleToggleTheme = () => {
    toggleColorMode(); // Call toggleColorMode to switch between light and dark mode
  };

  const handleClick = () => setIsClicked(!isClicked);

  const closeMobileMenu = () => setIsClicked(false);

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type=" button" sx={{ p: 1 }}>
          <SearchOutlinedIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={toggleColorMode}>
          {theme.palette.mode === "light" ? (
            <DarkModeOutlinedIcon style={{ color: "white" }} />
          ) : (
            <LightModeOutlinedIcon style={{ color: "white" }} />
          )}
        </IconButton>
        <IconButton style={{ color: "white" }}>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton style={{ color: "white" }}>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton style={{ color: "white" }}>
          <PersonOutlinedIcon />
        </IconButton>
        <IconButton style={{ color: "white" }}>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton style={{ color: "white" }}>
          <SearchOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
export default Topbar;
