import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { addTrip } from "../../api/trips.api";
import { AuthContext } from "../../context/auth.context";

const NewTrip = () => {
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { user } = useContext(AuthContext);

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
    };

    try {
      const response = await addTrip(newTrip, userId);
      console.log("New trip created:", response.data);
      handleClose();
    } catch (error) {
      console.log("Error creating new trip:", error);
    }

    setDestination("");
    setStartDate("");
    setEndDate("");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleCreateNewTrip}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Create new trip
      </Button> */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create new trip</DialogTitle>
        <DialogContent>
          <DialogContentText>Name your new trip!</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="destination"
            label="My trip to ..."
            type="text"
            value={destination}
            onChange={handleNameChange}
            fullWidth
            variant="standard"
          />

          <TextField
            margin="dense"
            id="startDate"
            label=""
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            fullWidth
            variant="standard"
          />

          <TextField
            margin="dense"
            id="endDate"
            label=""
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            fullWidth
            variant="standard"
          />
          <DialogActions>
            <Button onClick={handleClose}>confirm</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <Button type="submit">Submit new trip</Button>
    </Box>
  );
};

export default NewTrip;
