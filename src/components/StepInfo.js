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

function StepInfo({ title, type, steps, areThereSteps }) {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <Card elevation={0}>
      <CardHeader
        title={<Typography variant="body2">{title}</Typography>}
        subheader={<Chip label={type} size="small" />}
        action={
          areThereSteps ? (
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
          <Typography sx={{ fontWeight: 600 }} variant="body2">
            Pasos:
          </Typography>
          {steps?.map((item) => (
            <Typography variant="body2" key={item}>
              - {item}
            </Typography>
          ))}
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default StepInfo;
