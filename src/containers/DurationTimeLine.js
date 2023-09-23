import React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import { Typography } from "@mui/material";

function DurationTimeLine({ data }) {
  const durationPoints = data?.map((item) => {
    return (
      <>
        <TimelineItem key={item.number}>
          <TimelineOppositeContent color="text.secondary">
            <Typography>{item.number}</Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot
              variant={item.duration > 0 ? "filled" : "outlined"}
              color="primary"
            />
            {item.duration > 0 ? (
              <TimelineConnector sx={{ height: `${8 * item.duration}px` }} />
            ) : (
              <></>
            )}
          </TimelineSeparator>
          <TimelineContent>
            {item.duration > 0
              ? `${item.duration} ${item.duration === 1 ? "día" : "días"}`
              : "variable"}
          </TimelineContent>
        </TimelineItem>
      </>
    );
  });
  return (
    <Timeline
      sx={{
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
        },
        "& .MuiTimelineItem-root": {
          minHeight: "2px",
        },
      }}
    >
      {durationPoints}
    </Timeline>
  );
}

export default DurationTimeLine;
