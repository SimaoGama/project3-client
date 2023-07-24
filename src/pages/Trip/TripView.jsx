import { Box, Typography, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAccommodation, getRestaurant, getTrip } from "../../api/trips.api";
import CardItem from "../Home/CardItem";

const TripView = () => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    // Fetch the trip data based on the tripId from the URL parameter
    const fetchTrip = async () => {
      try {
        const response = await getTrip(tripId); // Replace getTripById with your API function
        const tripData = response.data;
        console.log("tripdata:", tripData);

        // Loop through each day in the trip
        for (const day of tripData.days) {
          // Fetch the accommodation details for the day
          const accommodationId = day.accommodation;
          if (accommodationId) {
            const accommodationResponse = await getAccommodation(
              accommodationId
            );
            const accommodation = accommodationResponse.data;
            console.log("Acc:", accommodation);
            day.accommodation = accommodation;
          } else {
            // Handle the case where accommodation ID is null or undefined
            console.log("Accommodation ID is missing or invalid for day:", day);
          }

          // Check if the day has restaurants before making the API call
          if (day.restaurants.length > 0) {
            const restaurantResponse = await getRestaurant(day.restaurants);
            const restaurant = restaurantResponse.data;
            console.log("Rest:", restaurant);
            // Update the day object with the fetched restaurant details
            day.restaurant = restaurant;
          }
        }

        setTrip(tripData);
      } catch (error) {
        console.log("Error fetching trip:", error);
      }
    };

    fetchTrip();
  }, [tripId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().substring(0, 10);
  };

  //   console.log(trip.days.accommodation);

  return (
    <Box>
      {trip ? (
        <>
          <Box textAlign="center" mt={3} mb={4}>
            <Typography variant="h1">{trip.destination}</Typography>
            <Typography variant="subtitle1">
              From: {formatDate(trip.startDate)} to {formatDate(trip.endDate)}
            </Typography>
          </Box>
          {/* Display other trip details here */}
          <Grid container spacing={2} justifyContent="center">
            {trip.days.map((day) => (
              <Grid item xs={12} sm={6} md={4} key={day._id}>
                <CardItem
                  label={formatDate(day?.date) || "Date"}
                  src="https://www.gtitravel.com/wp-content/uploads/2017/06/Do-Travel-Agents-get-free-trips.jpg"
                  path="/"
                  text={day?.accommodation?.name} //create a component that passses all the text
                />
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Box>
  );
};

export default TripView;
