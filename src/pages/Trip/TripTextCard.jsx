import { Box } from '@mui/material';
import React from 'react';

const TripTextCard = ({ trip }) => {
  console.log('trip', { trip });
  return (
    <div>
      {trip.days.map(day => (
        <Box key={day._id}>{day.accommodation}</Box>
      ))}
    </div>
  );
};

export default TripTextCard;
