import { Box, Typography, Grid, useTheme, useMediaQuery } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTripPopulated } from "../../api/trips.api";
import CardItem from "../Home/CardItem";
import { useContext } from "react";
import { tokens } from "../../data/theme";
import StatBox from "../Dashboard/StatBox";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";

const TripView = () => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const response = await getTripPopulated(tripId);
        const tripData = response.data;
        console.log("tripdata:", tripData);

        setTrip(tripData);
        console.log("start", tripData.startDate);
        console.log("end", tripData.endDate);
      } catch (error) {
        console.log("Error fetching trip:", error);
      }
    };

    fetchTrip();
  }, [tripId]);

  console.log("Days", trip?.days);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().substring(0, 10);
  };

  console.log("trip view info:", trip?.days);

  const navigateToDay = (day) => {
    console.log("DAYID", day._id);
    navigate(`/day/${day?._id}`, { state: { dayInfo: day } });
  };

  return (
    <Box>
      {trip ? (
        <>
          <Box textAlign="center" mt={3} mb={4}>
            <Typography variant="h1">{trip.destination}</Typography>
            <Typography variant="subtitle1">
              From: {formatDate(trip.startDate)} to {formatDate(trip.endDate)}
            </Typography>
          </Box>
          {/* Display other trip details here */}
          <Grid container spacing={2} justifyContent="center">
            {trip?.days?.map((day) => (
              <Grid item xs={12} sm={6} md={4} key={day._id}>
                <Box
                  gridColumn={isMobile ? "1" : "span 4"} // Use 1 column for mobile and 4 columns for larger screens
                  backgroundColor={colors.primary[400]}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",
                    "&:hover": {
                      backgroundColor: `${colors.greenAccent[500]}`,
                    },
                  }}
                  onClick={() => navigate(`/day/${day._id}`)}
                >
                  <StatBox
                    title={`${day?.destination || "City"}`}
                    subtitle={`${formatDate(day.date)}`}
                    progress={""}
                    increase={""}
                    icon={
                      <VerifiedOutlinedIcon
                        sx={{
                          fontSize: "32px",
                          color: colors.primary[500],
                        }}
                      />
                    }
                  />
                </Box>
              </Grid>
            ))}
          </Grid>

          {/* <TripTextCard trip={trip} /> */}
        </>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Box>
  );
};

export default TripView;
