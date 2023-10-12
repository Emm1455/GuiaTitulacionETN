import Box from "@mui/material/Box";
import Timeline from "@mui/lab/Timeline";
import { timelineItemClasses } from "@mui/lab/TimelineItem";
import { useNavigate } from "react-router-dom";
import StageItem from "../components/StageItem";

function SubStagesTimeLine({ items }) {
  const navigate = useNavigate();
  const timeLineItems = items.map((item) => {
    return (
      <StageItem
        key={item.path}
        onNavigate={() => navigate(item.path)}
        icon={item.icon}
        label={item.label}
      />
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
      </Timeline>
    </Box>
  );
}

export default SubStagesTimeLine;
