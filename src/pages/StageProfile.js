import { IconButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";

function StageProfile() {
  const handleNext = function () {
    navigate("/stage-project");
  };

  const navigate = useNavigate();
  const data = {
    title: "Preparación de perfil",
    requirements: "Haber aprobado 40 materias de carrera ~ 8vo semestre",
    name: "profile",
    notes: [
      "A partir del momento de registro del perfil se tienen 4 semestres para terminar el proyecto de grado, posterior a eso se debe elegir otro tema y reiniciar el trámite.",
    ],
    data: [
      {
        type: "Academic",
        text: "Inscripción en la materia",
        content: [
          "Ingresar al sistema académico",
          "Elegir la opción de inscripción",
          "Ingresar nombre de tutor y ...",
        ],
        place: "http://sisacademico.umsa.edu.bo/mi/",
        duration: "2 a 5 días",
        number: "1",
        _id: 10,
      },
      {
        type: "Paperwork",
        text: "Preparar perfil de proyecto de grado con guía del tutor",
        content: [],
        place: "Kardex",
        duration: "2 a 5 días",
        number: "2",
        _id: 11,
      },
    ],
  };

  const draw = data.data.map((item) => <li key={item._id}>{item.text}</li>);
  return (
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
      <Typography variant="h4">{data.title}</Typography>
      <Typography variant="h6">Requisitos</Typography>
      <Typography variant="body2">{data.requirements}</Typography>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <ol>{draw}</ol>
      </Box>
      <Typography variant="body2">{data.notes[0]}</Typography>
      <IconButton
        onClick={() => handleNext()}
        color="primary"
        aria-label="next"
        component="button"
      >
        <ArrowForwardIcon />
      </IconButton>
    </Box>
  );
}

export default StageProfile;
