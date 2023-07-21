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
import { updateTrip, getTrip } from "../../api/trips.api";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { baseURL } from "../../api/trips.api";
import DayCard from "./DayCard";
import "./EditDay.css";
import PlaceCard from "../PlaceDetails/PlaceCard";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EditDay = ({ selectedPlace, setShowEditDialog, selectedTrip }) => {
  const navigate = useNavigate();
  const params = useParams();

  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [days, setDays] = useState([]);
  const [tripInfo, setTripInfo] = useState(null);

  useEffect(() => {
    setTripInfo(selectedTrip); // Set the tripInfo state when selectedTrip changes
  }, [selectedTrip]);

  // const tripId = params.id; // Access the tripId from the URL parameters

  const {
    data: tripData,
    isLoading,
    error,
  } = useFetch(`${baseURL}/trip/${selectedTrip}`);

  useEffect(() => {
    if (tripData) {
      setDestination(tripData.destination);
      setStartDate(tripData.startDate);
      setEndDate(tripData.endDate);
      setDays(tripData.days);
    }
  }, [tripData]);

  const formatDate = (dateString) => {
    if (!dateString || !Date.parse(dateString)) {
      return "";
    }

    const date = new Date(dateString);
    return date.toISOString().substring(0, 10);
  };

  const handleNameChange = (event) => {
    setDestination(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleEditTrip = async (e) => {
    e.preventDefault();

    const updatedTrip = {
      destination,
      startDate,
      endDate,
    };

    try {
      const response = await updateTrip(updatedTrip, selectedTrip);
      console.log("Trip updated:", response.data);
      handleClose();
      navigate("/map");
    } catch (error) {
      console.log("Error updating trip:", error);
    }
  };

  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    setShowEditDialog(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      fullScreen
      TransitionComponent={Transition}
    >
      <DialogTitle>Edit</DialogTitle>
      <Box display="flex" justifyContent="center" mt={2}>
        {/* Wrap PlaceCard in a Box container to center it */}
        <Box maxWidth={400}>
          <PlaceCard place={selectedPlace} />
        </Box>
        <Button
          sx={{ backgroundColor: "#f0f0f0", borderRadius: "5px" }}
          onClick={handleClose}
        >
          Close
        </Button>
      </Box>
      {tripInfo && (
        <>
          <DialogTitle>Chose a day to add to:</DialogTitle>
          <Box className="days-container">
            {tripData?.days &&
              tripData.days.map((day) => (
                <DayCard key={day._id} day={day} place={tripInfo.place} />
              ))}
          </Box>
        </>
      )}
    </Dialog>
  );
};

export default EditDay;
