import { useContext, useEffect } from "react";
import TripCard from "./TripCard";
import useFetch from "../../hooks/useFetch";
import { baseURL, getAllTrips } from "../../api/trips.api";
import { AuthContext } from "../../context/auth.context";

const TripList = () => {
  const { user } = useContext(AuthContext);
  console.log(user._id);
  const {
    data: trips,
    isLoading,
    error,
    reFetch,
  } = useFetch(`${baseURL}/trips?userId=${user._id}`);

  console.log(trips);

  // useEffect(() => {
  //   reFetch();
  // }, [reFetch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {trips?.map((trip) => (
        <TripCard key={trip._id} trip={trip} />
      ))}
    </div>
  );
};

export default TripList;
