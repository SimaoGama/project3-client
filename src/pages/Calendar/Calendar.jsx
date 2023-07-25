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
} from "@mui/material";
import ColorLensTwoToneIcon from "@mui/icons-material/ColorLensTwoTone";
import { styled } from "@mui/material/styles";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import useFetch from "../../hooks/useFetch";
import { baseURL } from "../../api/trips.api";
import { CompactPicker } from "react-color";
import { TripColorsContext } from "../../context/tripColors.context";
import NewTrip from "../../components/CreateTrip/NewTrip";

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
  borderRadius: "2px",
  "&:hover": {
    backgroundColor: "rgb(44,62,80)",
  },
}));

function Calendar() {
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

  // When allTrips data changes, update the currentEvents based on it
  useEffect(() => {
    // Convert the fetched trips to events and set them to currentEvents
    const tripsAsEvents = allTrips
      ? allTrips.map((trip) => {
          const savedColor = tripColors[trip._id];
          console.log(savedColor);
          return {
            id: trip._id,
            title: trip.destination,
            start: formatDateToISO(trip.startDate),
            end: formatDateToISO(trip.endDate),
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
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      });
    }
  };

  const handleEventClick = (selected) => {
    if (window.confirm(`Delete event? ${selected.title}`)) {
      selected.event.remove();
    }
  };

  function formatDate(date, options) {
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
                {/* Color picker input for each trip */}
                <Button onClick={() => handleOpenColorPicker(event.id)}>
                  <ColorLensTwoToneIcon
                    sx={{
                      backgroundColor: "#fff",
                      borderRadius: "50%",
                      fontSize: "1.5rem",
                    }}
                  />
                </Button>
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
            dayMaxEvents={true}
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
      {showNewTripForm && <NewTrip handleClose={handleShowNewTripForm} />}
    </Box>
  );
}

export default Calendar;
