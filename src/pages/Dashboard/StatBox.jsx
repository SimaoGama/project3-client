import { Box, Typography, useTheme } from "@mui/material";

// import ProgressCircle from "./ProgressCircle";
import { tokens } from "../../data/theme";

const StatBox = ({ title, subtitle, icon, progress, increase }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="space-between">
        <Box>
          {icon}
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
            gutterBottom
          >
            {title}
          </Typography>
        </Box>
        <Box>
          <Typography
            variant="h3"
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
            gutterBottom
          >
            {progress}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography variant="h3" sx={{ color: colors.grey[100] }} gutterBottom>
          {/* Apply the custom color to the Typography component */}
          {subtitle}
        </Typography>
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: colors.greenAccent[200] }}
          gutterBottom
        >
          {increase}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;
