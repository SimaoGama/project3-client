import { createContext, useEffect, useState } from 'react';
import { verify } from '../api/auth.api';
const AuthContext = createContext();

const AuthProviderWrapper = props => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const storeToken = token => {
    localStorage.setItem('authToken', token);
  };

  const authenticateUser = async () => {
    //get token from local storage
    const storedToken = localStorage.getItem('authToken');

    if (storedToken) {
      try {
        const response = await verify(storedToken);
        const user = response.data;
        setUser(user);
        setIsLoggedIn(true);
      } catch (error) {
        console.log('An error ocurred authenticating the user', error);

        //if token is invalid, the server response is an error
        setUser(null);
        setIsLoggedIn(false);
      }
    } else {
      //if token does not exist
      setUser();
      setIsLoggedIn(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  const removeToken = () => {
    //delete the token from local storage
    localStorage.removeItem('authToken');
  };

  const logOutUser = () => {
    //to log out user, remove token
    removeToken();
    //update state variable
    authenticateUser();
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isLoggedIn,
        user,
        storeToken,
        authenticateUser,
        logOutUser
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProviderWrapper };
