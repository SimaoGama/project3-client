import axios from "axios";

export const baseURL = `${import.meta.env.VITE_PROJECT_API}/api`;

const setAuthorizationHeaders = () => {
  //set JWT token in the headers for every request in this file

  axios.interceptors.request.use((config) => {
    if (!config.url.startsWith(baseURL)) {
      return config;
    }
    //retrieve the JWT from the local storage
    const storedToken = localStorage.getItem("authToken");

    if (storedToken) {
      config.headers = { Authorization: `Bearer ${storedToken}` };
    }
    return config;
  });
};

setAuthorizationHeaders();

export const getAllTrips = (userId) => {
  return axios.get(`${baseURL}/trips?userId=${userId}`);
};

export const getTrip = (tripId) => {
  return axios.get(`${baseURL}/trip/${tripId}`);
};

export const getTripPopulated = (tripId) => {
  return axios.get(`${baseURL}/trip/${tripId}/populated`);
};

export const addTrip = (newTrip, userId) => {
  const tripData = {
    ...newTrip,
    userId,
  };

  return axios.post(`${baseURL}/trips/new`, tripData);
};

export const updateTrip = (updatedTrip, tripId) => {
  return axios.put(`${baseURL}/trip/${tripId}`, updatedTrip); // Use the correct API route with the tripId in the URL
};

export const deleteTrip = (id) => {
  return axios.delete(`${baseURL}/trips/${id}`);
};

export const upload = (uploadData) => {
  return axios.post(`${baseURL}/upload`, uploadData);
};

//handle days

export const getDayInformation = (dayId) => {
  return axios.get(`${baseURL}/day/${dayId}`);
};

export const updateDay = (dayId, selectedPlace) => {
  return axios.put(`${baseURL}/${dayId}`, { selectedPlace });
};

export const getRestaurant = (restaurantId) => {
  return axios.get(`${baseURL}/restaurant/${restaurantId}`);
};

export const getPlan = (planId) => {
  return axios.get(`${baseURL}/plan/${planId}`);
};

export const getAccommodation = async (accommodationId) => {
  try {
    return await axios.get(`${baseURL}/accommodation/${accommodationId}`);
  } catch (error) {
    console.error("Error fetching accommodation data:", error);
    throw error; // Rethrow the error to handle it in the component
  }
};

export const deleteRestaurant = async (restaurantId) => {
  try {
    const response = await axios.delete(
      `${baseURL}/restaurant/${restaurantId}`
    );
    console.log(response.data.message); // You can display this message to the user or use it for any other purpose

    // Return the deleted restaurant ID or any other relevant data from the response if needed
    return response.data;
  } catch (error) {
    console.error("Error deleting restaurant:", error);
    throw error; // Rethrow the error to be caught and handled in the component
  }
};
export const deletePlan = async (planId) => {
  try {
    const response = await axios.delete(`${baseURL}/plan/${planId}`);
    console.log(response.data.message); // You can display this message to the user or use it for any other purpose

    // Return the deleted restaurant ID or any other relevant data from the response if needed
    return response.data;
  } catch (error) {
    console.error("Error deleting plan:", error);
    throw error; // Rethrow the error to be caught and handled in the component
  }
};

export const deleteAccommodation = async (accommodationId) => {
  try {
    const response = await axios.delete(
      `${baseURL}/accommodation/${accommodationId}`
    );

    console.log(response.data.message);
    // Return the deleted accommodation ID or any other relevant data from the response if needed
    return response.data.deletedAccommodationId;
  } catch (error) {
    console.error("Error deleting accommodation:", error);
    throw error; // Rethrow the error to be caught and handled in the component
  }
};
