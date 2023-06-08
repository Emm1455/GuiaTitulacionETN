import { IconButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { URI } from "../utils/connectionData";
import { useEffect, useState } from "react";
import StepsList from "../components/StepsList";

function StageProject() {
  const [data, SetData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [checked, setChecked] = useState([0]);
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

  useEffect(() => {
    GetData(URI)
      .then((result) => {
        SetData(result);
        setIsLoading(false);
      })
      .catch((error) => console.log(`error loading data: ${error}`));
  }, []);

  // const draw = data?.data.map((item) => <li key={item._id}>{item.text}</li>);
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
      {/* <Box sx={{ display: "flex", flexDirection: "column" }}>
        <ol>{draw}</ol>
      </Box> */}
      <StepsList data={data?.data} checked={checked} setChecked={setChecked} />
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
