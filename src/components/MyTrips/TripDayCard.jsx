import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { getAccommodation, getRestaurant } from '../../api/trips.api';

const TripDayCard = ({ day, formatDate }) => {
  const logDate = formatDate(day.date);
  const [accommodation, setAccommodation] = useState('');
  const [restaurants, setRestaurants] = useState([]);

  const fetchAccommodationData = async () => {
    if (day?.accommodation) {
      console.log('Accommodation ID:', day.accommodation); // Log the accommodation ID
      try {
        const response = await getAccommodation(day.accommodation);
        console.log('Response from API:', response.data); // Log the API response
        setAccommodation(response.data);
      } catch (error) {
        console.error('Error fetching accommodation data:', error);
      }
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

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {logDate}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          City: {day.city}
        </Typography>
        <Typography variant="h6" fontWeight="bold">
          Accommodation:
        </Typography>
        <Typography sx={{ flexGrow: 1 }}>
          {accommodation ? accommodation.name : 'Loading...'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Restaurants:
          {restaurants.map(restaurant => (
            <span key={restaurant?._id}>{restaurant?.name}</span>
          ))}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Plans: {day.plans.join(', ')}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TripDayCard;
