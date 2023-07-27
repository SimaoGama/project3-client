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

const DeleteModal = ({
  handleDeleteClick,
  isConfirmationOpen,
  setIsConfirmationOpen,
  destination,
}) => {
  const deleteModalConfirmation = () => {
    return toast.success(`Trip deleted successfully!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleDelete = async () => {
    // Call the delete function and handle success and error
    try {
      await handleDeleteClick(); // Assuming handleDeleteClick is an async function
      deleteModalConfirmation(); // Call the toast notification on success
      setIsConfirmationOpen(false); // Close the modal
    } catch (error) {
      // Handle error here if necessary
      console.error("Error deleting trip:", error);
    }
  };

  return (
    <Dialog
      open={isConfirmationOpen}
      onClose={() => setIsConfirmationOpen(false)}
    >
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          {`Are you sure you want to delete your trip ${destination} ?`}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsConfirmationOpen(false)}>Cancel</Button>
        <Button onClick={handleDelete} variant="contained" color="primary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
