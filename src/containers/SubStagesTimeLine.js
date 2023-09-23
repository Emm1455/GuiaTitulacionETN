import Box from "@mui/material/Box";
import DegreeCertificates from "../assets/degree-certificates.svg"
import StudiesConclusion from "../assets/studies-conclusion.svg";
import Timeline from "@mui/lab/Timeline";
import { timelineItemClasses } from "@mui/lab/TimelineItem";
import { useNavigate } from "react-router-dom";
import StageItem from "../components/StageItem";
import TimelineConnector from "@mui/lab/TimelineConnector/TimelineConnector";

function SubStagesTimeLine() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-start",
        flexDirection: "column",
      }}
    >
      <Timeline
        sx={{
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
        }}
      >
        <StageItem
          onNavigate={() => navigate("/stage-degree-certificates")}
          icon={DegreeCertificates}
          label={"Certificado de calificaciones"}
        />
        <TimelineConnector
          sx={{ ml: "1.25rem", height: "16px", backgroundColor: "#555" }}
        />
        <StageItem
          onNavigate={() => navigate("/stage-studies-conclusion")}
          icon={StudiesConclusion}
          label={"Certificado de conclusión de estudios"}
        />
      </Timeline>
    </Box>
  );
}

export default SubStagesTimeLine