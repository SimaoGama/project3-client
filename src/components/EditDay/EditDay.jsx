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
import PlaceDetails from "../PlaceDetails/PlaceDetails";
import "./EditDay.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EditDay = ({ selectedTrip, setShowEditDialog, places }) => {
  const navigate = useNavigate();
  const params = useParams();

  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [days, setDays] = useState([]);

  // const tripId = params.id; // Access the tripId from the URL parameters

  const {
    data: tripData,
    isLoading,
    error,
  } = useFetch(`${baseURL}/trip/${selectedTrip}`);

  useEffect(() => {
    console.log("edit day component");
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
      <DialogTitle>Edit Trip</DialogTitle>
      <form onSubmit={handleEditTrip}>
        <DialogContent>
          <DialogContentText>Edit this trip</DialogContentText>
          <Box mb={2}>
            <TextField
              autoFocus
              margin="dense"
              id="destination"
              label="Destination"
              type="text"
              value={destination}
              onChange={handleNameChange}
              fullWidth
              variant="standard"
            />
          </Box>
          <Box mb={2}>
            <DialogContentText>Start Date</DialogContentText>
            <TextField
              margin="dense"
              id="startDate"
              type="date"
              value={formatDate(startDate)}
              onChange={handleStartDateChange}
              fullWidth
              variant="standard"
            />
          </Box>
          <Box>
            <DialogContentText>End Date</DialogContentText>
            <TextField
              margin="dense"
              id="endDate"
              type="date"
              value={formatDate(endDate)}
              onChange={handleEndDateChange}
              fullWidth
              variant="standard"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button type="submit" color="primary">
            Save
          </Button>
        </DialogActions>
      </form>
      {/* <PlaceDetails places={places} /> */}
      <Box className="days-container">
        {tripData?.days &&
          tripData.days.map((day) => <DayCard key={day._id} day={day} />)}
      </Box>
    </Dialog>
  );
};

export default EditDay;
