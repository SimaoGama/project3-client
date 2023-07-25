import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Modal,
  Button,
  ThemeProvider,
} from "@mui/material";
import ColorLensTwoToneIcon from "@mui/icons-material/ColorLensTwoTone";
import { styled, useTheme } from "@mui/material/styles";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import useFetch from "../../hooks/useFetch";
import { addTrip, baseURL } from "../../api/trips.api";
import { CompactPicker } from "react-color";
import { TripColorsContext } from "../../context/tripColors.context";
import NewTrip from "../../components/CreateTrip/NewTrip";
import { tokens } from "../../context/theme.context";
import { Link } from "react-router-dom";

const SidebarBox = styled(Box)(({ theme }) => ({
  flex: "1 1 20%",
  backgroundColor: theme.palette.primary.secondary,
  color: theme.palette.primary.contrastText,
  padding: "15px",
  borderRadius: "4px",
}));

const SidebarTitle = styled(Typography)({
  marginBottom: "10px",
});

const ListItemStyled = styled(ListItem)(({ theme }) => ({
  backgroundColor: "rgba(26,37,46)",
  margin: "10px 0",
  //   justifyContent: "center",
  borderRadius: "2px",
  "&:hover": {
    backgroundColor: "rgb(44,62,80)",
  },
}));

