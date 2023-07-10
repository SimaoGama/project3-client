import axios from 'axios';
export const baseURL = `${import.meta.env.VITE_PROJECT_API}/api`;

const setAuthorizationHeaders = () => {
  //set JWT token in the headers for every request in this file

  axios.interceptors.request.use(config => {
    //retrieve the JWT from the local storage
    const storedToken = localStorage.getItem('authToken');

    if (storedToken) {
      config.headers = { Authorization: `Bearer ${storedToken}` };
    }
    return config;
  });
};

setAuthorizationHeaders();

export const getAllTrips = () => {
  return axios.get(`${baseURL}/trips`);
};

export const getTrip = id => {
  return axios.get(`${baseURL}/projects/${id}`);
};

export const addTrip = newTrip => {
  return axios.post(`${baseURL}/trips`, newTrip);
};

export const updateTrip = updatedTrip => {
  return axios.put(`${baseURL}/trips/${updatedTrip._id}`, updatedTrip);
};

export const deleteTrip = id => {
  return axios.delete(`${baseURL}/trips/${id}`);
};

export const addTask = task => {
  return axios.post(`${baseURL}/tasks`, task);
};

export const upload = uploadData => {
  return axios.post(`${baseURL}/upload`, uploadData);
};
