import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { styled } from "@mui/system";
import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router-dom";
import EditTrip from "../EditTrip/EditTrip";
import EditDay from "../EditDay/EditDay";
import ActionButtons from "./ActionButtons";

const StyledCard = styled(Card)(({ theme }) => ({
  elevation: 6,
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 350,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  marginBottom: "10px",
}));

const StyledCardActions = styled(CardActions)(({ theme }) => ({
  justifyContent: "flex-end",
}));

const PlaceDetails = ({
  place,
  selected,
  refProp,
  userTrips,
  setShowEditDialog,
  selectedTrip,
  setSelectedTrip,
  setSelectedPlace,
  colors,
}) => {
  const [showTripForm, setShowTripForm] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (selected && refProp?.current) {
      refProp.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selected, refProp]);

  if (selected) {
    refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const handleAddToTrip = () => {
    setShowTripForm(true); // Show the form to select a trip
  };

  const handleTripSelectionChange = (event) => {
    setSelectedTrip(event.target.value); // Update the selected trip
  };

  const handleConfirmAddToTrip = () => {
    if (selectedTrip) {
      setSelectedPlace(place);
      setShowEditDialog(true); // Show the EditDay dialog
    } else {
      console.log("Please select a trip");
    }

    setShowTripForm(false); // Hide the form to select a trip
  };

  return (
    <StyledCard
      elevation={6}
      sx={{
        transition: "background-color 0.3s ease",
        "&:hover": {
          backgroundColor: `${colors.greenAccent[700]}`,
        },
      }}
    >
      <StyledCardMedia
        image={
          place.photo
            ? place.photo.images.large.url
            : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
        }
        title={place.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">
          {place?.name}
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Rating value={Number(place.rating)} readOnly />
          <Typography gutterBottom variant="subtitle1">
            out of {place.num_reviews} reviews
          </Typography>
        </Box>
        <StyledBox>
          <Typography variant="subtitle1">Price</Typography>
          <Typography gutterBottom variant="subtitle1">
            {place?.price_level}
          </Typography>
        </StyledBox>
        <StyledBox>
          <Typography variant="subtitle1">Ranking</Typography>
          <Typography gutterBottom variant="subtitle1">
            {place?.ranking}
          </Typography>
        </StyledBox>
        {place?.awards?.map((award, index) => (
          <Box
            key={index}
            display="flex"
            justifyContent="space-between"
            my={1}
            alignItems="center"
          >
            <img src={award.images.small} alt={award.display_name} />
            <Typography variant="subtitle2" color="textSecondary">
              {award.display_name}
            </Typography>
          </Box>
        ))}
        {place?.cuisine?.map(({ name }) => (
          <Chip key={name} size="small" label={name} />
        ))}
        {place.address && (
          <Typography gutterBottom variant="body2" color="textSecondary">
            <LocationOnOutlinedIcon />
            {place.address}
          </Typography>
        )}
        {place.phone && (
          <Typography gutterBottom variant="body2" color="textSecondary">
            <PhoneIcon />
            {place.phone}
          </Typography>
        )}
        <ActionButtons
          place={place}
          showTripForm={showTripForm}
          selectedTrip={selectedTrip}
          handleTripSelectionChange={handleTripSelectionChange}
          userTrips={userTrips}
          handleAddToTrip={handleAddToTrip}
          handleConfirmAddToTrip={handleConfirmAddToTrip}
        />
      </CardContent>
    </StyledCard>
  );
};

export default PlaceDetails;
