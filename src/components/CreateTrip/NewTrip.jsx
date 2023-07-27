import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext, useState } from "react";
import { Box } from "@mui/material";
import { addTrip } from "../../api/trips.api";
import { AuthContext } from "../../context/auth.context";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewTrip = ({ handleClose, reFetch }) => {
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [days, setDays] = useState([]);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const { user, authenticateUser } = useContext(AuthContext);
  const [open, setOpen] = useState(true);

  const navigate = useNavigate();

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

  const handleNameChange = (event) => {
    setDestination(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleCreateNewTrip = async (e) => {
    e.preventDefault();
    const userId = user._id;
    const newTrip = {
      destination,
      startDate,
      endDate,
      days,
    };

    try {
      const response = await addTrip(newTrip, userId);
      console.log("New trip created:", response.data);

      toast.success("Trip created successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setIsFormSubmitted(true); // Set the form submission status to true
      // Fetch updated user data to include the new trip
      authenticateUser(true);
      if (reFetch) {
        reFetch();
      }
    } catch (error) {
      console.log("Error creating new trip:", error);
      toast.error("Error creating trip. Please try again!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    setDestination("");
    setStartDate("");
    setEndDate("");
    setDays([]);
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

  return (
    <Dialog open={open} onClose={handleComponentClose} maxWidth="md" sx={{}}>
      <DialogTitle>Create new trip</DialogTitle>
      <form onSubmit={handleCreateNewTrip}>
        <DialogContent sx={{ width: 600 }}>
          <DialogContentText>Name your new trip!</DialogContentText>
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
              value={startDate}
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
              value={endDate}
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
          <Button
            sx={{ color: "text.secondary" }}
            onClick={handleComponentClose}
          >
            Close
          </Button>
          <Button sx={{ color: "text.secondary" }} type="submit">
            Submit new trip
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default NewTrip;
