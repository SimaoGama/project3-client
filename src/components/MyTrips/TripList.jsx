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
  Input,
  TextField,
  InputAdornment,
} from "@mui/material";
import { ColorModeContext, tokens } from "../../context/theme.context";
import AddNewTripCard from "./AddNewTripCard";
import CardItem from "../../pages/Home/CardItem";
import "./TripList.css";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import IsLoadingDefault from "../Loading/isLoadingDefault";

const TripList = () => {
  const { handleThemeChange: toggleColorMode, theme } =
    useContext(ColorModeContext);
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const { user } = useContext(AuthContext);

  const {
    data: trips,
    isLoading,
    error,
    reFetch,
  } = useFetch(`${baseURL}/trips?userId=${user._id}`);

  const [currentPage, setCurrentPage] = useState(1);
  const [displayedTrips, setDisplayedTrips] = useState(null);
  const [filter, setFilter] = useState("recent"); // Default filter: most recent

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTrips, setFilteredTrips] = useState(null);

  useEffect(() => {
    if (trips) {
      const filtered = trips.filter((trip) =>
        trip.destination.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTrips(filtered);
    }
  }, [searchQuery, trips]);

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
    // Remove the trip from displayedTrips if it exists there
    setDisplayedTrips((prevTrips) =>
      prevTrips.filter((trip) => trip._id !== deletedTripId)
    );

    // Remove the trip from filteredTrips if it exists there
    setFilteredTrips((prevTrips) =>
      prevTrips ? prevTrips.filter((trip) => trip._id !== deletedTripId) : null
    );

    reFetch();
  };

  const applyFilter = () => {
    if (filteredTrips && filter === "recent") {
      // Sort filteredTrips by most recent created
      const sortedTrips = [...filteredTrips].sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      setFilteredTrips(sortedTrips);
    } else if (filteredTrips && filter === "chronological") {
      // Sort filteredTrips by chronological date
      const sortedTrips = [...filteredTrips].sort((a, b) => {
        return new Date(a.startDate) - new Date(b.startDate);
      });
      setFilteredTrips(sortedTrips);
    }
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  if (isLoading || displayedTrips === null) {
    // Show loading state while fetching data or if displayedTrips is null
    return <IsLoadingDefault />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const itemsPerRow = isMobile ? 1 : 3;
  const itemsPerPage = itemsPerRow;
  const totalPages = Math.ceil(filteredTrips.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const tripsToDisplay = filteredTrips.slice(startIndex, endIndex);

  return (
    <Box
      p={10}
      gridTemplateColumns={isMobile ? "1fr" : "repeat(12, 1fr)"}
      sx={{
        backgroundColor: theme.palette.background.default,
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        overflowY: isMobile ? "auto" : "visible",
      }}
    >
      <Container maxWidth="lg" spacing={4}>
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row", // Set flexDirection to "column" for mobile
            alignItems: "center", // Align items in the center along the vertical axis
            justifyContent: "flex-start", // Distribute items evenly along the horizontal axis
            mb: 4, // Add margin-bottom to the container
          }}
        >
          <Box
            mr={isMobile ? 0 : 2} // Add margin-right for spacing on mobile
            mb={isMobile ? 2 : 0} // Add margin-bottom for spacing on mobile
          >
            <Select value={filter} onChange={handleFilterChange}>
              <MenuItem value="recent">Most Recent</MenuItem>
              <MenuItem value="chronological">Chronological</MenuItem>
            </Select>
          </Box>
          <Box>
            <TextField
              id="filled-basic"
              label="Find a trip"
              variant="outlined"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Name of your trip ..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>

        <Grid container spacing={2} justifyContent="center">
          {/* Step 3: Display the filtered trips */}
          {tripsToDisplay?.map((trip) => (
            <Grid item key={trip._id} xs={12} sm={6} md={4}>
              <TripCard trip={trip} handleDelete={handleDelete} />
            </Grid>
          ))}
          {/* Step 3: Display the filtered trips */}
          {tripsToDisplay?.length === 0 && (
            <Box textAlign="center" width="100%">
              No trips found.
            </Box>
          )}
          <Grid item xs={12} sm={6} md={4}>
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