function Calendar() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [currentEvents, setCurrentEvents] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [showNewTripForm, setShowNewTripForm] = useState(false);

  const { tripColors, setTripColors } = useContext(TripColorsContext);

  const { user } = useContext(AuthContext);

  const {
    data: allTrips,
    isLoading,
    error,
    reFetch,
  } = useFetch(`${baseURL}/trips?userId=${user._id}`);

  console.log(allTrips);

  // When allTrips data changes, update the currentEvents based on it
  useEffect(() => {
    // Convert the fetched trips to events and set them to currentEvents
    const tripsAsEvents = allTrips
      ? allTrips.map((trip) => {
          const savedColor = tripColors[trip._id];
          const days = trip.days.length; // Get the number of days for the trip

          // Adjust the end date to visually display the event one day longer
          const endDate = new Date(trip.endDate);
          endDate.setDate(endDate.getDate() + 1);

          return {
            id: trip._id,
            title: trip.destination,
            start: formatDateToISO(trip.startDate),
            end: formatDateToISO(endDate),
            backgroundColor: savedColor || "#4cceac",
            borderColor: savedColor || "#4cceac",
          };
        })
      : [];
    setCurrentEvents(tripsAsEvents);
  }, [allTrips, tripColors]);

  // Load trip colors from localStorage when the component mounts
  useEffect(() => {
    const savedTripColors = localStorage.getItem("tripColors");
    if (savedTripColors) {
      setTripColors(JSON.parse(savedTripColors));
    }
  }, []);

  // Save trip colors to localStorage when tripColors state changes
  useEffect(() => {
    localStorage.setItem("tripColors", JSON.stringify(tripColors));
  }, [tripColors]);

  const handleDateClick = (selected) => {
    // Prompt to get the title and number of days for the new trip
    const title = prompt("Please enter a title for your trip");

    // Validate input for title
    if (title) {
      // Create the new trip object
      const newTrip = {
        destination: title,
        startDate: selected.startStr,
        endDate: selected.endStr,
      };

      // Add the new trip to the database using the addTrip function
      addTrip(newTrip, user._id)
        .then((response) => {
          // If the trip was successfully added to the database, update the calendar view
          const { data: newTripData } = response;
          const savedColor = tripColors[newTripData._id] || "#4cceac";

          const event = {
            id: newTripData._id,
            title: newTripData.destination,
            start: newTripData.startDate,
            end: new Date(newTripData.endDate), // Use a Date object for the end date
            backgroundColor: savedColor,
            borderColor: savedColor,
          };

          setCurrentEvents((prevEvents) => [...prevEvents, event]);
          reFetch();
        })
        .catch((error) => {
          console.error("Error adding trip:", error);
        });
    }
  };

  const handleEventClick = (selected) => {
    if (window.confirm(`Delete event? ${selected.title}`)) {
      selected.event.remove();
    }
  };

  function formatDate(date, options) {
    // Format and return the date using Intl.DateTimeFormat
    return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
  }

  function formatDateToISO(date) {
    const dateObj = new Date(date);
    const year = dateObj.getUTCFullYear();
    const month = String(dateObj.getUTCMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const handleColorChange = (tripId, color) => {
    const updatedTripColors = {
      ...tripColors,
      [tripId]: color.hex,
    };

    // Update the tripColors state with the updatedTripColors variable
    setTripColors(updatedTripColors);

    // Update the currentEvents state to reflect the new color for the trip
    setCurrentEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === tripId
          ? {
              ...event,
              backgroundColor: color.hex,
              borderColor: color.hex,
            }
          : event
      )
    );
  };

  const handleOpenColorPicker = (tripId) => {
    setSelectedTrip(tripId);
    setColorPickerVisible(true);
  };

  const handleCloseColorPicker = () => {
    setSelectedTrip(null);
    setColorPickerVisible(false);
  };

  const handleShowNewTripForm = () => {
    setShowNewTripForm(!showNewTripForm);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box p={5}>
        <Box display="flex" justifyContent="space-between">
          {/* CALENDAR SIDEBAR */}
          <SidebarBox>
            <SidebarTitle variant="h5">MY TRIPS</SidebarTitle>
            <List>
              <ListItemStyled
                onClick={handleShowNewTripForm}
                sx={{
                  "&:hover, &.Mui-focusVisible": {
                    backgroundColor: "#2da883", // Customize this color as needed
                    cursor: "pointer",
                  },
                }}
              >
                <ListItemText primary="Add New Trip" />
              </ListItemStyled>
              {currentEvents.map((event) => (
                <ListItemStyled
                  key={event.id}
                  style={{ background: event.backgroundColor }}
                >
                  <Link
                    to={`/trip/${event.id}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <ListItemText
                      primary={event.title}
                      secondary={
                        <Typography>
                          {formatDate(event.start, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </Typography>
                      }
                    />
                  </Link>
                  {/* Color picker input for each trip */}

                  <ColorLensTwoToneIcon
                    onClick={() => handleOpenColorPicker(event.id)}
                    sx={{
                      color: "rgba(25,25,26,0.8)",
                      fontSize: "2rem", // Adjust the size as needed
                      marginLeft: "3rem", // Adjust the margin as needed
                      cursor: "pointer",
                      transition: "transform 0.2s ease-in-out", // Add a transition for zooming effect
                      "&:hover": {
                        transform: "scale(1.2)", // Apply a scale transformation on hover
                      },
                    }}
                  />
                </ListItemStyled>
              ))}
            </List>
          </SidebarBox>

          {/* CALENDAR */}
          <Box flex="1 1 100%" ml="15px">
            <FullCalendar
              height="75vh"
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                listPlugin,
              ]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
              }}
              initialView="dayGridMonth"
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={false}
              select={handleDateClick}
              eventClick={handleEventClick}
              events={currentEvents}
              eventColor={(info) => tripColors[info.event.id] || "#4cceac"}
            />
          </Box>
        </Box>
        {/* Modal for Color Picker */}
        <Modal open={colorPickerVisible} onClose={handleCloseColorPicker}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <CompactPicker
              color={tripColors[selectedTrip] || "#ffffff"}
              onChange={(color) => handleColorChange(selectedTrip, color)}
            />
          </Box>
        </Modal>
        {showNewTripForm && (
          <NewTrip handleClose={handleShowNewTripForm} reFetch={reFetch} />
        )}
      </Box>
    </ThemeProvider>
  );
}

export default Calendar;
