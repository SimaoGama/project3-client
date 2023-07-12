import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import { Link, NavLink } from 'react-router-dom';
import { Typography } from '@mui/material';
import { AuthContext } from '../../context/auth.context';
import './Dropdown.css';

const Dropdown = ({ user }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { logOutUser } = React.useContext(AuthContext);
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Options">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>
              <Avatar sx={{ width: 32, height: 32 }}>
                {user && user.firstName ? user.firstName.charAt(0) : ''}
              </Avatar>
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,

            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar /> <Typography variant="h5">Profile</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar /> <Typography variant="h5">My Account</Typography>
        </MenuItem>
        <Divider />

        <Link to="/dashboard" className="link">
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <DashboardCustomizeOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="h5">Dashboard</Typography>
          </MenuItem>
        </Link>

        <Link to="/settings" className="link">
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            <Typography variant="h5">Settings</Typography>
          </MenuItem>
        </Link>

        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>

          <Link
            to="/login"
            onClick={logOutUser}
            className="link"
            sx={{ '&:hover': { color: 'red' } }}
          >
            <Typography variant="h4" sx={{ '&:hover': { color: 'red' } }}>
              Logout
            </Typography>
          </Link>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default Dropdown;
