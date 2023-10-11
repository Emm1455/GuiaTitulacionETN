import { Typography, Snackbar, Alert, Divider, Box } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useRequest from "../hooks/useRequest";
import { endpoints } from "../api/connectionData";
import StageContent from "../containers/StageContent";
import NavigationArrows from "../containers/NavigationArrows";
import { stages } from "../constants/constants";
import SubStagesTimeLine from "../containers/SubStagesTimeLine";
import Senapi from "../assets/senapi.svg";

function StageGraduation() {
  const currentStage = stages.graduation;
  const trajectory = JSON.parse(sessionStorage.getItem(currentStage.stage));
  const userToken = sessionStorage.getItem("token");
  const [popUpMessage, setPopUpMessage] = useState(false);
  const navigate = useNavigate();
  const [getPageRes, getPageLoading, getPageRequest] = useRequest(
    endpoints.stageGraduation,
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
    navigate("/stage-profile");
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setPopUpMessage(false);
  };

  const SubStages = [{
    path: "/stage-senapi",
    icon: Senapi,
    label: "Trámite de registro en Senapi"
  }];

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
      <Typography variant="h6">Sub etapas</Typography>
      <SubStagesTimeLine
        items={SubStages}
      />
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

export default StageGraduation