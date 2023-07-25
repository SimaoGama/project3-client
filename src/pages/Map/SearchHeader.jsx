import React, { useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { AppBar, Toolbar, Typography, InputBase, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/system";

const SearchContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: theme.palette.common.white,
  borderRadius: theme.shape.borderRadius,
  "&:hover": {
    backgroundColor: theme.palette.common.white,
  },
  marginLeft: theme.spacing(2),
  width: "auto",
}));

const SearchIconContainer = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.primary.main,
}));

const Input = styled(InputBase)(({ theme }) => ({
  color: "black",
  padding: theme.spacing(1, 1, 1, 0),
  paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
  transition: theme.transitions.create("width"),
  width: "100%",
}));

const SearchHeader = ({ setCoordinates }) => {
  const [autocomplete, setAutocomplete] = useState(null);

  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    const place = autocomplete.getPlace();

    if (place && place.geometry) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setCoordinates({ lat, lng });
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Box display="flex" alignItems="center">
          <Typography variant="h6">Explore new places</Typography>
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <SearchContainer>
              <SearchIconContainer>
                <SearchIcon />
              </SearchIconContainer>
              <Input
                placeholder="Search…"
                classes={{
                  input: "MuiInputBase-input",
                }}
              />
            </SearchContainer>
          </Autocomplete>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default SearchHeader;
