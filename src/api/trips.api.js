import axios from 'axios';

export const baseURL = `${import.meta.env.VITE_PROJECT_API}/api`;

const setAuthorizationHeaders = () => {
  //set JWT token in the headers for every request in this file

  axios.interceptors.request.use(config => {
    if (!config.url.startsWith(baseURL)) {
      return config;
    }
    //retrieve the JWT from the local storage
    const storedToken = localStorage.getItem('authToken');

    if (storedToken) {
      config.headers = { Authorization: `Bearer ${storedToken}` };
    }
    return config;
  });
};

setAuthorizationHeaders();

export const getAllTrips = userId => {
  return axios.get(`${baseURL}/trips?userId=${userId}`);
};

export const getTrip = tripId => {
  return axios.get(`${baseURL}/trip/${tripId}`);
};

export const addTrip = (newTrip, userId) => {
  const tripData = {
    ...newTrip,
    userId
  };

  return axios.post(`${baseURL}/trips/new`, tripData);
};

export const updateTrip = (updatedTrip, tripId) => {
  return axios.put(`${baseURL}/trip/${tripId}`, updatedTrip); // Use the correct API route with the tripId in the URL
};

export const deleteTrip = id => {
  return axios.delete(`${baseURL}/trips/${id}`);
};

export const upload = uploadData => {
  return axios.post(`${baseURL}/upload`, uploadData);
};

//handle days

export const getDayInformation = dayId => {
  return axios.get(`${baseURL}/day/${dayId}`);
};

export const updateDay = (dayId, selectedPlace) => {
  return axios.put(`${baseURL}/${dayId}`, { selectedPlace });
};

export const getRestaurant = restaurantId => {
  return axios.get(`${baseURL}/restaurant/${restaurantId}`);
};

export const getAccommodation = async accommodationId => {
  try {
    return await axios.get(`${baseURL}/accommodation/${accommodationId}`);
  } catch (error) {
    console.error('Error fetching accommodation data:', error);
    throw error; // Rethrow the error to handle it in the component
  }
};

export const deletedRestaurant = id => {
  return axios.delete(`${baseURL}/restaurant/${id}`);
};

export const deletedAccommodation = id => {
  return axios.delete(`${baseURL}/accommodation/${id}`);
};
