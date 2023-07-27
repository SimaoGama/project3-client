import { useState, useContext, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { updateTrip, getTrip } from "../../api/trips.api";
import { AuthContext } from "../../context/auth.context";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { baseURL } from "../../api/trips.api";

const EditTrip = ({ onClose, handleClose }) => {
  const { user, authenticateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const params = useParams();

  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [days, setDays] = useState([]);
  const [open, setOpen] = useState(true);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const tripId = params.tripId; // Access the tripId from the URL parameters
  console.log(tripId);

  const {
    data: tripData,
    isLoading,
    error,
  } = useFetch(`${baseURL}/trip/${tripId}`);

  useEffect(() => {
    // Close the dialog when form submission is successful and navigation is complete
    if (isFormSubmitted && open) {
      setOpen(false);
      // If handleClose prop is provided, call it
      if (handleClose) {
        handleClose();
      } else {
        // If handleClose prop is not provided, navigate back
        navigate(-1); // Go back to the previous page
      }
    }
  }, [isFormSubmitted, open, handleClose, navigate]);

  useEffect(() => {
    if (tripData) {
      setDestination(tripData.destination);
      setStartDate(tripData.startDate);
      setEndDate(tripData.endDate);
      //   setDays(tripData.days);
    }
  }, [tripData]);

  console.log(destination);

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
    const userId = user._id;
    const updatedTrip = {
      destination,
      startDate,
      endDate,
      days,
    };

    try {
      const response = await updateTrip(updatedTrip, tripId); // Include the tripId as a separate parameter
      console.log("Trip updated:", response.data);
      setIsFormSubmitted(true);

      authenticateUser(true);
      if (reFetch) {
        reFetch();
      }
    } catch (error) {
      console.log("Error updating trip:", error);
    }
  };

  const handleComponentClose = () => {
    setOpen(false); // Close the dialog

    // If handleClose prop is provided, call it
    if (handleClose) {
      handleClose();
    } else {
      // If handleClose prop is not provided, navigate back
      navigate(-1); // Go back to the previous page
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Dialog open={open} onClose={handleComponentClose} maxWidth="md" sx={{}}>
      <DialogTitle>Edit trip</DialogTitle>
      <form onSubmit={handleEditTrip}>
        <DialogContent sx={{ width: 600 }}>
          <DialogContentText>Edit this trip</DialogContentText>
          <Box sx={{ mb: 2 }}>
            <TextField
              autoFocus
              margin="dense"
              id="destination"
              label={"My trip to ..."}
              type="text"
              value={destination}
              onChange={handleNameChange}
              fullWidth
              variant="standard"
            />
          </Box>

          <Box sx={{ mb: 2 }}>
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
              InputLabelProps={{
                style: {
                  color: "text.secondary",
                },
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: "text.secondary" }} onClick={handleClose}>
            Close
          </Button>
          <Button sx={{ color: "text.secondary" }} type="submit">
            Submit updated trip
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditTrip;
