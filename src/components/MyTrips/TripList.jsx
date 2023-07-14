import { useContext, useEffect, useState } from "react";
import TripCard from "./TripCard";
import useFetch from "../../hooks/useFetch";
import { baseURL, getAllTrips } from "../../api/trips.api";
import { AuthContext } from "../../context/auth.context";
import {
  Grid,
  Pagination,
  Box,
  Container,
  ThemeProvider,
  useMediaQuery,
  Select,
  MenuItem,
} from "@mui/material";
import { ColorModeContext, tokens } from "../../context/theme.context";
import AddNewTripCard from "./AddNewTripCard";

const TripList = () => {
  const { user } = useContext(AuthContext);

  const {
    data: trips,
    isLoading,
    error,
    reFetch,
  } = useFetch(`${baseURL}/trips?userId=${user._id}`);

  const { handleThemeChange: toggleColorMode, theme } =
    useContext(ColorModeContext);
  const colors = tokens(theme.palette.mode);

  const [currentPage, setCurrentPage] = useState(1);
  const [displayedTrips, setDisplayedTrips] = useState(null);
  const [filter, setFilter] = useState("recent"); // Default filter: most recent

  useEffect(() => {
    if (trips) {
      setDisplayedTrips(trips); // Update displayedTrips when trips are fetched
    }
  }, [trips]);

  useEffect(() => {
    // Apply filter whenever it changes
    applyFilter();
  }, [filter]);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleDelete = (deletedTripId) => {
    setDisplayedTrips((prevTrips) =>
      prevTrips.filter((trip) => trip._id !== deletedTripId)
    );
  };

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const applyFilter = () => {
    if (trips && filter === "recent") {
      // Sort trips by most recent created
      const sortedTrips = [...trips].sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      console.log(sortedTrips);
      setDisplayedTrips(sortedTrips);
    } else if (trips && filter === "chronological") {
      // Sort trips by chronological date
      const sortedTrips = [...trips].sort((a, b) => {
        return new Date(a.startDate) - new Date(b.startDate);
      });
      console.log(sortedTrips);
      setDisplayedTrips(sortedTrips);
    }
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  if (isLoading || displayedTrips === null) {
    // Show loading state while fetching data or if displayedTrips is null
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const itemsPerRow = isMobile ? 2 : 4; // Display 2 trips per row on mobile, 4 trips per row on larger screens
  const itemsPerPage = itemsPerRow; // Display itemsPerRow * 2 trips per page
  const totalPages = Math.ceil(displayedTrips.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const tripsToDisplay = displayedTrips.slice(startIndex, endIndex);

  return (
    <Box
      p={10}
      sx={{
        backgroundColor: theme.palette.background.default,
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container maxWidth="lg" spacing={4}>
        <Box sx={{ mb: 4 }}>
          <Select value={filter} onChange={handleFilterChange}>
            <MenuItem value="recent">Most Recent</MenuItem>
            <MenuItem value="chronological">Chronological</MenuItem>
          </Select>
        </Box>
        <Grid container spacing={2} justifyContent="center">
          {tripsToDisplay.map((trip) => (
            <Grid item key={trip._id} xs={6} sm={6} md={3}>
              <TripCard trip={trip} handleDelete={handleDelete} />
            </Grid>
          ))}
          <Grid item xs={6} sm={6} md={3}>
            <AddNewTripCard />
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="center" mt={2}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handleChangePage}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default TripList;
