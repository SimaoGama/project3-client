import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Rating from "@mui/material/Rating";
import { styled } from "@mui/system";
import mapStyles from "./mapStyles";
import IsLoadingDefault from "../Loading/isLoadingDefault";

const MapContainer = styled("div")({
  height: "85vh",
  width: "100%",
});

const MarkerContainer = styled("div")(({ theme }) => ({
  position: "absolute",
  transform: "translate(-50%, -50%)",
  zIndex: 1,
  "&:hover": { zIndex: 2 },
}));

const PaperContainer = styled(Paper)({
  padding: "10px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  width: "100px",
});

const Img = styled("img")({
  width: "100%",
  height: "auto",
  objectFit: "cover",
});

const Map = ({
  setCoordinates,
  setBounds,
  coordinates,
  places,
  setChildClicked,
}) => {
  const isDesktop = useMediaQuery("(min-width:600px)");
  const [isLoading, setIsLoading] = useState(true);

  const handleMapLoad = () => {
    // This function is called when the map is loaded
    setIsLoading(false);
  };

  return (
    <div style={{ height: "82vh", width: "100%" }}>
      {isLoading && (
        // Show loading indicator while the map is loading
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <IsLoadingDefault />
        </div>
      )}
      <GoogleMapReact
        bootstrapURLKeys={{ key: import.meta.env.VITE_GOOGLE_MAPS_API }}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          styles: mapStyles,
          gestureHandling: "greedy",
        }}
        onChange={(e) => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => {
          setChildClicked(child);
        }}
        onGoogleApiLoaded={handleMapLoad} // Call handleMapLoad when the map is loaded
      >
        {places?.map((place, i) => (
          <MarkerContainer
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}
          >
            {!isDesktop ? (
              <LocationOnOutlinedIcon color="primary" fontSize="large" />
            ) : (
              <PaperContainer elevation={3}>
                <Typography variant="subtitle2" gutterBottom>
                  {place.name}
                </Typography>
                <Img
                  src={
                    place.photo
                      ? place.photo.images.large.url
                      : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
                  }
                  alt={place.name}
                />
                <Rating size="small" value={Number(place.rating)} readOnly />
              </PaperContainer>
            )}
          </MarkerContainer>
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
