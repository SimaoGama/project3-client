import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import { Navigate } from 'react-router-dom';

const IsPrivate = props => {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  //if the authentication i still ongoing
  if (isLoading) return <p>Loading...</p>;

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  } else {
    return props.children;
  }
};

export default IsPrivate;
