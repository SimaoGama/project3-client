import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

export const baseURL = `${import.meta.env.VITE_PROJECT_API}/api`;

const setAuthorizationHeaders = () => {
  //set JWT token in the headers for every request in this file

  axios.interceptors.request.use((config) => {
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

export const getTrip = (id) => {
  return axios.get(`${baseURL}/trips/${id}`);
};

export const addTrip = (newTrip, userId) => {
  const tripData = {
    ...newTrip,
    userId,
  };

  return axios.post(`${baseURL}/trips/new`, tripData);
};

export const updateTrip = (updatedTrip) => {
  return axios.put(`${baseURL}/trips/${updatedTrip._id}`, updatedTrip);
};

export const deleteTrip = (id) => {
  return axios.delete(`${baseURL}/trips/${id}`);
};

export const upload = (uploadData) => {
  return axios.post(`${baseURL}/upload`, uploadData);
};
