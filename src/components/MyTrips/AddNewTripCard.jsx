import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import { Collapse } from "@mui/material";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import NewTrip from "../CreateTrip/NewTrip";
import { useNavigate } from "react-router-dom";

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

const AddNewTripCard = () => {
  const navigate = useNavigate();

  const handleAddTrip = () => {
    navigate("/trips/new");
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 140 }} title="Add Trip">
        <AddIcon sx={{ fontSize: 80, margin: "auto" }} />
      </CardMedia>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Add a New Trip
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Click the plus sign to add a new trip.
        </Typography>
      </CardContent>

      <CardActions>
        <Button
          size="small"
          onClick={handleAddTrip}
          sx={{ color: "text.secondary" }}
        >
          Add Trip
        </Button>
      </CardActions>
    </Card>
  );
};

export default AddNewTripCard;
