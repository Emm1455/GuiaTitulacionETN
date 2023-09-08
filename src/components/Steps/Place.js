import React from "react";
import { Link, Typography } from "@mui/material";

function Place({ place }) {
  const formatedPlace = place.includes("http") ? (
    <Link href={place}>{place}</Link>
  ) : (
    place
  );
  return (
    <>
      <Typography sx={{ fontWeight: 600 }} variant="body2">
        Lugar:
      </Typography>
      <Typography sx={{ ml: 1 }} variant="body2">
        {formatedPlace}
      </Typography>
    </>
  );
}

export default Place;
