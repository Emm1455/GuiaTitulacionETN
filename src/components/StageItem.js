import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";

function StageItem({ onNavigate, icon, label }) {
  return (
    <TimelineItem onClick={onNavigate} sx={{ cursor: "pointer" }}>
      <TimelineSeparator>
        <TimelineDot variant="outlined" sx={{ borderColor: "#FFF" }}>
          <img src={icon} alt="project icon" height="32" width="32" />
        </TimelineDot>
      </TimelineSeparator>
      <TimelineContent sx={{ paddingTop: "1rem" }}>{label}</TimelineContent>
    </TimelineItem>
  );
}

export default StageItem;
