import React, { createRef, useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import PlaceDetails from "../PlaceDetails/PlaceDetails";

const PlacesList = ({
  places,
  childClicked,
  isLoading,
  type,
  setType,
  rating,
  setRating,
  userTrips,
}) => {
  const [elementRef, setElementRef] = useState([]);

  useEffect(() => {
    setElementRef((refs) =>
      Array(places?.length)
        .fill()
        .map((_, i) => refs[i] || createRef())
    );
  }, [places]);

  return (
    <>
      <Card>
        <CardContent>
          <Typography gutterBottom pt={2} pb={2} variant="h3">
            {`${type.charAt(0).toUpperCase()}${type.slice(1)} around you`}
          </Typography>

          <Box pb={2}>
            <FormControl sx={{ minWidth: 120, mr: 2 }}>
              <InputLabel id="type">Type</InputLabel>
              <Select
                id="type"
                value={type}
                label={type}
                onChange={(e) => setType(e.target.value)}
              >
                <MenuItem value="restaurants">Restaurants</MenuItem>
                <MenuItem value="hotels">Hotels</MenuItem>
                <MenuItem value="attractions">Attractions</MenuItem>
              </Select>
            </FormControl>
            <FormControl id="rating" sx={{ minWidth: 120, mr: 2 }}>
              <InputLabel>Rating</InputLabel>
              <Select
                id="rating"
                value={rating}
                label="rating"
                onChange={(e) => setRating(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="3">Above 3.0</MenuItem>
                <MenuItem value="4">Above 4.0</MenuItem>
                <MenuItem value="4.5">Above 4.5</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </CardContent>
      </Card>
      {isLoading ? (
        <Box
          justifyContent="center"
          alignItems="center"
          height="100%"
          display="flex"
        >
          <CircularProgress size="5rem" />
        </Box>
      ) : (
        <Box style={{ maxHeight: "calc(100vh - 200px)", overflow: "auto" }}>
          <Grid container spacing={3}>
            {places?.map((place, i) => (
              <Grid key={i} item xs={12}>
                <PlaceDetails
                  selected={Number(childClicked) === i}
                  refProp={elementRef[i]}
                  place={place}
                  userTrips={userTrips}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </>
  );
};

export default PlacesList;
