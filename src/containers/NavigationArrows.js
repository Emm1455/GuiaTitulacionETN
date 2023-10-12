import React from "react";
import { Box, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function NavigationArrows({ labels, handlePrevious, handleNext }) {
  let distribution = "space-between";
  if(labels[0] === ""){distribution = "flex-end";}
  if(labels[1] === ""){distribution = "flex-start";}
  return (
    <Box sx={{ display: "flex", width: "100%", justifyContent: distribution }}>
      {labels[0] !== "" ? (
        <Button
          onClick={() => handlePrevious()}
          color="primary"
          aria-label="next"
          variant = "outlined"
          startIcon = {<ArrowBackIcon />}
          sx={{ textTransform: "none", lineHeight: 1.2}}
        >
          {labels[0]}
        </Button>
      ) : (
        <></>
      )}
      {labels[1] !== "" ? (
        <Button
          onClick={() => handleNext()}
          color="primary"
          aria-label="next"
          variant = "outlined"
          endIcon = {<ArrowForwardIcon />}
          sx={{ textTransform: "none", lineHeight: 1.2 }}
        >
          {labels[1]}
        </Button>
      ) : (
        <></>
      )}
    </Box>
  );
}

export default NavigationArrows;
