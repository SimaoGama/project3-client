import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { useState } from "react";
import { deleteTrip } from "../../api/trips.api";
import DeleteModal from "../Modal/DeleteModal";
import DayList from "./DayList";
import { Box, Menu, MenuItem, useMediaQuery } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Link, useNavigate } from "react-router-dom";
import { tokens } from "../../data/theme";
import { useTheme } from "@emotion/react";

const IMG_URL =
  "https://www.gtitravel.com/wp-content/uploads/2017/06/Do-Travel-Agents-get-free-trips.jpg";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const CardContainer = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  marginBottom: "2rem", // Add margin between cards for mobile
  boxShadow: "0 6px 20px rgba(56, 125, 255, 0.17)", // Add boxShadow for mobile
}));

const CardImage = styled(CardMedia)(({ theme }) => ({
  height: "194px", // Set a fixed height for the card image on mobile
}));

const CardInfo = styled(CardContent)(({ theme }) => ({
  padding: "20px 30px 30px",
}));

const CardText = styled(Typography)(({ theme }) => ({
  color: "#252e48",
  fontSize: "18px",
  lineHeight: "24px",
}));

const CardActionsWrapper = styled(CardActions)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between", // Align actions to the sides for mobile
  paddingTop: 0, // Remove padding at the top for mobile
}));

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none", // Remove underline from the link
}));

// Define a custom styled Card component with border glow on hover
const GlowCard = styled(Card)(({ theme }) => ({
  transition: "box-shadow 0.3s ease-in-out",
  "&:hover": {
    boxShadow: "0 0 20px rgba(76, 206, 172, 0.5)",
  },
}));

const TripCard = ({ trip, handleDelete }) => {
  const [expanded, setExpanded] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const navigate = useNavigate();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleEditClick = (id) => {
    navigate(`/trips/edit/${id}`);
    handleCloseMenu();
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().substring(0, 10);
  };

  const getTotalDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = Math.abs(end.getTime() - start.getTime());
    const totalDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return totalDays + 1;
  };

  const totalDays = getTotalDays(trip?.startDate, trip?.endDate);

  const handleDeleteClick = async () => {
    try {
      await deleteTrip(trip._id);
      handleDelete(trip._id); // Call the parent component's handleDelete function to remove the deleted trip from the UI
    } catch (error) {
      console.log("Error deleting trip:", error);
    }
  };

  return (
    <Box
      gridColumn={isMobile ? "1" : "span 4"} // Use 1 column for mobile and 4 columns for larger screens
      backgroundColor={colors.primary[400]}
      alignItems="center"
      justifyContent="center"
      sx={{
        cursor: "pointer",
        transition: "background-color 0.3s ease",
        "&:hover": {
          backgroundColor: `${colors.greenAccent[500]}`,
        },
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: colors.greenAccent[200] }} aria-label="recipe">
            {trip?.destination.charAt(0)}
          </Avatar>
        }
        action={
          <>
            <IconButton
              aria-label="settings"
              aria-controls="edit-menu"
              aria-haspopup="true"
              onClick={handleMenuClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="edit-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
            >
              <MenuItem onClick={() => handleEditClick(trip._id)}>
                <IconButton size="small" aria-label="edit" color="inherit">
                  <EditIcon fontSize="small" />
                </IconButton>
                Edit
              </MenuItem>
            </Menu>
          </>
        }
        title={
          <StyledLink to={`/trip/${trip._id}`}>
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{ color: colors.grey[100] }}
              gutterBottom
            >
              {trip?.destination}
            </Typography>
          </StyledLink>
        }
        subheader={`From: ${formatDate(trip?.startDate)} to ${formatDate(
          trip?.endDate
        )}`}
      />
      <CardImage
        component="img"
        image={trip.img ? trip.img : IMG_URL}
        alt="Destination img"
      />
      <CardInfo>
        <CardText>
          {`My ${totalDays}-day trip to ${trip?.destination}`}
        </CardText>
      </CardInfo>
      <CardActionsWrapper disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          aria-label="delete"
          onClick={() => setIsConfirmationOpen(true)}
        >
          <DeleteForeverOutlinedIcon />
        </IconButton>
        <DeleteModal
          isConfirmationOpen={isConfirmationOpen}
          setIsConfirmationOpen={setIsConfirmationOpen}
          handleDeleteClick={handleDeleteClick}
          destination={trip?.destination}
        />
        <ExpandMore
          onClick={handleExpandClick}
          expand={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActionsWrapper>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Overview:</Typography>
          <DayList days={trip?.days} />
        </CardContent>
      </Collapse>
    </Box>
  );
};

export default TripCard;
