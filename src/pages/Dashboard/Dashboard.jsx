import { Box, Grid, Typography } from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { ColorModeContext, tokens } from "../../context/theme.context";

const Dashboard = () => {
  const { handleThemeChange: toggleColorMode, theme } =
    useContext(ColorModeContext);
  const colors = tokens(theme.palette.mode);
  return (
    <>
      <Box
        sx={{
          backgroundColor: theme.palette.background.default,
          height: "100vh",
          display: "flex",
        }}
      >
        <Sidebar />
      </Box>
    </>
  );
};

export default Dashboard;
