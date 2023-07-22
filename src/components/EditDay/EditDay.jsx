import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  TextField,
  Typography
} from '@mui/material';
import { updateTrip, getTrip, updateDay } from '../../api/trips.api';
import { useNavigate, useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { baseURL } from '../../api/trips.api';
import DayCard from './DayCard';
import './EditDay.css';
import PlaceCard from '../PlaceDetails/PlaceCard';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} timeout={700} />;
});

const EditDay = ({ selectedPlace, setShowEditDialog, selectedTrip }) => {
  const navigate = useNavigate();
  const params = useParams();

  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [days, setDays] = useState([]);
  const [tripInfo, setTripInfo] = useState(null);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    setTripInfo(selectedTrip); // Set the tripInfo state when selectedTrip changes
  }, [selectedTrip]);

  const {
    data: tripData,
    isLoading,
    error
  } = useFetch(`${baseURL}/trip/${selectedTrip}`);

  useEffect(() => {
    if (tripData) {
      setDestination(tripData.destination);
      setStartDate(tripData.startDate);
      setEndDate(tripData.endDate);
      setDays(tripData.days);
    }
  }, [tripData]);

  const formatDate = dateString => {
    if (!dateString || !Date.parse(dateString)) {
      return '';
    }

    const date = new Date(dateString);
    return date.toISOString().substring(0, 10);
  };

  const handleNameChange = event => {
    setDestination(event.target.value);
  };

  const handleStartDateChange = event => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = event => {
    setEndDate(event.target.value);
  };

  const handleEditTrip = async e => {
    e.preventDefault();

    const updatedTrip = {
      destination,
      startDate,
      endDate
    };

    try {
      const response = await updateTrip(updatedTrip, selectedTrip);
      console.log('Trip updated:', response.data);
      handleClose();
      navigate('/map');
    } catch (error) {
      console.log('Error updating trip:', error);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setShowEditDialog(false);
  };

  const handleAddPlaceToDay = async (dayId, place) => {
    try {
      const response = await updateDay(dayId, place);
      console.log('Day updated:', response.data);

      // Update the local 'days' array with the updated day data returned from the backend
      const updatedDays = days.map(day =>
        day._id === dayId ? response.data : day
      );
      setDays(updatedDays);
    } catch (error) {
      console.log('Error updating day:', error);
      // Handle error, e.g., show an error message to the user
    }
  };

  const handleRemovePlaceFromDay = (dayId, type, placeId) => {
    // Find the day in the days array based on the dayId
    const updatedDays = days.map(day => {
      if (day._id === dayId) {
        // Create a copy of the day to modify
        const updatedDay = { ...day };

        // Remove the place from the day based on its type (accommodation or restaurant)
        if (type === 'accommodation') {
          updatedDay.accommodation = null;
        } else if (type === 'restaurant') {
          updatedDay.restaurants = updatedDay.restaurants.filter(
            restaurantId => restaurantId !== placeId
          );
        }

        return updatedDay;
      }
      return day;
    });

    // Update the state with the modified days array
    setDays(updatedDays);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const titleStyle = {
    textAlign: 'center',
    fontSize: 20
  };

  const highlightStyle = {
    color: '#1976d2',
    fontWeight: 'bold'
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      fullScreen
      TransitionComponent={Transition}
    >
      <DialogTitle>
        Adding to your trip to{' '}
        <Typography
          component="span"
          variant="inherit"
          color="primary"
          style={{
            textDecoration: 'underline',
            cursor: 'pointer',
            transition: 'color 0.2s'
          }}
          onClick={() => navigate(`/trips/edit/${selectedTrip}`)}
          onMouseEnter={e => (e.target.style.color = 'blue')}
          onMouseLeave={e => (e.target.style.color = 'inherit')}
        >
          {tripData.destination}
        </Typography>{' '}
      </DialogTitle>

      <Box display="flex" justifyContent="center" mt={2}>
        <Box maxWidth={400}>
          <PlaceCard place={selectedPlace} />
        </Box>
        <Button
          sx={{ backgroundColor: '#f0f0f0', borderRadius: '5px' }}
          onClick={handleClose}
        >
          Back
        </Button>
      </Box>
      {tripInfo && (
        <>
          <DialogTitle sx={titleStyle}>
            Chose a day to add{' '}
            <Typography component="span" variant="inherit" sx={highlightStyle}>
              {selectedPlace.name.toUpperCase()}
            </Typography>{' '}
            to your{' '}
            <Typography
              component="span"
              variant="inherit"
              color="primary"
              style={{ textDecoration: 'underline', cursor: 'pointer' }}
              onClick={() => navigate(`/trips/edit/${selectedTrip}`)}
              sx={highlightStyle}
            >
              {destination}
            </Typography>{' '}
            trip to:
          </DialogTitle>
          <Box className="days-container">
            {tripData?.days &&
              tripData.days.map(day => {
                return (
                  <DayCard
                    highlightStyle={highlightStyle}
                    key={day._id}
                    day={day}
                    place={selectedPlace}
                    onAddPlaceToDay={handleAddPlaceToDay}
                    onRemovePlaceFromDay={handleRemovePlaceFromDay}
                  />
                );
              })}
          </Box>
        </>
      )}
    </Dialog>
  );
};

export default EditDay;
