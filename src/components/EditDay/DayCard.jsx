import React from 'react';
import { Card, CardContent, CardHeader, Typography } from '@mui/material';

const DayCard = ({ day }) => {
  const formatDate = dateString => {
    if (!dateString || !Date.parse(dateString)) {
      return '';
    }

    const date = new Date(dateString);
    return date.toISOString().substring(0, 10);
  };
  return (
    <Card key={day._id}>
      <CardHeader title={`Day ${formatDate(day?.date)}`} />
      <CardContent>
        {/* Render the information for each day */}
        <Typography>City: {day?.city}</Typography>
        <Typography>Accommodation: {day?.accommodation}</Typography>

        {/* Render the restaurants */}
        <Typography>Restaurants:</Typography>
        {day?.restaurants.map(restaurant => (
          <Typography key={restaurant._id}>{restaurant?.name}</Typography>
        ))}

        {/* Render the plans */}
        <Typography>Plans:</Typography>
        {day?.plans.map(plan => (
          <Typography key={plan._id}>{plan?.name}</Typography>
        ))}
      </CardContent>
    </Card>
  );
};

export default DayCard;
