import React, { useState } from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import Steps from "./Steps";
import StepsLogged from "./StepsLogged";
import DurationTimeLine from "./DurationTimeLine";

function StageContent({
  data,
  token,
  trajectory,
  putTrajectoryLoading,
  putTrajectoryRequest,
}) {
  const [checked, setChecked] = useState(trajectory ? trajectory.steps : []);

  function handleTrajectory() {
    putTrajectoryRequest({ steps: checked });
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">Requisitos</Typography>
          <Typography variant="body2">{data.requirements}</Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">Pasos</Typography>
          {token ? (
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <StepsLogged
                data={data.data}
                checked={checked}
                setChecked={setChecked}
              />
              <Button
                onClick={handleTrajectory}
                variant="contained"
                sx={{ alignSelf: "flex-end", textTransform: "none" }}
                size="medium"
                disabled={putTrajectoryLoading === "requesting"}
              >
                Registrar avance
              </Button>
            </Box>
          ) : (
            <Steps data={data.data} />
          )}
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">Linea temporal</Typography>
          <DurationTimeLine data={data.data} />
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">Notas</Typography>
          <Typography variant="body2">{data?.notes[0]}</Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

export default StageContent;
