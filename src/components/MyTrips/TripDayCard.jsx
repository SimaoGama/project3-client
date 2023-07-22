import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const TripDayCard = ({ day, formatDate }) => {
  const logDate = formatDate(day.date);

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {logDate}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          City: {day.city}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Accommodation: {day.accommodation}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Restaurants: {day.restaurants.join(", ")}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Plans: {day.plans.join(", ")}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TripDayCard;
