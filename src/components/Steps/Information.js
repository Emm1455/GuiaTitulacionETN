import React from "react";
import { Typography } from "@mui/material";
function Information({steps}) {
  return (
    <>
      <Typography sx={{ fontWeight: 600 }} variant="body2">
        Descripción:
      </Typography>
      {steps?.map((item) => (
        <Typography sx={{ ml: 1 }} variant="body2" key={item}>
          - {item}
        </Typography>
      ))}
    </>
  );
}

export default Information;
