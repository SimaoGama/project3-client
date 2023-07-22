import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Box,
  Pagination,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TripDayCard from "./TripDayCard";

const DayList = ({ days }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(days.length / itemsPerPage);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedDays = days.slice(startIndex, endIndex);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().substring(0, 10);
  };

  return (
    <div>
      {displayedDays.map((day) => (
        <Accordion key={day._id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography>
              {formatDate(day.date)} {day.city || ""}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TripDayCard formatDate={formatDate} day={day} />
          </AccordionDetails>
        </Accordion>
      ))}
      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handleChangePage}
        />
      </Box>
    </div>
  );
};

export default DayList;
