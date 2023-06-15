import { Button, IconButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { URI } from "../utils/connectionData";
import { useEffect, useState } from "react";
import StepsList from "../components/StepsList";
import SimpleList from "../components/SimpleList";

function StageProject() {
  const trajectory = JSON.parse(sessionStorage.getItem("project"));
  const userToken = sessionStorage.getItem("token");
  const [data, SetData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [checked, setChecked] = useState(trajectory ? trajectory.steps : []);
  const navigate = useNavigate();

  const handleNext = function () {
    navigate("/stage-project");
  };

  const handlePrevious = function () {
    navigate("/stage-profile");
  };

  async function GetData(url) {
    const response = await fetch(`${url}/stage?name=proyecto_de_grado`);
    const result = await response.json();
    return result;
  }

  async function putData(url = "", data = {}) {
    const response = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json", "x-token": userToken },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  useEffect(() => {
    GetData(URI)
      .then((result) => {
        SetData(result);
        setIsLoading(false);
      })
      .catch((error) => console.log(`error loading data: ${error}`));
  }, []);

  function handleTrajectory() {
    putData(`${URI}/user/trajectory/${trajectory._id}`, {
      steps: checked,
    }).then((result) => {
      setChecked(result.body.steps);
      sessionStorage.setItem("project", JSON.stringify(result.body));
    });
  }

  return isLoading ? (
    <></>
  ) : (
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
      <Typography variant="h4">{data?.title}</Typography>
      <Typography variant="h6">Requisitos</Typography>
      <Typography variant="body2">{data?.requirements}</Typography>
      {userToken ? (
        <StepsList
          data={data?.data}
          checked={checked}
          setChecked={setChecked}
        />
      ) : (
        <SimpleList data={data?.data} />
      )}
      <Button onClick={handleTrajectory}>Registrar avance</Button>
      <Typography variant="body2">{data?.notes[0]}</Typography>
      <Box
        sx={{ display: "flex", width: "100%", justifyContent: "space-between" }}
      >
        <IconButton
          onClick={() => handlePrevious()}
          color="primary"
          aria-label="next"
          component="button"
        >
          <ArrowBackIcon />
        </IconButton>
        <IconButton
          onClick={() => handleNext()}
          color="primary"
          aria-label="next"
          component="button"
        >
          <ArrowForwardIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default StageProject;
