import React, { useContext, useEffect, useState } from "react";
import { Grid, useMediaQuery, Button } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

import Map from "../../components/Map/Map";
import { getPlacesData } from "../../api/places.api";
import { getAllTrips } from "../../api/trips.api";
import PlacesList from "../../components/PlaceDetails/PlacesList";
import SearchHeader from "./SearchHeader";
import { AuthContext } from "../../context/auth.context";

const Explore = () => {
  const { user } = useContext(AuthContext);

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

  useEffect(() => {
    getAllTrips(user._id)
      .then((response) => {
        setUserTrips(response.data);
      })
      .catch((error) => {
        console.log("Error fetching user trips:", error);
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
    setShowSearchButton(true); // Set the visibility of the search button when bounds or type change
  }, [bounds, type, rating]);

  const handleSearchButtonClick = () => {
    setIsLoading(true);
    getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
      setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
      setFilteredPlaces([]);
      setIsLoading(false);
      setShowSearchButton(false); // Hide the search button after clicking it
    });
  };

  return (
    <>
      <Grid>
        <CssBaseline />
        <SearchHeader setCoordinates={setCoordinates} />
        <Grid container spacing={3} style={{ width: " 100%" }}>
          <Grid item xs={12} md={4}>
            <PlacesList
              places={filteredPlaces.length ? filteredPlaces : places}
              childClicked={childClicked}
              isLoading={isLoading}
              type={type}
              setType={setType}
              rating={rating}
              setRating={setRating}
              userTrips={userTrips}
            />
          </Grid>

          <Grid item xs={12} md={8}>
            {showSearchButton && (
              <Button variant="contained" onClick={handleSearchButtonClick}>
                Search this area
              </Button>
            )}
            <Map
              setCoordinates={setCoordinates}
              setBounds={setBounds}
              coordinates={coordinates}
              places={filteredPlaces.length ? filteredPlaces : places}
              setChildClicked={setChildClicked}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Explore;
