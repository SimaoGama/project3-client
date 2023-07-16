import { useContext, useState } from "react";
import { Sidebar as ProSidebar, Menu, MenuItem } from "react-pro-sidebar";

import {
  Box,
  IconButton,
  ThemeProvider,
  Typography,
  useTheme,
} from "@mui/material";

import { Link } from "react-router-dom";
import { tokens } from "../../data/theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";

import { AuthContext } from "../../context/auth.context";
import { ColorModeContext } from "../../context/theme.context";

import "./Sidebar.css";
import NewTrip from "../CreateTrip/NewTrip";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Link to={to} style={{ textDecoration: "none" }}>
      <MenuItem
        active={selected === title}
        style={
          theme.palette.mode === "dark"
            ? { color: colors.grey[800] }
            : { color: colors.grey[100] }
        }
        onClick={() => setSelected(title)}
        icon={
          <span className={selected === title ? "wiggle" : ""}>{icon}</span>
        }
      >
        <Typography>{title}</Typography>
        <div
          className={`fade-overlay ${
            selected === title ? "fade-overlay-active" : ""
          }`}
        ></div>
      </MenuItem>
    </Link>
  );
};

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const { isLoggedIn, logOutUser, user } = useContext(AuthContext);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <ThemeProvider theme={theme}>
      <Box
        paddingRight={2.5}
        sx={{
          "& .pro-sidebar-inner": {
            background: `${colors.primary[400]} !important`,
          },
          "& .pro-icon-wrapper": {
            backgroundColor: "transparent !important",
          },
          "& .pro-inner-item": {
            pading: "5px 35px 5px 20px !important",
          },
          "& .pro-inner-item:hover": {
            color: "#868dfb !important",
          },
          "& .pro-menu-item.active": {
            color: "#6870fa !important",
          },
        }}
      >
        <ProSidebar collapsed={isCollapsed}>
          <Menu iconShape="square">
            {/* LOGO AND MENU ICON */}
            <MenuItem
              onClick={() => setIsCollapsed(!isCollapsed)}
              icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
              style={{
                margin: "10px 0 10px 0",
                color: colors.grey[100],
              }}
            >
              {!isCollapsed && (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="100%" // Adjust the desired height
                  width="100%" // Ensure it spans the full width
                >
                  <IconButton
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    style={{ fontSize: "1rem" }} // Increase the font size as desired
                  >
                    <MenuOutlinedIcon />
                  </IconButton>
                </Box>
              )}
            </MenuItem>

            {!isCollapsed && (
              <Box mb="20px">
                <Box display="flex" justifyContent="center" alignItems="center">
                  <img
                    alt="profile-user"
                    width="100px"
                    height="100px"
                    src={""}
                    style={{ cursor: "pointer", borderRadius: "10%" }}
                  />
                </Box>
                <Box textAlign="center">
                  <Typography
                    variant="h3"
                    color={colors.primary[500]}
                    fontWeight="bold"
                    sx={{ m: "10px 0 0 0" }}
                  >
                    {user && `${user.firstName}` + " " + `${user.lastName}`}
                  </Typography>
                  <Typography variant="h5" color={colors.grey[500]}>
                    VP Fancy Admin
                  </Typography>
                </Box>
              </Box>
            )}
            {/* MENU ITEMS */}
            <Box paddingLeft={isCollapsed ? undefined : "10%"}>
              <Item
                to="/"
                title="Home"
                icon={<HomeOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Typography
                variant="h6"
                color={colors.grey[600]}
                sx={{ m: "15px 0 5px 20px", fontWeight: "bold" }}
              >
                USER
              </Typography>
              <Item
                title="Settings"
                to="/team"
                icon={<PeopleOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="My Trips"
                to="/trips"
                icon={<MapOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Map"
                to="/map"
                icon={<PublicOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Typography
                variant="h6"
                color={colors.grey[600]}
                sx={{ m: "15px 0 5px 20px", fontWeight: "bold" }}
              >
                PAGES
              </Typography>
              <Item
                title="Profile Form"
                to="/form"
                icon={<PersonOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="New Trip"
                to="/trips/new"
                icon={<TravelExploreIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="FAQ Page"
                to="/faq"
                icon={<HelpOutlineOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Typography
                variant="h6"
                color={colors.grey[600]}
                sx={{ m: "15px 0 5px 20px", fontWeight: "bold" }}
              >
                INFO
              </Typography>
              <Item
                title="Bar Chart"
                to="/bar"
                icon={<BarChartOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Pie Chart"
                to="/pie"
                icon={<PieChartOutlineOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Line Chart"
                to="/line"
                icon={<TimelineOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Geography Chart"
                to="/geography"
                icon={<MapOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </Box>
          </Menu>
        </ProSidebar>
      </Box>
    </ThemeProvider>
  );
};
export default Sidebar;
