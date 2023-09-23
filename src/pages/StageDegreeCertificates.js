import { Typography, Snackbar, Alert, Divider, Box } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useRequest from "../hooks/useRequest";
import { endpoints } from "../api/connectionData";
import StageContent from "../containers/StageContent";
import NavigationArrows from "../containers/NavigationArrows";
import { stages } from "../constants/constants";

function StageDegreeCertificates() {
  const currentStage = stages.degreeCertificates;
  const trajectory = JSON.parse(sessionStorage.getItem(currentStage.stage));
  const userToken = sessionStorage.getItem("token");
  const [popUpMessage, setPopUpMessage] = useState(false);
  const navigate = useNavigate();
  const [getPageRes, getPageLoading, getPageRequest] = useRequest(
    endpoints.stageDegreeCertificates,
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

  function handleTrajectoryResponse(res) {
    sessionStorage.setItem(currentStage.stage, JSON.stringify(res.body));
    setPopUpMessage(true);
  }
  
  const handlePrevious = function () {
    navigate("/stage-public-defense");
  };
  
  const handleNext = function () {
    navigate("/stage-studies-conclusion");
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
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexDirection: "column",
        p: 2,
        gap: 1,
      }}
    >
      <Typography variant="h4">{getPageRes.title}</Typography>
      <Divider flexItem />
      <StageContent
        data={getPageRes}
        token={userToken}
        trajectory={trajectory}
        putTrajectoryLoading={putTrajectoryLoading}
        putTrajectoryRequest={putTrajectoryRequest}
      />
      <NavigationArrows
        currentPosition={currentStage.position}
        handlePrevious={handlePrevious}
        handleNext={handleNext}
      />
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
    <Box sx={{ width: "100%" }}>
      <LinearProgress />
    </Box>
  );
}

export default StageDegreeCertificates