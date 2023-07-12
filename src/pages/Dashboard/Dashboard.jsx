import { Grid, Typography } from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

const Dashboard = () => {
  return (
    <Grid>
      <Sidebar />
      {/* <Typography component="h1" variant="h2">
        DASHBOARD
      </Typography> */}
    </Grid>
  );
};

export default Dashboard;
