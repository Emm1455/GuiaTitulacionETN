import { Button, IconButton, Typography, Snackbar, Alert } from "@mui/material";
import Box from "@mui/material/Box";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LinearProgress from '@mui/material/LinearProgress';
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import StepsList from "../components/StepsList";
import SimpleList from "../components/SimpleList";
import useRequest from "../hooks/useRequest";
import { endpoints } from "../api/connectionData";

function StageProfile() {
  const trajectory = JSON.parse(sessionStorage.getItem("profile"));
  const userToken = sessionStorage.getItem("token");
  const [checked, setChecked] = useState(trajectory ? trajectory.steps : []);
  const [popUpMessage, setPopUpMessage] = useState(false);
  const navigate = useNavigate();
  const [getPageRes, getPageLoading, getPageRequest] = useRequest(
    endpoints.stageProfile,
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
    sessionStorage.setItem("profile", JSON.stringify(res.body));
    setPopUpMessage(true);
  }

  const handleNext = function () {
    navigate("/stage-project");
  };

  // const handlePrevious = function () {
  //   navigate("/stage-project");
  // };

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
      }}
    >
      <Typography variant="h4">{getPageRes.title}</Typography>
      <Typography variant="h6">Requisitos</Typography>
      <Typography variant="body2">{getPageRes.requirements}</Typography>
      {userToken ? (
        <>
          <StepsList
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
        <SimpleList data={getPageRes.data} />
      )}
      <Typography variant="body2">{getPageRes?.notes[0]}</Typography>
      <Box
        sx={{ display: "flex", width: "100%", justifyContent: "flex-end" }}
      >
        {/* <IconButton
          onClick={() => handlePrevious()}
          color="primary"
          aria-label="next"
          component="button"
        >
          <ArrowBackIcon />
        </IconButton> */}
        <IconButton
          onClick={() => handleNext()}
          color="primary"
          aria-label="next"
          component="button"
        >
          <ArrowForwardIcon />
        </IconButton>
      </Box>
      <Snackbar
        open={popUpMessage}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
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
    <Box sx={{ width: '100%' }}>
      <LinearProgress/>
    </Box>
  );
}

export default StageProfile;
