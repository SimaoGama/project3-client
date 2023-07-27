import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { getAccommodation, getPlan, getRestaurant } from "../../api/trips.api";

const TripDayCard = ({ day, formatDate }) => {
  const logDate = formatDate(day.date);
  const [accommodation, setAccommodation] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [plans, setPlans] = useState([]);

  // console.log("TRIPDAYCARD DAY", day);

  const fetchAccommodationData = async () => {
    if (day?.accommodation) {
      console.log("Accommodation ID:", day.accommodation); // Log the accommodation ID
      try {
        const response = await getAccommodation(day?.accommodation._id);
        // console.log("Response from API:", response.data); // Log the API response
        setAccommodation(response.data);
      } catch (error) {
        console.error("Error fetching accommodation data:", error);
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
      const restaurantPromises = day?.restaurants.map((restaurant) =>
        getRestaurant(restaurant?._id)
      );
      const restaurantDataList = await Promise.all(restaurantPromises);
      setRestaurants(restaurantDataList.map((response) => response?.data));
    } catch (error) {
      console.error("Error fetching restaurant data:", error);
    }
  };

  // Fetch restaurant data for the selected day when the component mounts or when 'day.restaurants' changes
  useEffect(() => {
    fetchRestaurantData();
  }, [day?.restaurants?._id]);

  const fetchPlanData = async () => {
    try {
      const planPromises = day?.plans.map((plan) => getPlan(plan._id));
      const planDataList = await Promise.all(planPromises);
      setPlans(planDataList.map((response) => response.data));
    } catch (error) {
      console.error("Error fetching plan data:", error);
    }
  };

  // Fetch restaurant data for the selected day when the component mounts or when 'day.restaurants' changes
  useEffect(() => {
    fetchPlanData();
  }, [day?.plans]);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          City: {day.city}
        </Typography>
        <Typography variant="h6" fontWeight="bold">
          Accommodation:
        </Typography>
        <Typography sx={{ flexGrow: 1 }}>
          {accommodation ? accommodation.name : "N/A"}
        </Typography>
        <Typography variant="h6" fontWeight="bold">
          Restaurants:
        </Typography>
        <Typography sx={{ flexGrow: 1 }}>
          {restaurants
            ? restaurants.map((restaurant) => (
                <span key={restaurant?._id}>{restaurant?.name}</span>
              ))
            : "N/A"}
        </Typography>
        <Typography variant="h6" fontWeight="bold">
          Plans:
        </Typography>
        <Typography sx={{ flexGrow: 1 }}>
          {plans
            ? plans.map((plan) => <span key={plan?._id}>{plan?.name}</span>)
            : "N/A"}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TripDayCard;
