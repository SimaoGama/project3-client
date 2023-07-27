import { Box, Button } from "@mui/material";
import React from "react";

const SearchButton = ({ handleSearchButtonClick, colors, isMobile }) => {
  return (
    <Box pb={2} textAlign="center">
      <Button
        onClick={handleSearchButtonClick}
        sx={{
          backgroundColor: colors.greenAccent[700],
          color: colors.grey[100],
          fontSize: "14px",
          fontWeight: "bold",
          padding: "10px 20px",
        }}
      >
        {isMobile ? "Search" : "Search this area"}
      </Button>
    </Box>
  );
};

export default SearchButton;
