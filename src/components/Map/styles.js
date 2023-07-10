import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100px'
  },
  mapContainer: {
    height: '85vh',
    width: '100%'
  },
  markerContainer: {
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    zIndex: 1,
    '&:hover': { zIndex: 2 }
  },
  pointer: {
    cursor: 'pointer'
  },
  img: {
    width: '100%',
    height: 'auto',
    objectFit: 'cover'
  }
}));

export default useStyles;
