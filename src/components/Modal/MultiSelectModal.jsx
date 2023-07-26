import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
// import styled from "styled-components"; // If you are using styled-components for ModalContainer

const EventOptionsModal = ({ selectedTrip, onClose, onDelete, onEdit }) => {
  return (
    <Dialog open={Boolean(selectedTrip)} onClose={onClose}>
      <DialogTitle>
        <Typography variant="h6" gutterBottom>
          {selectedTrip && selectedTrip.title}
        </Typography>
      </DialogTitle>
      <DialogActions>
        {/* Edit Button */}
        <Button
          onClick={onEdit}
          variant="contained"
          color="secondary"
          sx={{ marginRight: 2 }} // Custom margin for spacing between buttons
        >
          Edit
        </Button>

        {/* Delete Button */}
        <Button
          onClick={onDelete}
          variant="contained"
          color="error" // Red color for the delete button
          sx={{ marginRight: 2 }} // Custom margin for spacing between buttons
        >
          Delete
        </Button>

        {/* Cancel Button */}
        <Button onClick={onClose} variant="contained" color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventOptionsModal;
