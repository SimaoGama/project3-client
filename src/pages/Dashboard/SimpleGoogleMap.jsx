import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 38.736946,
  lng: -9.142685,
};

const SimpleGoogleMap = () => {
  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
      {/* Add any additional map components, markers, etc. here */}
    </GoogleMap>
  );
};

export default SimpleGoogleMap;
