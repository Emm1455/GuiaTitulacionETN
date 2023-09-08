import React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import { Typography } from "@mui/material";

function DurationTimeLine({ data }) {
  const durationPoints = data?.map((item) => {
    return (
      <TimelineItem key={item.number}>
        <TimelineOppositeContent color="text.secondary">
          <Typography color="text.secondary">{item.number}</Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot
            variant={item.duration > 0 ? "filled" : "outlined"}
            color="primary"
          />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>{item.duration} días</TimelineContent>
      </TimelineItem>
    );
  });
  return <Timeline>{durationPoints}</Timeline>;
}

export default DurationTimeLine;
