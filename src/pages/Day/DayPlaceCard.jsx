import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { styled } from "@mui/system";
import Rating from "@mui/material/Rating";
import { getLocation } from "../../api/trips.api";
import SimpleGoogleMap from "../Dashboard/SimpleGoogleMap";

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

const DayPlaceCard = ({ place }) => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  // console.log("PLACE", place.location);

  useEffect(() => {
    const fetchLocation = async () => {
      if (place && place.location) {
        const locationId = place.location;
        const response = await getLocation(locationId);
        const data = response.data; // Access the 'data' object from the response

        // console.log("data", data);
        setLatitude(data.lat);
        setLongitude(data.lng);
      }
    };
    fetchLocation();
  }, [place]);

  // console.log("LAT", latitude);
  // console.log("LNG", longitude);

  return (
    <StyledCard elevation={6}>
      <Box
        display="flex"
        justifyContent="space-between"
        width="600px"
        height="400px"
      >
        <SimpleGoogleMap lat={latitude} lng={longitude} />
      </Box>

      <CardContent>
        <Typography gutterBottom variant="h5">
          {place?.name}
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Typography gutterBottom variant="subtitle1">
            Rating:
          </Typography>
          <Rating value={Number(place?.rating)} readOnly />
        </Box>

        {place?.awards?.map((award, index) => (
          <Box
            key={index}
            display="flex"
            justifyContent="space-between"
            my={1}
            alignItems="center"
          >
            <img src={award?.images.small} alt={award?.display_name} />
            <Typography variant="subtitle2" color="textSecondary">
              {award?.display_name}
            </Typography>
          </Box>
        ))}
        {place?.cuisine?.map(({ name }) => (
          <Chip key={name} size="small" label={name} />
        ))}
        {place?.address && (
          <Typography gutterBottom variant="body2" color="textSecondary">
            <LocationOnOutlinedIcon />
            {place.address}
          </Typography>
        )}
        {place?.phone && (
          <Typography gutterBottom variant="body2" color="textSecondary">
            <PhoneIcon />
            {place?.phone}
          </Typography>
        )}
      </CardContent>
    </StyledCard>
  );
};

export default DayPlaceCard;
