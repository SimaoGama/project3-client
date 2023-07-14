import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

const DeleteModal = ({
  handleDeleteClick,
  isConfirmationOpen,
  setIsConfirmationOpen,
}) => {
  return (
    <Dialog
      open={isConfirmationOpen}
      onClose={() => setIsConfirmationOpen(false)}
    >
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Are you sure you want to delete your trip?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsConfirmationOpen(false)}>Cancel</Button>
        <Button onClick={handleDeleteClick} variant="contained" color="primary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
