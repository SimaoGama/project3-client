// import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Rating from '@mui/material/Rating';
// import { makeStyles } from '@mui/styles';
import useStyles from './styles';

// const useStyles = makeStyles(theme => ({
//   paper: {
//     padding: '10px',
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     width: '100px'
//   },
//   mapContainer: {
//     height: '85vh',
//     width: '100%'
//   },
//   markerContainer: {
//     position: 'absolute',
//     transform: 'translate(-50%, -50%)',
//     zIndex: 1,
//     '&:hover': { zIndex: 2 }
//   },
//   pointer: {
//     cursor: 'pointer'
//   },
//   img: {
//     width: '100%',
//     height: 'auto',
//     objectFit: 'cover'
//   }
// }));

const Map = ({
  setCoordinates,
  setBounds,
  coordinates,
  places,
  setChildClicked
}) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery('(min-width:600px)');

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyAEmWOChWlh6M9uJ9soJT2q-n86uOQqp9M' }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={''}
        onChange={e => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={child => {
          setChildClicked(child);
        }}
      >
        {places?.map((place, i) => (
          <div
            className={classes.markerContainer}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}
          >
            {!isDesktop ? (
              <LocationOnOutlinedIcon color="primary" fontSize="large" />
            ) : (
              <Paper elevation={3} className={classes.paper}>
                <Typography
                  className={classes.typography}
                  variant="subtitle2"
                  gutterBottom
                >
                  {place.name}
                </Typography>
                <img
                  className={classes.img}
                  src={
                    place.photo
                      ? place.photo.images.large.url
                      : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'
                  }
                  alt={place.name}
                />
                <Rating size="small" value={Number(place.rating)} readOnly />
              </Paper>
            )}
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
