import { Box, Typography, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getTripPopulated } from "../../api/trips.api";
import CardItem from "../Home/CardItem";

const TripView = () => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const response = await getTripPopulated(tripId);
        const tripData = response.data;
        console.log("tripdata:", tripData);

        setTrip(tripData);
        console.log("start", tripData.startDate);
        console.log("end", tripData.endDate);
      } catch (error) {
        console.log("Error fetching trip:", error);
      }
    };

    fetchTrip(); // Call the fetchTrip function when the component mounts
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
            {trip?.days.map((day) => (
              <Grid item xs={12} sm={6} md={4} key={day._id}>
                <CardItem
                  label={formatDate(day?.date) || "Date"}
                  src="https://www.gtitravel.com/wp-content/uploads/2017/06/Do-Travel-Agents-get-free-trips.jpg"
                  path="#"
                  text={day?.destination} //create a component that passes all the text
                />
                <Grid key={day?._id} container justifyContent="center">
                  Hotel: {day?.accommodation?.name}
                </Grid>
                <Grid container justifyContent="center">
                  Restaurants:{" "}
                  {trip?.days.map((day) => (
                    <Grid key={day._id} container item justifyContent="center">
                      {day?.restaurants?.map((restaurant) => (
                        <Typography key={restaurant._id}>
                          {" "}
                          {restaurant.name}
                        </Typography>
                      ))}
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            ))}
          </Grid>

          {/* <TripTextCard trip={trip} /> */}
        </>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Box>
  );
};

export default TripView;
