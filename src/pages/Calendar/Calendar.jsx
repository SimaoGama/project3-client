import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
// import { eventDrop } from "@fullcalendar/interaction";

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
import { addTrip, baseURL, updateTrip, deleteTrip } from "../../api/trips.api";
import { CompactPicker } from "react-color";
import { TripColorsContext } from "../../context/tripColors.context";
import NewTrip from "../../components/CreateTrip/NewTrip";
import { tokens } from "../../context/theme.context";
import { Link, useNavigate } from "react-router-dom";
import EventOptionsModal from "../../components/Modal/MultiSelectModal";
import EditTrip from "../../components/EditTrip/EditTrip";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [showEditTripForm, setShowEditTripForm] = useState(false);
  const [showMultiSelectForm, setShowMultiSelectForm] = useState(false);
  const [cameFromCalendar, setCameFromCalendar] = useState(false);

  const navigate = useNavigate();

  const { tripColors, setTripColors } = useContext(TripColorsContext);

  const { user } = useContext(AuthContext);

  const {
    data: allTrips,
    isLoading,
    error,
    reFetch,
  } = useFetch(`${baseURL}/trips?userId=${user._id}`);

  // console.log(allTrips);

  // When allTrips data changes, update the currentEvents based on it
  useEffect(() => {
    // Convert the fetched trips to events and set them to currentEvents
    const tripsAsEvents = allTrips
      ? allTrips.map((trip) => {
          const savedColor = tripColors[trip._id];
          const days = trip.days.length; // Get the number of days for the trip

          console.log(days);

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
      // Calculate the duration of the trip in days
      const totalDays = Math.round(
        (selected.end - selected.start) / (24 * 60 * 60 * 1000)
      );

      // Create the new trip object with adjusted end date
      const newTrip = {
        destination: title,
        startDate: selected.startStr,
        endDate: formatDateToISO(
          new Date(selected.end.getTime() - 24 * 60 * 60 * 1000)
        ), // Adjusted end date
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
          reFetch();
          setCurrentEvents((prevEvents) => [...prevEvents, event]);
        })
        .finally(
          toast.success(`Trip ${newTrip.destination} created successfully!`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        )
        .catch((error) => {
          console.error("Error adding trip:", error);
        });
    }
  };

  // Edit trip to the database using the updateTrip function
  const handleEventDrop = (dropInfo) => {
    const { event } = dropInfo;
    const { id: tripId, start, end } = event;

    const adjustedEndDate = new Date(end.getTime() - 24 * 60 * 60 * 1000);
    // const adjustedEndDate = new Date(end)

    // Format the start and adjusted end dates in ISO format
    const formattedStartDate = formatDateToISO(start);
    const formattedEndDate = formatDateToISO(adjustedEndDate);

    // Get the existing destination from the event
    const destination = event.title;

    const updatedTrip = {
      destination, // Keep the destination the same
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    };

    console.log("updatedTrip:", updatedTrip);

    // Call the updateTrip function to update the trip in the database
    updateTrip(updatedTrip, tripId)
      .then(() => {
        // If the trip was successfully updated in the database, update the currentEvents state
        setCurrentEvents((prevEvents) =>
          prevEvents.map((prevEvent) =>
            prevEvent.id === tripId
              ? {
                  ...prevEvent,
                  title: destination, // Update the title (destination) in the event
                  start: formattedStartDate,
                  end: adjustedEndDate, // Use the adjusted end date
                }
              : prevEvent
          )
        );
        reFetch();
      })
      .finally(
        toast.success("Trip edited successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      )
      .catch((error) => {
        console.error("Error updating trip:", error);
      });
  };

  const handleEventClick = (clickInfo) => {
    // Get the selected trip from the currentEvents state based on the ID of the clicked event
    const selectedTrip = currentEvents.find(
      (event) => event.id === clickInfo.event.id
    );

    // Set the selectedTrip to the state to show the modal
    setShowMultiSelectForm(true);
    setSelectedTrip(selectedTrip);
  };

  const handleDeleteTrip = () => {
    if (window.confirm(`Delete event? ${selectedTrip.title}`)) {
      // Call the deleteTrip function with the trip ID
      deleteTrip(selectedTrip.id)
        .then(() => {
          // If the trip is deleted successfully, remove the event from the calendar

          const updatedEvents = currentEvents.filter(
            (event) => event.id !== selectedTrip.id
          );
          reFetch();
          setCurrentEvents(updatedEvents);
          setSelectedTrip(null);
        })
        .catch((error) => {
          console.error("Error deleting trip:", error);
          setSelectedTrip(null);
        });
    }
  };

  const handleEditTrip = () => {
    if (selectedTrip && window.confirm(`Edit event? ${selectedTrip.title}`)) {
      const tripId = selectedTrip.id;
      setCameFromCalendar(true); // Set the state variable to true when navigating to the edit page
      navigate(`/trips/edit/${tripId}`, { state: { cameFromCalendar: true } });
    }
  };

  const handleCloseEditTripForm = () => {
    setShowEditTripForm(false);
    setSelectedTrip(null);
    setCameFromCalendar(false); // Reset the state variable when closing the edit form
  };

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
    console.log("here");
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
                          {formatDateToISO(event.start, {
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
              eventDrop={handleEventDrop}
            />
          </Box>
          {showMultiSelectForm && (
            <EventOptionsModal
              selectedTrip={selectedTrip}
              onClose={() => setSelectedTrip(null)}
              onDelete={handleDeleteTrip}
              onEdit={handleEditTrip}
            />
          )}
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

        {showEditTripForm && (
          <EditTrip
            trip={selectedTrip}
            onClose={handleCloseEditTripForm} // Pass the onClose function with the correct behavior
            reFetch={reFetch}
            cameFromCalendar={location.state?.cameFromCalendar || false} // Access the state variable passed from the EditTrip component
          />
        )}
      </Box>
    </ThemeProvider>
  );
}

export default Calendar;
