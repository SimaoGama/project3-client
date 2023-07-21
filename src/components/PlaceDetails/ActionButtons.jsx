import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { styled } from "@mui/system";

const ActionButtons = ({
  place,
  showTripForm,
  selectedTrip,
  handleTripSelectionChange,
  userTrips,
  handleAddToTrip,
  handleConfirmAddToTrip,
}) => {
  const StyledCard = styled(Card)(({ theme }) => ({
    elevation: 6,
  }));

  const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
    height: 350,
  }));

  const StyledBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
  }));

  const StyledTypography = styled(Typography)(({ theme }) => ({
    marginBottom: "10px",
  }));

  const StyledCardActions = styled(CardActions)(({ theme }) => ({
    justifyContent: "flex-end",
  }));
  return (
    <StyledCardActions>
      {place.web_url && (
        <Button
          size="small"
          color="primary"
          onClick={() => window.open(place.web_url, "_blank")}
        >
          Trip Advisor
        </Button>
      )}
      {place.website && (
        <Button
          size="small"
          color="primary"
          onClick={() => window.open(place.website, "_blank")}
        >
          Website
        </Button>
      )}
      {showTripForm ? (
        <>
          <FormControl
            variant="outlined"
            size="small"
            style={{ minWidth: 120 }}
          >
            <InputLabel id="trip-select-label">Select Trip</InputLabel>
            <Select
              labelId="trip-select-label"
              id="trip-select"
              value={selectedTrip}
              onChange={handleTripSelectionChange} // Handle the trip selection
              label="Select Trip"
            >
              <MenuItem value="">None</MenuItem>
              {userTrips.map((trip) => (
                <MenuItem key={trip._id} value={trip._id}>
                  {trip.destination}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button size="small" color="primary" onClick={handleConfirmAddToTrip}>
            {selectedTrip ? "Confirm" : "Cancel"}
          </Button>
        </>
      ) : (
        <Button size="small" color="primary" onClick={handleAddToTrip}>
          Add to Trip
        </Button>
      )}
    </StyledCardActions>
  );
};

export default ActionButtons;
