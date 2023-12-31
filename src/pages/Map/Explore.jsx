import React, { useContext, useEffect, useState } from "react";
import { Grid, useMediaQuery, Button, Box, useTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

import Map from "../../components/Map/Map";
import { getPlacesData } from "../../api/places.api";
import { getAllTrips } from "../../api/trips.api";
import PlacesList from "../../components/PlaceDetails/PlacesList";
import SearchHeader from "./SearchHeader";
import { AuthContext } from "../../context/auth.context";
import EditDay from "../../components/EditDay/EditDay";
import { colorModeContext, tokens } from "../../data/theme";
import SearchButton from "./SearchButton";

const Explore = () => {
  const { user } = useContext(AuthContext);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState(3);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const isNotMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showSearchButton, setShowSearchButton] = useState(false); // State to control the visibility of the search button
  const [userTrips, setUserTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState({});

  const [isLoadingUserTrips, setIsLoadingUserTrips] = useState(true);

  useEffect(() => {
    getAllTrips(user._id)
      .then((response) => {
        setUserTrips(response.data);
        setIsLoadingUserTrips(false); // Set loading state to false after fetching user trips
      })
      .catch((error) => {
        console.log("Error fetching user trips:", error);
        setIsLoadingUserTrips(false); // Set loading state to false in case of an error
      });
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    if (places) {
      const filteredPlaces = places.filter((place) => place.rating > rating);

      setFilteredPlaces(filteredPlaces);
    }
  }, [rating]);

  useEffect(() => {
    setShowSearchButton(true);
  }, [bounds, type, rating]);

  const handleSearchButtonClick = () => {
    setIsLoading(true);
    getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
      setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
      setFilteredPlaces([]);
      setIsLoading(false);
      setShowSearchButton(false);
    });
  };

  // Function to handle the trip selection
  const handleTripSelection = (eventOrTripId, place) => {
    if (place) {
      setSelectedTrip({ tripId: eventOrTripId, place });
    } else {
      setSelectedTrip({ tripId: eventOrTripId.target.value });
    }
    setSelectedPlace(place);
    setShowEditDialog(true);
  };

  // console.log("ismobile?", isMobile);

  return (
    <>
      <Box
        p={isMobile ? 2 : 2}
        // pl={isMobile ? 2 : 5}
        sx={{
          backgroundColor: theme.palette.background.default,
          height: "90vh",
          overflowY: isMobile ? "auto" : "visible",
        }}
      >
        <Grid container spacing={isMobile ? 1 : 2}>
          <Grid item xs={12} md={4}>
            {/* SearchHeader */}
            <SearchHeader setCoordinates={setCoordinates} />

            {/* PlacesList */}

            <PlacesList
              places={filteredPlaces.length ? filteredPlaces : places}
              childClicked={childClicked}
              isLoading={isLoading}
              type={type}
              setType={setType}
              rating={rating}
              setRating={setRating}
              userTrips={userTrips}
              showEditDialog={showEditDialog}
              setShowEditDialog={setShowEditDialog}
              handleTripSelection={handleTripSelection}
              selectedTrip={selectedTrip}
              setSelectedTrip={setSelectedTrip}
              setSelectedPlace={setSelectedPlace}
              colors={colors}
              isMobile={isMobile}
              handleSearchButtonClick={handleSearchButtonClick}
              showSearchButton={showSearchButton}
            />
          </Grid>

          <Grid item xs={12} md={8}>
            {!isMobile && showSearchButton && (
              <SearchButton
                colors={colors}
                isMobile={isMobile}
                handleSearchButtonClick={handleSearchButtonClick}
              />
            )}

            {/* Map */}
            <Map
              setCoordinates={setCoordinates}
              setBounds={setBounds}
              coordinates={coordinates}
              places={filteredPlaces.length ? filteredPlaces : places}
              setChildClicked={setChildClicked}
            />
          </Grid>
        </Grid>

        {/* EditDay Dialog */}
        {showEditDialog && (
          <EditDay
            selectedTrip={selectedTrip}
            selectedPlace={selectedPlace}
            setShowEditDialog={setShowEditDialog}
            setCoordinates={setCoordinates}
          />
        )}
      </Box>
    </>
  );
};

export default Explore;
