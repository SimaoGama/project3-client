import { useTheme } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { tokens } from "../../data/theme";
import { Box, useMediaQuery } from "@mui/material";
import StatBox from "../Dashboard/StatBox";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import SettingsSuggestRoundedIcon from "@mui/icons-material/SettingsSuggestRounded";
import FlightTakeoffRoundedIcon from "@mui/icons-material/FlightTakeoffRounded";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { baseURL, getDayInformation } from "../../api/trips.api";
import { useLocation } from "react-router-dom";
import SimpleCalendar from "../Dashboard/SimpleCalendar";
import SimpleGoogleMap from "../Dashboard/SimpleGoogleMap";
import DayInfoDialog from "./DayInfoDialog";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HotelOutlinedIcon from "@mui/icons-material/HotelOutlined";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import AttractionsOutlinedIcon from "@mui/icons-material/AttractionsOutlined";

const DayView = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const [showRestaurants, setShowRestaurants] = useState(false);
  const [showAccommodation, setShowAccommodation] = useState(false);
  const [showPlans, setShowPlans] = useState(false);
  const [accommodation, setAccommodation] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [plans, setPlans] = useState([]);

  const navigate = useNavigate();

  const { dayId } = useParams();

  const {
    data: dayData,
    reFetch,
    isLoading,
    error,
  } = useFetch(`${baseURL}/day/${dayId}`);

  useEffect(() => {
    // Check if dayData exists and update state variables
    if (dayData) {
      setAccommodation(dayData.accommodation);
      setRestaurants(dayData.restaurants);
      setPlans(dayData.plans);
    }
  }, [dayData]);

  const formatDate = (dateString) => {
    if (!dateString || !Date.parse(dateString)) {
      // Return an empty string or a placeholder text for invalid date
      return "Date not available";
    }

    const date = new Date(dateString);
    return date.toISOString().substring(0, 10);
  };

  const handleCloseAccommodation = () => {
    setShowAccommodation(false);
  };

  const handleCloseRestaurants = () => {
    setShowRestaurants(false);
  };

  const handleClosePlans = () => {
    setShowPlans(false);
  };

  return (
    <Box
      p={isMobile ? 2 : 0}
      pl={isMobile ? 0 : 5}
      pr={isMobile ? 0 : 5}
      // pl={isMobile ? 2 : 5}
      sx={{
        backgroundColor: theme.palette.background.default,
        // height: "90vh",
        overflowY: isMobile ? "auto" : "visible",
      }}
    >
      <Box
        display="grid"
        gridTemplateColumns={isMobile ? "1fr" : "repeat(4, 1fr)"} // Use 1 column for mobile and 12 columns for larger screens
        gridAutoRows="130px"
        gap="20px"
      >
        <Box
          gridColumn={isMobile ? "1" : "span 4"} // Use 1 column for mobile and 4 columns for larger screens
          backgroundColor={colors.greenAccent[500]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="Day"
            subtitle={formatDate(dayData?.date)}
            progress={""}
            increase={""}
            icon={
              <CalendarTodayOutlinedIcon
                sx={{
                  fontSize: "32px",
                  color: colors.primary[500],
                }}
              />
            }
          />
        </Box>

        <Box
          gridColumn={isMobile ? "1" : "span 4"}
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
          onClick={() => setShowAccommodation(true)} // Set showAccommodation to true on click
        >
          <StatBox
            title="My"
            subtitle="Accommodation for tonight"
            increase={""}
            icon={
              <HotelOutlinedIcon
                sx={{
                  cursor: "pointer",
                  color: colors.primary[500], // Set the icon color to primary
                  fontSize: "32px",
                }}
              />
            }
          />
        </Box>
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
          onClick={() => setShowRestaurants(true)}
        >
          <StatBox
            title="My"
            subtitle="Restaurants for the day"
            icon={
              <RestaurantOutlinedIcon
                sx={{
                  cursor: "pointer",
                  color: colors.primary[500], // Set the icon color to primary
                  fontSize: "32px",
                }}
              />
            }
          />
        </Box>
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
          onClick={() => setShowPlans(true)}
        >
          <StatBox
            title="My"
            subtitle="Activities for the day"
            icon={
              <AttractionsOutlinedIcon
                sx={{
                  cursor: "pointer",
                  color: colors.primary[500], // Set the icon color to primary
                  fontSize: "32px",
                }}
              />
            }
          />
        </Box>
        <Box
          gridColumn={isMobile ? "1" : "span 4"}
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <SimpleGoogleMap />
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          ></Box>
        </Box>
      </Box>
      {showAccommodation && (
        <DayInfoDialog
          isOpen={showAccommodation}
          handleClose={handleCloseAccommodation}
          colors={colors}
          selectedPlace={accommodation}
        />
      )}
      {showRestaurants && (
        <DayInfoDialog
          isOpen={showRestaurants}
          handleClose={handleCloseRestaurants}
          colors={colors}
          selectedPlace={restaurants}
        />
      )}
      {showPlans && (
        <DayInfoDialog
          isOpen={showPlans}
          handleClose={handleClosePlans}
          colors={colors}
          selectedPlace={plans}
        />
      )}
    </Box>
  );
};

export default DayView;
