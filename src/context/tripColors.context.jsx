import { createContext, useState, useEffect } from "react";

const TripColorsContext = createContext();

const TripColorsProvider = ({ children }) => {
  const [tripColors, setTripColors] = useState({});

  useEffect(() => {
    // Load trip colors from localStorage when the component mounts
    const savedTripColors = localStorage.getItem("tripColors");
    if (savedTripColors) {
      setTripColors(JSON.parse(savedTripColors));
    }
  }, []);

  useEffect(() => {
    // Save trip colors to localStorage when tripColors state changes
    localStorage.setItem("tripColors", JSON.stringify(tripColors));
  }, [tripColors]);

  return (
    <TripColorsContext.Provider value={{ tripColors, setTripColors }}>
      {children}
    </TripColorsContext.Provider>
  );
};

export { TripColorsContext, TripColorsProvider };
