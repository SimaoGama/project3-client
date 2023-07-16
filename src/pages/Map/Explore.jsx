import React from "react";
import { useEffect, useState } from "react";

import Map from "../../components/Map/Map";
import { Grid, useMediaQuery } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

import { getPlacesData } from "../../api/places.api";
import PlacesList from "../../components/PlaceDetails/PlacesList";
import SearchHeader from "./SearchHeader";

const Explore = () => {
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("");
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const isNotMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    if (bounds.sw && bounds.ne) {
      setIsLoading(true);
      getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
        setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
        setFilteredPlaces([]);
        setIsLoading(false);
      });
    }
  }, [bounds]);

  useEffect(() => {
    if (places) {
      const filteredPlaces = places.filter((place) => place.rating > rating);

      setFilteredPlaces(filteredPlaces);
    }
  }, [rating, places]);

  return (
    <>
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
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filteredPlaces.length ? filteredPlaces : places}
            setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Explore;
