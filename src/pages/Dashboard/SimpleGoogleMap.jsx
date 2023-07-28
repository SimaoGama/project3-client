import React from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const SimpleGoogleMap = ({ lat, lng }) => {
  const center = {
    lat: lat ? lat : 38.736946,
    lng: lng ? lng : -9.142685,
  };

  const zoom = lat && lng ? 20 : 12; // Set zoom to 20 if both lat and lng are provided, otherwise set it to 12

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={zoom}>
      {lat && lng && <Marker position={center} />}
    </GoogleMap>
  );
};

export default SimpleGoogleMap;
