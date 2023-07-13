import { useContext } from "react";
import { ColorModeContext, tokens } from "../../context/theme.context";
import { Box, Typography } from "@mui/material";

const LandingPage = () => {
  const { handleThemeChange: toggleColorMode, theme } =
    useContext(ColorModeContext);
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h1" color="text.primary">
        LANDING PAGE
      </Typography>
    </Box>
  );
};

export default LandingPage;
