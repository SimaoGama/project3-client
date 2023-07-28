import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";

const PasswordField = ({ theme, colors, setPassword, name, value }) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  return (
    <Grid item xs={12}>
      <TextField
        required
        fullWidth
        // value={value || ""}
        name="password"
        label={name ? name : "Password"}
        type={showPassword ? "text" : "password"} // Toggle visibility based on state
        id="password"
        onChange={handlePasswordChange}
        autoComplete="new-password"
        InputLabelProps={{
          style: {
            color: theme.palette.text.primary,
            borderColor: colors.grey[100],
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Grid>
  );
};

export default PasswordField;
