// import * as React from 'react';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";

import { tokens } from "../../data/theme";
import { useContext, useState } from "react";
import { ColorModeContext } from "../../context/theme.context";
import LoginIcon from "@mui/icons-material/Login";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Copyright from "../../components/Footer/Copyright";
import { AuthContext } from "../../context/auth.context";
import { toast } from "react-toastify";
import { login } from "../../api/auth.api";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const { handleThemeChange: toggleColorMode, theme } =
    useContext(ColorModeContext);
  const colors = tokens(theme.palette.mode);

  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = { email, password };
      // const response = await login(user);
      const response = await toast.promise(login(user), {
        pending: "We are hard at work, please wait",
        error: "Something went wrong, try again later",
      });
      //login response with token
      storeToken(response.data.authToken);

      //verify the token by sending a request to the server
      authenticateUser();
      console.log("login successful");
      navigate("/dashboard");
    } catch (error) {
      console.log("Error Login In", error);
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
    }
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
                  onChange={handleEmail}
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
                  onChange={handlePassword}
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
              Log In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <RouterLink
                  to="/signup"
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
