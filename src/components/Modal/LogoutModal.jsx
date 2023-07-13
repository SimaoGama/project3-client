import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

const LogoutModal = ({
  handleLogoutConfirmation,
  isConfirmationOpen,
  setIsConfirmationOpen,
}) => {
  return (
    <Dialog
      open={isConfirmationOpen}
      onClose={() => setIsConfirmationOpen(false)}
    >
      <DialogTitle>Confirm Logout</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Are you sure you want to log out?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsConfirmationOpen(false)}>Cancel</Button>
        <Button
          onClick={handleLogoutConfirmation}
          variant="contained"
          color="primary"
        >
          Logout
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogoutModal;
