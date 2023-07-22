import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import useFetch from "../../hooks/useFetch";
import { getRestaurant } from "../../api/trips.api";

const DayCard = ({ day, highlightStyle, onAddPlaceToDay, place }) => {
  const [accommodation, setAccommodation] = useState(null);
  const [restaurants, setRestaurants] = useState([]);

  const {
    data: accommodationData,
    isLoading: isLoadingAccommodation,
    error: errorAccommodation,
  } = useFetch(`/api/accommodation/${day?.accommodation?._id}`);

  // Fetch the restaurant data for each restaurant in the day
  const fetchRestaurantData = async () => {
    try {
      const restaurantPromises = day?.restaurants.map((restaurantId) =>
        getRestaurant(restaurantId)
      );
      const restaurantDataList = await Promise.all(restaurantPromises);
      setRestaurants(restaurantDataList.map((response) => response.data));
    } catch (error) {
      console.error("Error fetching restaurant data:", error);
    }
  };

  // Call the function to fetch restaurant data
  useEffect(() => {
    fetchRestaurantData();
  }, [day?.restaurants]); // Make sure to re-fetch data whenever 'day.restaurants' changes

  const formatDate = (dateString) => {
    if (!dateString || !Date.parse(dateString)) {
      return "";
    }

    const date = new Date(dateString);
    return date.toISOString().substring(0, 10);
  };

  console.log(`Day ${formatDate(day?.date)} restaurants`, restaurants);
  console.log("restaurants", restaurants);

  return (
    <Card key={day._id}>
      <CardHeader sx={highlightStyle} title={`Day ${formatDate(day?.date)}`} />
      <CardContent>
        {/* Render the information for each day */}
        <Typography>City: {day?.city}</Typography>
        <Typography>Accommodation: {accommodationData?.name}</Typography>

        {/* Render the restaurants */}
        <Typography>Restaurants:</Typography>
        {restaurants.map((restaurant) => (
          <Typography key={restaurant?._id}>{restaurant?.name}</Typography>
        ))}

        {/* Render the plans */}
        <Typography>Plans:</Typography>
        {day?.plans.map((plan) => (
          <Typography key={plan?._id}>{plan?.name}</Typography>
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
          onClick={() => onAddPlaceToDay(day?._id, place)}
        >
          Add Place
        </Button>
      </CardContent>
    </Card>
  );
};

export default DayCard;
