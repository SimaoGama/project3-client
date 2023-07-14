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

const TripCard = ({ trip, handleDelete }) => {
  const [expanded, setExpanded] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
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
    return totalDays;
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
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {trip?.destination.charAt(0)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Typography variant="h4" component="div">
            {trip?.destination}
          </Typography>
        }
        subheader={`From: ${formatDate(trip?.startDate)} to ${formatDate(
          trip?.endDate
        )}`}
      />
      <CardMedia
        component="img"
        height="194"
        image={trip.img ? trip.img : IMG_URL}
        alt="Destination img"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {`My ${totalDays}-day trip to ${trip?.destination}`}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
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
        />
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Overview:</Typography>
          <DayList days={trip.days} />
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default TripCard;
