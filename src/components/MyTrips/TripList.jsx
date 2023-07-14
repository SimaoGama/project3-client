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
} from "@mui/material";
import { ColorModeContext, tokens } from "../../context/theme.context";

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

  const { handleThemeChange: toggleColorMode, theme } =
    useContext(ColorModeContext);
  const colors = tokens(theme.palette.mode);

  const [currentPage, setCurrentPage] = useState(1);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const itemsPerRow = isMobile ? 2 : 4; // Display 2 trips per row on mobile, 4 trips per row on larger screens
  const itemsPerPage = itemsPerRow; // Display itemsPerRow * 2 trips per page
  const totalPages = Math.ceil(trips.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedTrips = trips.slice(startIndex, endIndex);

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
        <Grid container spacing={2} justifyContent="center">
          {displayedTrips.map((trip) => (
            <Grid item key={trip._id} xs={6} sm={6} md={3}>
              <TripCard trip={trip} />
            </Grid>
          ))}
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
