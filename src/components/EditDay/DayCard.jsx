import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import {
  getAccommodation,
  getRestaurant,
  deletedRestaurant,
  deletedAccommodation
} from '../../api/trips.api';

const DayCard = ({
  day,
  highlightStyle,
  onAddPlaceToDay,
  onRemovePlaceFromDay,
  place
}) => {
  const [accommodation, setAccommodation] = useState({});
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantHover, setRestaurantHover] = useState({});
  const [accommodationHover, setAccommodationHover] = useState(false);
  const [hoveredDay, setHoveredDay] = useState(null);

  const fetchAccommodationData = async () => {
    try {
      if (day?.accommodation) {
        const response = await getAccommodation(day.accommodation);

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
    if (!place) {
      console.error('Invalid place:', place);
      return;
    }

    if ('price_level' in place && 'cuisine' in place) {
      setRestaurants(prevRestaurants => [...prevRestaurants, place]);
    } else if ('hotel_class' in place && 'special_offers' in place) {
      setAccommodation(place);
    } else {
      console.error('Invalid place type:', place);
      return;
    }

    onAddPlaceToDay(day?._id, place);
    setHoveredDay(formatDate(day?.date));
  };

  const handleRemovePlace = async (type, place) => {
    console.log('place', place);
    console.log('type', type);
    try {
      if (type === 'accommodation') {
        // Call the backend API to delete the accommodation
        await deletedAccommodation(place);
        setAccommodation({});
      } else if (type === 'restaurant') {
        // Call the backend API to delete the restaurant
        await deletedRestaurant(place);
        setRestaurants(prevRestaurants =>
          prevRestaurants.filter(restaurant => restaurant?._id !== place)
        );
      } else {
        console.error('Invalid place type:', type);
        return;
      }

      // Call the function to remove the place from the day as well
      onRemovePlaceFromDay(day?._id, type, place);
    } catch (error) {
      console.error('Error deleting place:', error);
      // Handle any errors that occurred during deletion
    }
  };

  //   console.log('HOTEL NAME', accommodation?.name);

  return (
    <Card key={day._id} sx={{ width: 300, height: '130%' }}>
      <CardContent
        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <Button
          onMouseEnter={() => setHoveredDay(formatDate(day?.date))}
          onMouseLeave={() => setHoveredDay(null)}
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
          <Typography variant="h6">
            {hoveredDay ? `Add place to ${hoveredDay}` : 'Add Place'}
          </Typography>
        </Button>
        <CardHeader
          sx={highlightStyle}
          title={`Day ${formatDate(day?.date)}`}
        />
        {/* Render the information for each day */}
        <Typography variant="h6" fontWeight="bold">
          City: {day?.city}
        </Typography>

        {accommodation ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography>{accommodation?.name}</Typography>
            {accommodationHover ? (
              <CloseOutlinedIcon
                style={{ cursor: 'pointer' }}
                onClick={() =>
                  handleRemovePlace('accommodation', accommodation?._id)
                }
                onMouseLeave={() => setAccommodationHover(false)}
              />
            ) : (
              <RemoveOutlinedIcon
                style={{ cursor: 'pointer' }}
                onClick={() => handleRemovePlace('accommodation')}
                onMouseEnter={() => setAccommodationHover(true)}
              />
            )}
          </Box>
        ) : (
          <Typography>No accommodation for tonight</Typography>
        )}

        {/* Render the restaurants */}
        <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
          Restaurants:
        </Typography>
        <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
          {restaurants.length > 0 ? (
            restaurants.map(restaurant => (
              <Box
                key={restaurant?._id}
                sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
              >
                <Typography>{restaurant?.name}</Typography>

                {restaurantHover[restaurant?._id] ? (
                  <CloseOutlinedIcon
                    style={{ cursor: 'pointer' }}
                    onClick={() =>
                      handleRemovePlace('restaurant', restaurant?._id)
                    }
                    onMouseLeave={() =>
                      setRestaurantHover(prevState => ({
                        ...prevState,
                        [restaurant?._id]: false
                      }))
                    }
                  />
                ) : (
                  <RemoveOutlinedIcon
                    style={{ cursor: 'pointer' }}
                    onClick={() =>
                      handleRemovePlace('restaurant', restaurant?._id)
                    }
                    onMouseEnter={() =>
                      setRestaurantHover(prevState => ({
                        ...prevState,
                        [restaurant?._id]: true
                      }))
                    }
                  />
                )}
              </Box>
            ))
          ) : (
            <Typography>No restaurants today</Typography>
          )}
        </Box>

        {/* Render the plans */}
        <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
          Plans:
        </Typography>
        <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
          {day?.plans.map(plan => (
            <Typography key={plan?._id}>{plan?.name}</Typography>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default DayCard;
