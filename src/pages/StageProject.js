import {
  Button,
  IconButton,
  Typography,
  Snackbar,
  Alert,
  Grid,
  Divider,
  Box,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LinearProgress from "@mui/material/LinearProgress";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useRequest from "../hooks/useRequest";
import { endpoints } from "../api/connectionData";
import Steps from "../containers/Steps";
import StepsLogged from "../containers/StepsLogged";

function StageProject() {
  const trajectory = JSON.parse(sessionStorage.getItem("project"));
  const userToken = sessionStorage.getItem("token");
  const [checked, setChecked] = useState(trajectory ? trajectory.steps : []);
  const [popUpMessage, setPopUpMessage] = useState(false);
  const navigate = useNavigate();
  const [getPageRes, getPageLoading, getPageRequest] = useRequest(
    endpoints.stageProject,
    "GET",
    "",
    () => {}
  );
  const [putTrajectoryRes, putTrajectoryLoading, putTrajectoryRequest] =
    useRequest(
      endpoints.trajectory + trajectory?._id,
      "PUT",
      userToken,
      handleTrajectoryResponse
    );

  useEffect(() => {
    getPageRequest();
  }, []);

  function handleTrajectory() {
    putTrajectoryRequest({ steps: checked });
  }

  function handleTrajectoryResponse(res) {
    sessionStorage.setItem("project", JSON.stringify(res.body));
    setPopUpMessage(true);
  }

  // const handleNext = function () {
  //   navigate("/stage-project");
  // };

  const handlePrevious = function () {
    navigate("/stage-profile");
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setPopUpMessage(false);
  };

  return getPageLoading === "requested" ? (
    <Box
      sx={{
        display: "flex",
        height: "80vh",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexDirection: "column",
        p: 2,
        gap: 1,
      }}
    >
      <Typography variant="h4">{getPageRes.title}</Typography>
      <Divider flexItem />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6">Requisitos</Typography>
            <Typography variant="body2">{getPageRes.requirements}</Typography>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6">Pasos</Typography>
            {userToken ? (
              <>
                <StepsLogged
                  data={getPageRes.data}
                  checked={checked}
                  setChecked={setChecked}
                />
                <Button
                  onClick={handleTrajectory}
                  disabled={putTrajectoryLoading === "requesting"}
                >
                  Registrar avance
                </Button>
              </>
            ) : (
              <Steps data={getPageRes.data} />
            )}
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6">Linea temporal</Typography>
            {getPageRes.data.map((item) => {
              return (
                <Box
                  key={item.number}
                  sx={{ display: "flex", justifyContent: "flex-start", gap: 1 }}
                >
                  <Typography variant="body2">{item.number}:</Typography>
                  <Typography variant="body2">{item.duration}</Typography>
                </Box>
              );
            })}
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6">Notas</Typography>
            <Typography variant="body2">{getPageRes?.notes[0]}</Typography>
          </Box>
        </Grid>
      </Grid>
      <Box
        sx={{ display: "flex", width: "100%", justifyContent: "flex-start" }}
      >
        <IconButton
          onClick={() => handlePrevious()}
          color="primary"
          aria-label="next"
          component="button"
        >
          <ArrowBackIcon />
        </IconButton>
        {/* <IconButton
          onClick={() => handleNext()}
          color="primary"
          aria-label="next"
          component="button"
        >
          <ArrowForwardIcon />
        </IconButton> */}
      </Box>
      <Snackbar
        open={popUpMessage}
        autoHideDuration={2500}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {putTrajectoryRes.message}
        </Alert>
      </Snackbar>
    </Box>
  ) : (
    <Box sx={{ width: "100%" }}>
      <LinearProgress />
    </Box>
  );
}

export default StageProject;
