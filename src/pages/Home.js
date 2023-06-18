import Box from "@mui/material/Box";
import ProfileIcon from "../assets/profile.svg";
import ProjectIcon from "../assets/project.svg";
import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";

import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "flex-start",
        flexDirection: "column",
        p: 2,
        gap: 2,
      }}
    >
      <Timeline
        sx={{
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
          gap: 1,
        }}
      >
        <TimelineItem
          onClick={() => navigate("/stage-profile")}
          sx={{ cursor: "pointer" }}
        >
          <TimelineSeparator>
            <TimelineDot variant="outlined" color="success">
              <img
                src={ProfileIcon}
                alt="project icon"
                height="20"
                width="20"
              />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ paddingTop: "1rem" }}>
            Preparación de perfil
          </TimelineContent>
        </TimelineItem>
        <TimelineItem
          onClick={() => navigate("/stage-project")}
          sx={{ cursor: "pointer" }}
        >
          <TimelineSeparator>
            <TimelineDot variant="outlined" color="primary">
              <img
                src={ProjectIcon}
                alt="project icon"
                height="20"
                width="20"
              />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ paddingTop: "1rem" }}>
            Proyecto de grado
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </Box>
  );
}

export default Home;
