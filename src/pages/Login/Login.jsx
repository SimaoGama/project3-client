// import * as React from 'react';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import { tokens } from "../../data/theme";
import { useContext } from "react";
import { ColorModeContext } from "../../context/theme.context";
import LoginIcon from "@mui/icons-material/Login";
import { Link as RouterLink } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const LogIn = () => {
  const { handleThemeChange: toggleColorMode, theme } =
    useContext(ColorModeContext);

  const colors = tokens(theme.palette.mode);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const handleToggleTheme = () => {
    toggleColorMode(); // Call toggleColorMode to switch between light and dark mode
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LoginIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  InputLabelProps={{
                    style: {
                      color: theme.palette.text.primary, // Set label color for light and dark themes
                      borderColor: colors.grey[100],
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  InputLabelProps={{
                    style: {
                      color: theme.palette.text.primary, // Set label color for light and dark themes
                      borderColor: colors.grey[100],
                    },
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: colors.greenAccent[600] }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <RouterLink
                  to="/login"
                  variant="body2"
                  sx={{
                    color: theme.palette.mode === "dark" ? "#fff" : "inherit",
                  }}
                >
                  <Typography sx={{ fontSize: "0.7rem" }} variant="h6">
                    Don't have an account? Register today.
                  </Typography>
                </RouterLink>
              </Grid>
            </Grid>
            <Button
              onClick={handleToggleTheme}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: colors.blueAccent }}
            >
              Toggle Theme
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
};

export default LogIn;
