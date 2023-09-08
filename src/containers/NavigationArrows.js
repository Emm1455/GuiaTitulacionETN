import React from "react";
import { Box, IconButton } from "@mui/material";
import { stagesQuantity } from "../constants/constants";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function NavigationArrows({ currentPosition, handlePrevious, handleNext }) {
  let distribution = "space-between";
  if(currentPosition === 1) distribution = "flex-end";
  return (
    <Box sx={{ display: "flex", width: "100%", justifyContent: distribution }}>
      {currentPosition > 1 ? (
        <IconButton
          onClick={() => handlePrevious()}
          color="primary"
          aria-label="next"
          component="button"
        >
          <ArrowBackIcon />
        </IconButton>
      ) : (
        <></>
      )}
      {currentPosition < stagesQuantity ? (
        <IconButton
          onClick={() => handleNext()}
          color="primary"
          aria-label="next"
          component="button"
        >
          <ArrowForwardIcon />
        </IconButton>
      ) : (
        <></>
      )}
    </Box>
  );
}

export default NavigationArrows;
