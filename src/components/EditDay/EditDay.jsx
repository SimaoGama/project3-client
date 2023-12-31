import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  TextField,
  Typography,
} from "@mui/material";
import {
  updateTrip,
  getTrip,
  updateDay,
  deleteRestaurant,
  deleteAccommodation,
  getRestaurant,
  getAccommodation,
  deletePlan,
} from "../../api/trips.api";

import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { baseURL } from "../../api/trips.api";
import DayCard from "./DayCard";
import "./EditDay.css";
import PlaceCard from "../PlaceDetails/PlaceCard";
import DeleteModal from "../Modal/DeleteModal";
import IsLoadingDefault from "../Loading/isLoadingDefault";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} timeout={700} />;
});

const EditDay = ({
  selectedPlace,
  setShowEditDialog,
  selectedTrip,
  setCoordinates,
}) => {
  const navigate = useNavigate();
  const params = useParams();

  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [days, setDays] = useState([]);
  const [tripInfo, setTripInfo] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [place, setPlace] = useState({});
  const [accommodation, setAccommodation] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    setTripInfo(selectedTrip); // Set the tripInfo state when selectedTrip changes
  }, [selectedTrip]);

  const {
    data: tripData,
    isLoading,
    error,
    reFetch,
  } = useFetch(`${baseURL}/trip/${selectedTrip}`);

  // tripData.days.forEach((day) => {
  //   console.log("Day ID:", day._id);
  //   console.log("Restaurants:", day.restaurants);
  // });

  useEffect(() => {
    if (tripData && tripData.days) {
      setDestination(tripData.destination);
      setStartDate(tripData.startDate);
      setEndDate(tripData.endDate);
      setDays(tripData.days);

      // Extract restaurants and accommodation from each day in the tripData.days array
      const extractedRestaurants = tripData.days.flatMap(
        (day) => day.restaurants || []
      );
      const extractedPlans = tripData.days.flatMap((day) => day.plans || []);

      const extractedAccommodation = tripData.days
        .map((day) => day.accommodation)
        .filter((acc) => acc !== null);

      setRestaurants(extractedRestaurants);
      setPlans(extractedPlans);
      setAccommodation(extractedAccommodation[0] || null); // If there's no accommodation, set it to null

      tripData.days.forEach((day) => {
        console.log("Day ID:", day._id);
        console.log("Restaurants:", day.restaurants);
        console.log("Plans:", day.plans);
        console.log("Accommodation:", day.accommodation);
      });
    }
  }, [tripData]);

  useEffect(() => {
    if (selectedPlace) {
      setPlace(selectedPlace);
    }
  }, [selectedPlace]);

  const handleClose = () => {
    setIsOpen(false);
    setShowEditDialog(false);
  };

  const handleAddPlaceToDay = async (dayId, place) => {
    try {
      const response = await updateDay(dayId, place);
      console.log("Day updated:", response);

      // Update the local 'days' array with the updated day data returned from the backend
      const updatedDays = days.map((day) =>
        day._id === dayId ? response : day
      );

      // Check if the place is a restaurant and has a valid _id
      if ("price_level" in place && "cuisine" in place && place._id) {
        // Find the index of the day in the updatedDays array
        const dayIndex = updatedDays.findIndex((day) => day._id === dayId);
        if (dayIndex !== -1) {
          const updatedDay = { ...updatedDays[dayIndex] };

          // updatedDay.restaurants.push(response.data._id);
          updatedDays[dayIndex] = updatedDay;
        }
      } else if ("hotel_class" in place && "special_offers" in place) {
        // Handle adding accommodation to the day, if needed
        // No need to update place._id here, as it should already be present in response.data
      } else if (place.category.key === "attraction") {
        const dayIndex = updatedDays.findIndex((day) => day._id === dayId);
        if (dayIndex !== -1) {
          const updatedDay = { ...updatedDays[dayIndex] };

          // updatedDay.restaurants.push(response.data._id);
          updatedDays[dayIndex] = updatedDay;
        }
      }

      setDays(updatedDays); // Update the local state with the updated day
      reFetch(); // need to reFetch() to trigger the useEffect and get the tripData into the state
    } catch (error) {
      console.log("Error updating day:", error);
      // Handle error, e.g., show an error message to the user
    }
  };

  const handleRemovePlaceFromDay = async (dayId, type, place) => {
    if (!place) {
      console.error("Invalid place:", place);
      return;
    }
    console.log("place", place);
    setIsConfirmationOpen(true);
    try {
      if (type === "accommodation") {
        await deleteAccommodation(place);
        // If the API call is successful, update the local state with the deleted accommodation
        setDays((prevDays) => {
          const updatedDays = prevDays.map((day) => {
            if (day._id === dayId) {
              return { ...day, accommodation: null };
            }
            return day;
          });
          return updatedDays;
        });
      } else if (type === "restaurant") {
        await deleteRestaurant(place);
        // If the API call is successful, update the local state with the deleted restaurant
        setDays((prevDays) => {
          const updatedDays = prevDays.map((day) => {
            if (day._id === dayId) {
              return {
                ...day,
                restaurants: day.restaurants.filter((r) => r !== place),
              };
            }
            return day;
          });
          return updatedDays;
        });
      } else if (type === "plan") {
        await deletePlan(place);
        // If the API call is successful, update the local state with the deleted restaurant
        setDays((prevDays) => {
          const updatedDays = prevDays.map((day) => {
            if (day._id === dayId) {
              return {
                ...day,
                plans: day.plans.filter((r) => r !== place),
              };
            }
            return day;
          });
          return updatedDays;
        });
      }
    } catch (error) {
      console.error("Error deleting place:", error);
      // Handle error, e.g., show an error message to the user
    }
  };

  if (isLoading) {
    return <IsLoadingDefault />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const titleStyle = {
    textAlign: "center",
    fontSize: 20,
  };

  const highlightStyle = {
    color: "#1976d2",
    fontWeight: "bold",
  };

  // Callback function to update the 'days' state in EditDay
  const updateDaysState = (updatedDays) => {
    setDays(updatedDays);
  };

  // Callback function to update the 'restaurants' state in EditDay
  const updateRestaurantsState = (updatedRestaurants) => {
    setRestaurants(updatedRestaurants);
  };

  // Callback function to update the 'accommodation' state in EditDay
  const updateAccommodationState = (updatedAccommodation) => {
    setAccommodation(updatedAccommodation);
  };
  // Callback function to update the 'plan' state in EditDay
  const updatePlansState = (updatedPlans) => {
    setPlans(updatedPlans);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      fullScreen
      TransitionComponent={Transition}
    >
      <DialogTitle>
        Edit your trip to{" "}
        <Typography
          component="span"
          variant="inherit"
          color="primary"
          style={{
            textDecoration: "underline",
            cursor: "pointer",
            transition: "color 0.2s",
          }}
          onClick={() => navigate(`/trips/edit/${selectedTrip}`)}
          onMouseEnter={(e) => (e.target.style.color = "blue")}
          onMouseLeave={(e) => (e.target.style.color = "inherit")}
        >
          {tripData.destination}
        </Typography>{" "}
      </DialogTitle>

      <Box display="flex" justifyContent="center" mt={2}>
        <Box maxWidth={400}>
          <PlaceCard place={selectedPlace} />
        </Box>
        <Button
          sx={{ backgroundColor: "#f0f0f0", borderRadius: "5px" }}
          onClick={handleClose}
        >
          Back
        </Button>
      </Box>
      {tripInfo && (
        <>
          <DialogTitle sx={titleStyle}>
            Chose a day to add{" "}
            <Typography component="span" variant="inherit" sx={highlightStyle}>
              {selectedPlace.name.toUpperCase()}
            </Typography>{" "}
            to your{" "}
            <Typography
              component="span"
              variant="inherit"
              color="primary"
              style={{ textDecoration: "underline", cursor: "pointer" }}
              onClick={() => navigate(`/trip/${selectedTrip}`)}
              sx={highlightStyle}
            >
              {destination}
            </Typography>{" "}
            trip to:
          </DialogTitle>
          <Box className="days-container">
            {tripData?.days &&
              tripData.days.map((day) => {
                return (
                  <DayCard
                    highlightStyle={highlightStyle}
                    key={day._id}
                    day={day}
                    place={place}
                    isConfirmationOpen={isConfirmationOpen}
                    setIsConfirmationOpen={setIsConfirmationOpen}
                    onAddPlaceToDay={handleAddPlaceToDay}
                    onRemovePlaceFromDay={handleRemovePlaceFromDay}
                    updateDaysState={updateDaysState}
                    updateRestaurantsState={updateRestaurantsState}
                    updateAccommodationState={updateAccommodationState}
                    updatePlanState={updatePlansState}
                    setCoordinates={setCoordinates}
                  />
                );
              })}
          </Box>
        </>
      )}
      {/* <DeleteModal
        isConfirmationOpen={isConfirmationOpen}
        setIsConfirmationOpen={setIsConfirmationOpen}
        handleDeleteClick={handleRemovePlaceFromDay}
      /> */}
    </Dialog>
  );
};

export default EditDay;
