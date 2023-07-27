import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EventOptionsModal = ({ selectedTrip, onClose, onDelete, onEdit }) => {
  const handleDelete = async () => {
    try {
      // Assuming onDelete is an async function that handles deletion
      await onDelete();
      // Show success toast notification
      toast.success("Trip deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      onClose(); // Close the modal after successful deletion
    } catch (error) {
      // Handle error if necessary
      console.error("Error deleting event:", error);
      // Show error toast notification
      toast.error("Error deleting Trip. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

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
          sx={{ marginRight: 2 }}
        >
          Edit
        </Button>

        {/* Delete Button */}
        <Button
          onClick={handleDelete} // Use the handleDelete function here
          variant="contained"
          color="error"
          sx={{ marginRight: 2 }}
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
