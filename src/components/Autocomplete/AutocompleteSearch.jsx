import React, { useState } from "react";
import { Autocomplete } from "@react-google-maps/api";

const AutocompleteSearch = ({ setCoordinates }) => {
  const [autocomplete, setAutocomplete] = useState(null);

  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    const place = autocomplete.getPlace();
    console.log("PLACE", place);
    if (place && place.geometry) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setCoordinates({ lat, lng });
    }
  };

  return (
    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
      <input type="text" placeholder="Search..." />
    </Autocomplete>
  );
};

export default AutocompleteSearch;
