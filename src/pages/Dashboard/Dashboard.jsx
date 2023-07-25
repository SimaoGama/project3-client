import { Box, Grid, Typography } from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { ColorModeContext, tokens } from "../../context/theme.context";
import NewTrip from "../../components/CreateTrip/NewTrip";
import { Route, Routes } from "react-router-dom";
import IsPrivate from "../../components/Validation/isPrivate";
// import Calendar from "../Calendar";

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
        {/* <Calendar /> */}
      </Box>
    </>
  );
};

export default Dashboard;
