import axios from "axios";
const baseURL = `${import.meta.env.VITE_PROJECT_API}/auth`;

export const signup = (user) => {
  return axios.post(`${baseURL}/signup`, user);
};

export const login = (user) => {
  return axios.post(`${baseURL}/login`, user);
};

// export const fetchUser = async (userId) => {
//   try {
//     const response = await axios.get(`${baseURL}/user/${userId}`);
//     const user = response.data;
//     // Do something with the user data
//   } catch (error) {
//     console.log("An error occurred while fetching the user", error);
//   }
// };

//We need to add the JWT to the authorization
//headers of the verify request
export const verify = (storedToken) => {
  return axios.get(`${baseURL}/verify`, {
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  });
};
