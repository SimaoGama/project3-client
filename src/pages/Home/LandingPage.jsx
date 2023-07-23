import { useContext } from "react";
import { ColorModeContext, tokens } from "../../context/theme.context";
import { Box, Typography } from "@mui/material";
import HeroSection from "./HeroSection";
import Cards from "./Cards";
import Footer from "../Footer/Footer";

const LandingPage = () => {
  const { handleThemeChange: toggleColorMode, theme } =
    useContext(ColorModeContext);
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
      }}
    >
      <HeroSection />
      <Cards />
      <Footer />
    </Box>
  );
};

export default LandingPage;
