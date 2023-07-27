// import * as React from 'react';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import HowToRegTwoToneIcon from "@mui/icons-material/HowToRegTwoTone";
import { ThemeProvider } from "@mui/material/styles";
import { toast } from "react-toastify";
import { tokens } from "../../data/theme";
import { useContext, useState } from "react";
import { ColorModeContext } from "../../context/theme.context";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Copyright from "../../components/Footer/Copyright";
import { signup } from "../../api/auth.api";
import PasswordField from "../../components/Password/PasswordField";
import { AuthContext } from "../../context/auth.context";

const EditUserPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const { user } = useContext(AuthContext);

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

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastName = (e) => {
    setLastName(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = { email, password, firstName, lastName };
    try {
      await signup(user);

      toast.success("Signup successful! You can now log in.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      navigate("/login");
    } catch (error) {
      console.log("Error Signing In", error);
      let errorMessage = "Something went wrong, try again later";

      // Check if the error response contains a specific message
      if (
        error.response &&
        error.response.data.message === "All fields are mandatory"
      ) {
        errorMessage = "All fields are mandatory.";
      } else if (
        error.response &&
        error.response.data.message === "Provide a valid email address"
      ) {
        errorMessage = "Provide a valid email address.";
      } else if (
        error.response &&
        error.response.data.message === "Provide a valid password"
      ) {
        errorMessage =
          "Password must be eight characters including one uppercase letter, and alphanumeric characters";
      }

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    setEmail("");
    setFirstName("");
    setLastName("");
    setPassword("");
  };

  const handleToggleTheme = () => {
    toggleColorMode(); // Call toggleColorMode to switch between light and dark mode
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="xs"
        className="custom-container signup-background"
      >
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
            <HowToRegTwoToneIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Edit Account
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  fullWidth
                  id="firstName"
                  label={user?.firstName}
                  onChange={handleFirstName}
                  InputLabelProps={{
                    style: {
                      color: theme.palette.text.primary, // Set label color for light and dark themes
                      borderColor: colors.grey[100],
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="lastName"
                  label={user?.lastName}
                  onChange={handleLastName}
                  name="lastName"
                  autoComplete="family-name"
                  InputLabelProps={{
                    style: {
                      color: theme.palette.text.primary,
                      orderColor: theme.palette.divider,
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  label={user?.email}
                  onChange={handleEmail}
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <PasswordField
                colors={colors}
                theme={theme}
                name={"Current Password"}
                setPassword={setPassword}
              />
              <PasswordField
                colors={colors}
                theme={theme}
                setPassword={setPassword}
                name={"New Password"}
              />
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: colors.greenAccent[600] }}
            >
              Save Changes
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <RouterLink
                  to="#"
                  variant="body2"
                  sx={{
                    color: theme.palette.mode === "dark" ? "#fff" : "inherit",
                  }}
                >
                  {errorMessage && (
                    <p className="error-message">{errorMessage}</p>
                  )}
                </RouterLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
};

export default EditUserPage;
