import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Input,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import { getAccommodation, getRestaurant, getPlan } from "../../api/trips.api";

import { Autocomplete } from "@react-google-maps/api";
import AutocompleteSearch from "../Autocomplete/AutocompleteSearch";
import StatBox from "../../pages/Dashboard/StatBox";
import { ColorModeContext } from "../../context/theme.context";
import { tokens } from "../../data/theme";

const DayCard = ({
  day,
  highlightStyle,
  onAddPlaceToDay,
  onRemovePlaceFromDay,
  place,
  setCoordinates,
}) => {
  const [city, setCity] = useState(null);
  const [accommodation, setAccommodation] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [plans, setPlans] = useState([]);
  const [restaurantHover, setRestaurantHover] = useState({});
  const [planHover, setPlansHover] = useState({});
  const [accommodationHover, setAccommodationHover] = useState(false);
  const [hoveredDay, setHoveredDay] = useState(null);
  const [loading, setLoading] = useState(true);

  const { handleThemeChange: toggleColorMode, theme } =
    useContext(ColorModeContext);
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

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

  useEffect(() => {
    const fetchPlansData = async () => {
      try {
        if (day?.plans && day.plans.length > 0) {
          const planPromises = day.plans.map((plan) => getPlan(plan));
          const planDataList = await Promise.all(planPromises);
          setPlans(planDataList.map((response) => response.data));
        } else {
          setPlans([]);
        }
      } catch (error) {
        console.error("Error fetching plans data:", error);
      } finally {
        setLoading(false); // Set loading to false once the data fetching is done
      }
    };

    fetchPlansData();
  }, [day.plans]);

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

    console.log(place);

    if ("price_level" in place && "cuisine" in place) {
      setRestaurants((prevRestaurants) => [...prevRestaurants, place]);
    } else if ("hotel_class" in place && "special_offers" in place) {
      setAccommodation(place);
    } else if (place.category.key === "attraction") {
      setPlans((prevPlans) => [...prevPlans, place]);
    } else {
      console.error("Invalid place type:", place);
      return;
    }

    try {
      await onAddPlaceToDay(day?._id, place);

      // const placeId = place._id;

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
      } else if (type === "plan") {
        setPlans((prevPlans) =>
          prevPlans.filter((plan) => plan?._id !== placeId)
        );
        setPlansHover((prevState) => ({
          ...prevState,
          [placeId]: false,
        }));
      }
    } catch (error) {
      console.error("Error deleting place:", error);
      // Handle any errors that occurred during deletion
    }
  };

  // const handleCityChange = (event) => {
  //   setCity(event.target.value);
  // };

  const handlePlaceSelected = (place) => {
    setCity(place);
  };

  return (
    <Card key={day._id} sx={{ width: 300, height: "130%" }}>
      <Box
        // onClick={() => navigate("/trips")}
        gridColumn={isMobile ? "1" : "span 4"}
        gridRow="span 2"
        backgroundColor={colors.primary[400]}
        p="30px"
        sx={{
          cursor: "pointer",
          transition: "background-color 0.3s ease",
          "&:hover": {
            backgroundColor: `${colors.grey[800]}`,
          },
        }}
      >
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
                  fontSize: "1rem", // Add the fontSize property to change the font size
                  "&:hover": {
                    backgroundColor: "secondary.main",
                    color: "secondary.contrastText",
                  },
                }}
                onClick={handleAddPlace}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "0.8rem", // Add the fontSize property to change the font size
                  }}
                >
                  {hoveredDay ? `Add place to ${hoveredDay}` : "Add Place"}
                </Typography>
              </Button>
              <StatBox
                sx={highlightStyle}
                subtitle={`${formatDate(day?.date)}`}
              />
              {/* Render the information for each day */}

              {/* Render the Accommodation */}
              <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
                Accommodation:
              </Typography>
              {accommodation ? (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <StatBox subtitle={accommodation?.name} />
                  {/* <Typography>{accommodation?.name}</Typography> */}
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
                      <StatBox subtitle={restaurant?.name} />
                      {/* <Typography>{restaurant?.name}</Typography> */}

                      {restaurantHover[restaurant?._id] ? (
                        <CloseOutlinedIcon
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            handleRemovePlace("restaurant", restaurant?._id)
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
                {plans.length > 0 ? (
                  plans.map((plan) => (
                    <Box
                      key={plan?._id}
                      sx={{ display: "flex", alignItems: "center", mb: 1 }}
                    >
                      <StatBox subtitle={plan?.name} />
                      {/* <Typography>{plan?.name}</Typography> */}

                      {planHover[plan?._id] ? (
                        <CloseOutlinedIcon
                          style={{ cursor: "pointer" }}
                          onClick={() => handleRemovePlace("plan", plan?._id)}
                          onMouseLeave={() =>
                            setPlansHover((prevState) => ({
                              ...prevState,
                              [plan?._id]: false,
                            }))
                          }
                        />
                      ) : (
                        <RemoveOutlinedIcon
                          style={{ cursor: "pointer" }}
                          onClick={() => handleRemovePlace("plan", plan?._id)}
                          onMouseEnter={() =>
                            setPlansHover((prevState) => ({
                              ...prevState,
                              [plan?._id]: true,
                            }))
                          }
                        />
                      )}
                    </Box>
                  ))
                ) : (
                  <Typography>No plans for today</Typography>
                )}
              </Box>
            </>
          )}
        </CardContent>
      </Box>
    </Card>
  );
};

export default DayCard;
