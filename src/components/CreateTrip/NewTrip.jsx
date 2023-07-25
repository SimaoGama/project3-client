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

const NewTrip = ({ handleClose }) => {
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [days, setDays] = useState([]);
  const { user, authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/trips");
  };

  const [open, setOpen] = useState(true);

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
      handleClose();
      // Fetch updated user data to include the new trip
      authenticateUser(true);
      handleNavigate(); // Navigate to "/trips"
    } catch (error) {
      console.log("Error creating new trip:", error);
    }

    setDestination("");
    setStartDate("");
    setEndDate("");
    setDays([]);
  };

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  //   navigate("/trips");
  // };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" sx={{}}>
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
          <Button sx={{ color: "text.secondary" }} onClick={handleClose}>
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
