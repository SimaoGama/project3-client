import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography
} from '@mui/material';
import useFetch from '../../hooks/useFetch';
import { getAccommodation, getRestaurant } from '../../api/trips.api';

const DayCard = ({ day, highlightStyle, onAddPlaceToDay, place }) => {
  const [accommodation, setAccommodation] = useState(null);
  const [restaurants, setRestaurants] = useState([]);

  const fetchAccommodationData = async () => {
    try {
      if (day?.accommodation?._id) {
        const response = await getAccommodation(day.accommodation._id);
        console.log('Response from API:', response.data); // Add this log to check the API response
        setAccommodation(response.data);
      }
    } catch (error) {
      console.error('Error fetching accommodation data:', error);
    }
  };

  // Fetch accommodation data when the component mounts or when 'day.accommodation._id' changes
  useEffect(() => {
    fetchAccommodationData();
  }, [day?.accommodation?._id]);

  // Effect to fetch accommodation data on component mount
  useEffect(() => {
    fetchAccommodationData();
  }, []);

  const fetchRestaurantData = async () => {
    try {
      const restaurantPromises = day?.restaurants.map(restaurant =>
        getRestaurant(restaurant)
      );
      const restaurantDataList = await Promise.all(restaurantPromises);
      setRestaurants(restaurantDataList.map(response => response.data));
    } catch (error) {
      console.error('Error fetching restaurant data:', error);
    }
  };

  // Fetch restaurant data for the selected day when the component mounts or when 'day.restaurants' changes
  useEffect(() => {
    fetchRestaurantData();
  }, [day?.restaurants]);

  const formatDate = dateString => {
    if (!dateString || !Date.parse(dateString)) {
      return '';
    }

    const date = new Date(dateString);
    return date.toISOString().substring(0, 10);
  };

  const handleAddPlace = () => {
    if ('price_level' in place && 'cuisine' in place) {
      setRestaurants(prevRestaurants => [...prevRestaurants, place]);
    } else if ('hotel_class' in place && 'special_offers' in place) {
      setAccommodation(place);
    } else {
      console.error('Invalid place type:', place);
    }

    onAddPlaceToDay(day?._id, place);
  };

  return (
    <Card key={day._id} sx={{ width: 300, height: '130%' }}>
      <CardHeader sx={highlightStyle} title={`Day ${formatDate(day?.date)}`} />
      <CardContent
        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        {/* Render the information for each day */}
        <Typography variant="h6" fontWeight="bold">
          City: {day?.city}
        </Typography>
        <Typography variant="h6" fontWeight="bold">
          Accommodation:
        </Typography>
        <Typography sx={{ flexGrow: 1 }}>{accommodation?.name}</Typography>

        {/* Render the restaurants */}
        <Typography variant="h6" fontWeight="bold">
          Restaurants:
        </Typography>
        <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
          {restaurants.map(restaurant => (
            <Typography key={restaurant?._id}>{restaurant?.name}</Typography>
          ))}
        </Box>

        {/* Render the plans */}
        <Typography variant="h6" fontWeight="bold">
          Plans:
        </Typography>
        <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
          {day?.plans.map(plan => (
            <Typography key={plan?._id}>{plan?.name}</Typography>
          ))}
          <Button
            variant="contained"
            color="primary"
            sx={{
              '&:hover': {
                backgroundColor: 'secondary.main',
                color: 'secondary.contrastText'
              }
            }}
            onClick={handleAddPlace}
          >
            Add Place
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default DayCard;
