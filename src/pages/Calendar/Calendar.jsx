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
  useTheme,
} from "@mui/material";
import { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { baseURL, getAllTrips } from "../../api/trips.api";

function Calendar() {
  //   const theme = useTheme();
  //   const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);
  const { user } = useContext(AuthContext);

  const {
    data: allTrips,
    isLoading,
    error,
    reFetch,
  } = useFetch(`${baseURL}/trips?userId=${user._id}`);
  console.log({ allTrips });

  function formatDateToISO(date) {
    const dateObj = new Date(date);
    const year = dateObj.getUTCFullYear();
    const month = String(dateObj.getUTCMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    // Convert the fetched trips to events and set them to currentEvents
    const tripsAsEvents = allTrips
      ? allTrips.map((trip) => ({
          id: trip._id,
          title: trip.destination,
          start: formatDateToISO(trip.startDate),
          end: formatDateToISO(trip.endDate),
        }))
      : [];
    setCurrentEvents(tripsAsEvents);
  }, [allTrips]);

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

  return (
    <Box m="20px">
      <Typography>CALENDAR</Typography>

      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        <Box
          flex="1 1 20%"
          //   backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">MY TRIPS</Typography>
          <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                // sx={{
                //   backgroundColor: colors.greenAccent[500],
                //   margin: "10px 0",
                //   borderRadius: "2px",
                // }}
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
              </ListItem>
            ))}
          </List>
        </Box>

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
            events={currentEvents} // Use events prop instead of eventsSet
          />
        </Box>
      </Box>
    </Box>
  );
}

export default Calendar;
