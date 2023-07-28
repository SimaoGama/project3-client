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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import PlaceDetails from "../PlaceDetails/PlaceDetails";
import SearchButton from "../../pages/Map/SearchButton";
import IsLoadingRamen from "../Loading/isLoadingRamen";
import IsLoadingHotel from "../Loading/isLoadingHotel";
import IsLoadingAttraction from "../Loading/isLoadingAttraction";

const PlacesList = ({
  places,
  childClicked,
  isLoading,
  type,
  setType,
  rating,
  setRating,
  userTrips,
  setShowEditDialog,
  showEditDialog,
  handleTripSelection,
  selectedTrip,
  setSelectedTrip,
  setSelectedPlace,
  colors,
  isMobile,
  handleSearchButtonClick,
  showSearchButton,
}) => {
  const [elementRef, setElementRef] = useState([]);

  useEffect(() => {
    setElementRef((refs) =>
      Array(places?.length)
        .fill()
        .map((_, i) => refs[i] || createRef())
    );
  }, [places]);

  // console.log("ismobile?", isMobile);
  console.log("type", type);

  return (
    <>
      <Card>
        <CardContent>
          <Typography gutterBottom pt={2} pb={2} variant="h3">
            {`${type.charAt(0).toUpperCase()}${type.slice(1)} around you`}
          </Typography>

          <Box pb={2}>
            <FormControl sx={{ minWidth: 120, mr: 2, pb: 2 }}>
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
            <FormControl id="rating" sx={{ minWidth: 80, mr: 2 }}>
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

              <Box sx={{ minWidth: 120, mr: 2, pb: 2 }}>
                {isMobile && showSearchButton && (
                  <SearchButton
                    colors={colors}
                    isMobile={isMobile}
                    handleSearchButtonClick={handleSearchButtonClick}
                  />
                )}
              </Box>
            </FormControl>
          </Box>
        </CardContent>
      </Card>
      {isLoading ? (
        <Box
          justifyContent="center"
          alignItems="center"
          height="60%"
          display="flex"
        >
          {type ? (
            <>
              {type === "restaurants" && <IsLoadingRamen />}
              {type === "hotels" && <IsLoadingHotel />}
              {type === "attractions" && <IsLoadingAttraction />}
            </>
          ) : (
            <CircularProgress />
          )}
        </Box>
      ) : (
        <Box sx={{ height: "65vh", width: "100%", overflow: "auto" }}>
          <Grid container spacing={3}>
            {places?.map((place, i) => (
              <Grid key={i} item xs={12}>
                <PlaceDetails
                  selected={Number(childClicked) === i}
                  refProp={elementRef[i]}
                  place={place}
                  userTrips={userTrips}
                  showEditDialog={showEditDialog}
                  setShowEditDialog={setShowEditDialog}
                  handleTripSelection={(tripId) =>
                    handleTripSelection(tripId, place)
                  }
                  selectedTrip={selectedTrip}
                  setSelectedTrip={setSelectedTrip}
                  setSelectedPlace={setSelectedPlace}
                  colors={colors}
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
