import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Typography,
  IconButton,
  Chip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Place from "./Steps/Place";
import Information from "./Steps/Information";

function StepInfo({ title, type, steps, place }) {
  const [expanded, setExpanded] = React.useState(false);
  // Object literal use
  const chipColors = {
    Académico: "primary.light",
    Compra: "success.light",
    Trámite: "warning.light",
    Personal: "error.light",
  };
  return (
    <Card elevation={0}>
      <CardHeader
        title={<Typography variant="body2">{title}</Typography>}
        subheader={
          <Chip
            sx={{ backgroundColor: chipColors[type] }}
            label={type}
            size="small"
          />
        }
        action={
          steps.length > 0 || place !== "none" ? (
            <IconButton
              aria-label="Show more"
              onClick={() => setExpanded(!expanded)}
            >
              <ExpandMoreIcon />
            </IconButton>
          ) : (
            <></>
          )
        }
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ ml: 2 }}>
          {steps.length > 0 ? <Information steps={steps} /> : <></>}
          {place !== "none" ? <Place place={place} /> : <></>}
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default StepInfo;
