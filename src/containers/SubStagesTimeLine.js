import Box from "@mui/material/Box";
// import DegreeCertificates from "../assets/degree-certificates.svg"
// import StudiesConclusion from "../assets/studies-conclusion.svg";
import Timeline from "@mui/lab/Timeline";
import { timelineItemClasses } from "@mui/lab/TimelineItem";
import { useNavigate } from "react-router-dom";
import StageItem from "../components/StageItem";
// import TimelineConnector from "@mui/lab/TimelineConnector/TimelineConnector";

function SubStagesTimeLine({ items }) {
  const navigate = useNavigate();
  const timeLineItems = items.map((item) => {
    return (
      // <Box key={item.path}>
        <StageItem
          key={item.path}
          onNavigate={() => navigate(item.path)}
          icon={item.icon}
          label={item.label}
        />
        /* <TimelineConnector
          sx={{ ml: "1.25rem", height: "16px", backgroundColor: "#555" }}
        />
      </Box> */
    );
  });
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
        {timeLineItems}
        {/* <StageItem
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
        /> */}
      </Timeline>
    </Box>
  );
}

export default SubStagesTimeLine;
