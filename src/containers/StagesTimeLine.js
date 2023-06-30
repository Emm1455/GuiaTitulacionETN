import Box from "@mui/material/Box";
import ProfileIcon from "../assets/profile.svg";
import ProjectIcon from "../assets/project.svg";
import Timeline from "@mui/lab/Timeline";
import { timelineItemClasses } from "@mui/lab/TimelineItem";
import { useNavigate } from "react-router-dom";
import StageItem from "../components/StageItem";
import TimelineConnector from "@mui/lab/TimelineConnector/TimelineConnector";

function StagesTimeLine() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-start",
        flexDirection: "column",
        p: 2,
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
          onNavigate={() => navigate("/stage-profile")}
          icon={ProfileIcon}
          label={"Preparación de perfil"}
        />
        <TimelineConnector
          sx={{ ml: "1.25rem", height: "16px", backgroundColor: "#555" }}
        />
        <StageItem
          onNavigate={() => navigate("/stage-project")}
          icon={ProjectIcon}
          label={"Proyecto de grado"}
        />
      </Timeline>
    </Box>
  );
}

export default StagesTimeLine;
