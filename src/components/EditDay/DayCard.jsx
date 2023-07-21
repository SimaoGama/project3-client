import React from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";

const DayCard = ({ day, highlightStyle }) => {
  const formatDate = (dateString) => {
    if (!dateString || !Date.parse(dateString)) {
      return "";
    }

    const date = new Date(dateString);
    return date.toISOString().substring(0, 10);
  };
  return (
    <Card key={day._id}>
      <CardHeader sx={highlightStyle} title={`Day ${formatDate(day?.date)}`} />
      <CardContent>
        {/* Render the information for each day */}
        <Typography>City: {day?.city}</Typography>
        <Typography>Accommodation: {day?.accommodation}</Typography>

        {/* Render the restaurants */}
        <Typography>Restaurants:</Typography>
        {day?.restaurants.map((restaurant) => (
          <Typography key={restaurant._id}>{restaurant?.name}</Typography>
        ))}

        {/* Render the plans */}
        <Typography>Plans:</Typography>
        {day?.plans.map((plan) => (
          <Typography key={plan._id}>{plan?.name}</Typography>
        ))}
        <Button
          variant="contained"
          color="primary"
          sx={{
            "&:hover": {
              backgroundColor: "secondary.main",
              color: "secondary.contrastText",
            },
          }}
          onClick={() => onAddPlaceToDay(day?._id)}
        >
          Add Place
        </Button>
      </CardContent>
    </Card>
  );
};

export default DayCard;
