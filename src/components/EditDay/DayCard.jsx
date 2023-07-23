import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import { getAccommodation, getRestaurant } from "../../api/trips.api";
import DeleteModal from "../Modal/DeleteModal";

const DayCard = ({
  day,
  highlightStyle,
  onAddPlaceToDay,
  onRemovePlaceFromDay,
  place,
}) => {
  const [accommodation, setAccommodation] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantHover, setRestaurantHover] = useState({});
  const [accommodationHover, setAccommodationHover] = useState(false);
  const [hoveredDay, setHoveredDay] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch accommodation data when the component mounts or when 'day.accommodation._id' changes
  useEffect(() => {
    const fetchAccommodationData = async () => {
      try {
        if (day?.accommodation) {
          const response = await getAccommodation(day.accommodation);
          setAccommodation(response.data);
        } else {
          setAccommodation(null);
        }
      } catch (error) {
        console.error("Error fetching accommodation data:", error);
      } finally {
        setLoading(false); // Set loading to false once the data fetching is done
      }
    };

    fetchAccommodationData();
  }, [day]);

  // Effect to fetch restaurants data on component mount
  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        if (day?.restaurants && day.restaurants.length > 0) {
          const restaurantPromises = day.restaurants.map((restaurant) =>
            getRestaurant(restaurant)
          );
          const restaurantDataList = await Promise.all(restaurantPromises);
          setRestaurants(restaurantDataList.map((response) => response.data));
        } else {
          setRestaurants([]);
        }
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      } finally {
        setLoading(false); // Set loading to false once the data fetching is done
      }
    };

    fetchRestaurantData();
  }, [day.restaurants]);

  const formatDate = (dateString) => {
    if (!dateString || !Date.parse(dateString)) {
      return "";
    }

    const date = new Date(dateString);
    return date.toISOString().substring(0, 10);
  };

  const handleAddPlace = async () => {
    if (!place) {
      console.error("Invalid place:", place);
      return;
    }

    if ("price_level" in place && "cuisine" in place) {
      setRestaurants((prevRestaurants) => [...prevRestaurants, place]);
    } else if ("hotel_class" in place && "special_offers" in place) {
      setAccommodation(place);
    } else {
      console.error("Invalid place type:", place);
      return;
    }

    try {
      await onAddPlaceToDay(day?._id, place);

      const placeId = place._id;

      setHoveredDay(formatDate(day?.date));
    } catch (error) {
      console.error("Error adding place to day:", error);
      // Handle any errors that occurred during adding the place
    }
  };

  const handleRemovePlace = async (type, placeId) => {
    console.log("placeID and type", type, placeId);
    try {
      // Perform the deletion action directly based on the type and ID
      await onRemovePlaceFromDay(day?._id, type, placeId);

      // Update the component state to reflect the changes after the successful deletion
      if (type === "accommodation") {
        setAccommodation(null); // <-- This is setting the place to null
      } else if (type === "restaurant") {
        setRestaurants((prevRestaurants) =>
          prevRestaurants.filter((restaurant) => restaurant?._id !== placeId)
        );
        setRestaurantHover((prevState) => ({
          ...prevState,
          [placeId]: false,
        }));
      }
    } catch (error) {
      console.error("Error deleting place:", error);
      // Handle any errors that occurred during deletion
    }
  };

  return (
    <Card key={day._id} sx={{ width: 300, height: "130%" }}>
      <CardContent
        sx={{ height: "100%", display: "flex", flexDirection: "column" }}
      >
        {loading ? ( // Display loading state when data is being fetched
          <Typography>Loading...</Typography>
        ) : (
          <>
            <Button
              onMouseEnter={() => setHoveredDay(formatDate(day?.date))}
              onMouseLeave={() => setHoveredDay(null)}
              variant="contained"
              color="primary"
              sx={{
                "&:hover": {
                  backgroundColor: "secondary.main",
                  color: "secondary.contrastText",
                },
              }}
              onClick={handleAddPlace}
            >
              <Typography variant="h6">
                {hoveredDay ? `Add place to ${hoveredDay}` : "Add Place"}
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

            <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
              Accommodation:
            </Typography>
            {accommodation ? (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography>{accommodation?.name}</Typography>
                {accommodationHover ? (
                  <CloseOutlinedIcon
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      handleRemovePlace("accommodation", accommodation?._id)
                    }
                    onMouseLeave={() => setAccommodationHover(false)}
                  />
                ) : (
                  <RemoveOutlinedIcon
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      handleRemovePlace("accommodation", accommodation?._id)
                    }
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
            <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
              {restaurants.length > 0 ? (
                restaurants.map((restaurant) => (
                  <Box
                    key={restaurant?._id}
                    sx={{ display: "flex", alignItems: "center", mb: 1 }}
                  >
                    <Typography>{restaurant?.name}</Typography>

                    {restaurantHover[restaurant?._id] ? (
                      <CloseOutlinedIcon
                        style={{ cursor: "pointer" }}
                        onClick={
                          () => setConfir
                          // handleRemovePlace("restaurant", restaurant?._id)
                        }
                        onMouseLeave={() =>
                          setRestaurantHover((prevState) => ({
                            ...prevState,
                            [restaurant?._id]: false,
                          }))
                        }
                      />
                    ) : (
                      <RemoveOutlinedIcon
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          handleRemovePlace("restaurant", restaurant?._id)
                        }
                        onMouseEnter={() =>
                          setRestaurantHover((prevState) => ({
                            ...prevState,
                            [restaurant?._id]: true,
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
            <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
              {day?.plans.map((plan) => (
                <Typography key={plan?._id}>{plan?.name}</Typography>
              ))}
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default DayCard;
