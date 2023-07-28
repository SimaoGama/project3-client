import React from "react";
import {
  Dialog,
  DialogTitle,
  Typography,
  Box,
  Button,
  Slide,
} from "@mui/material";

import PlaceCard from "../../components/PlaceDetails/PlaceCard";
import DayPlaceCard from "./DayPlaceCard";

// Other imports specific to this component (e.g., hooks, state, etc.)

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} timeout={700} />;
});

const DayInfoDialog = ({ isOpen, handleClose, colors, selectedPlace }) => {
  const isPlaceArray = Array.isArray(selectedPlace);

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      TransitionComponent={Transition}
      // fullScreen
    >
      {isPlaceArray ? (
        // If selectedPlace is an array, render a PlaceCard for each place in the array
        selectedPlace.map((place, index) => (
          <Box key={index} display="flex" justifyContent="center" mt={2}>
            <Box maxWidth={400}>
              <DayPlaceCard place={place} />
            </Box>
          </Box>
        ))
      ) : (
        // If selectedPlace is not an array, render a single PlaceCard
        <Box display="flex" justifyContent="center" mt={2}>
          <Box maxWidth={400}>
            <DayPlaceCard place={selectedPlace} />
          </Box>
        </Box>
      )}

      <Button
        sx={{
          backgroundColor: colors.greenAccent[700],
          color: colors.grey[100],
          fontSize: "14px",
          fontWeight: "bold",
          padding: "10px 20px",
        }}
        onClick={handleClose}
      >
        Close
      </Button>
    </Dialog>
  );
};

export default DayInfoDialog;
