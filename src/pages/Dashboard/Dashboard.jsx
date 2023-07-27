import React, { useContext } from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { ColorModeContext } from "../../context/theme.context";
import { tokens } from "../../data/theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import SettingsSuggestRoundedIcon from "@mui/icons-material/SettingsSuggestRounded";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import StatBox from "./StatBox";
import Calendar from "../Calendar/Calendar";
import { AuthContext } from "../../context/auth.context";
import Map from "../../components/Map/Map";
import SimpleGoogleMap from "./SimpleGoogleMap";
import SimpleCalendar from "./SimpleCalendar";
import useFetch from "../../hooks/useFetch";
import { baseURL } from "../../api/trips.api";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { handleThemeChange: toggleColorMode, theme } =
    useContext(ColorModeContext);
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const {
    data: userTrips,
    isLoading,
    error,
    reFetch,
  } = useFetch(`${baseURL}/trips?userId=${user?._id}`);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        {/* <Header title="DASHBOARD" subtitle="Welcome to your dashboard" /> */}

        <Box pb={2}>
          <Button
            sx={{
              backgroundColor: colors.greenAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={() => navigate("/trips/new")}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Create a new trip
          </Button>
        </Box>
      </Box>

      {/* GRID & USER SETTINGS */}

      <Box
        display="grid"
        gridTemplateColumns={isMobile ? "1fr" : "repeat(12, 1fr)"} // Use 1 column for mobile and 12 columns for larger screens
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn={isMobile ? "1" : "span 4"} // Use 1 column for mobile and 4 columns for larger screens
          backgroundColor={colors.greenAccent[500]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="Hello"
            subtitle={`${user?.firstName} ${user?.lastName}`}
            // progress="0.75"
            increase={`${userTrips?.length} trips created!`}
            icon={
              <EmailIcon
                sx={{ color: colors.primary[500], fontSize: "32px" }}
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
          onClick={() => navigate("/user")}
        >
          <StatBox
            title="Edit"
            subtitle="Your account"
            // progress="0.30"
            increase={`${user?.email}`}
            icon={
              <AccountCircleRoundedIcon
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
          onClick={() => navigate("/settings")}
        >
          <StatBox
            title="Change"
            subtitle="Settings"
            progress="0.80"
            // increase="+43%"
            icon={
              <SettingsSuggestRoundedIcon
                sx={{
                  cursor: "pointer",
                  color: colors.primary[500], // Set the icon color to primary
                  fontSize: "32px",
                }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn={isMobile ? "1" : "span 8"}
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
        <Box
          gridColumn={isMobile ? "1" : "span 4"}
          gridRow="span 4"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="10px"
            sx={{
              cursor: "pointer",
              transition: "background-color 0.3s ease",
              "&:hover": {
                backgroundColor: `${colors.greenAccent[500]}`,
              },
            }}
          >
            <Typography
              onClick={() => navigate("/calendar")}
              color={colors.grey[100]}
              variant="h3"
              fontWeight="600"
            >
              Upcoming Trips | Calendar
            </Typography>
          </Box>
          <SimpleCalendar />
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn={isMobile ? "1" : "span 4"}
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h4" fontWeight="600">
            Calendar
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            {/* <ProgressCircle size="125" /> */}
          </Box>
        </Box>
        <Box
          gridColumn={isMobile ? "1" : "span 4"}
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            onClick={() => navigate("/trips")}
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            p="30px"
            sx={{
              cursor: "pointer",
              ":hover": {
                textDecoration: "underline",
                color: `${colors.greenAccent[400]}`,
              },
            }}
          >
            <Typography variant="h4" fontWeight="600">
              My Trips
            </Typography>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mt="25px"
            >
              {/* <ProgressCircle size="125" /> */}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
