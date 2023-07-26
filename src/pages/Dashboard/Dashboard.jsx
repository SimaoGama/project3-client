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
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 4"
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
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="Edit"
            subtitle="Your account"
            // progress="0.30"
            increase={`${user?.email}`}
            icon={
              <AccountCircleRoundedIcon
                sx={{ color: colors.greenAccent[500], fontSize: "32px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="Change"
            subtitle="Settings"
            progress="0.80"
            // increase="+43%"
            icon={
              <SettingsSuggestRoundedIcon
                sx={{ color: colors.greenAccent[500], fontSize: "32px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
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
          gridColumn="span 4"
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
          >
            <Typography
              onClick={() => navigate("/calendar")}
              color={colors.grey[100]}
              variant="h3"
              fontWeight="600"
              sx={{
                cursor: "pointer",
                ":hover": {
                  textDecoration: "underline",
                  color: `${colors.greenAccent[400]}`,
                },
              }} // Add pointer cursor and underline on hover
            >
              Recent Trips | Calendar
            </Typography>
          </Box>
          <SimpleCalendar />
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
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
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Sales Quantity
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
