import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Checkbox } from "@mui/material";

function StepsList({ data, checked, setChecked }) {
  // const [checked, setChecked] = useState([0]);

  const handleToggle = (value) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const listItems = data?.map((value) => {
    const labelId = `checkbox-list-label-${value.number}`;

    return (
      <ListItem key={value.number} disablePadding>
        <ListItemButton
          role={undefined}
          onClick={() => handleToggle(value.number)}
          dense
          disableGutters
        >
          <Checkbox
            checked={checked.indexOf(value?.number) !== -1}
            tabIndex={-1}
            disableRipple
            size="small"
            inputProps={{ "aria-labelledby": labelId }}
          />
          <ListItemText id={labelId} primary={value.text} />
        </ListItemButton>
      </ListItem>
    );
  });

  return (
    <List sx={{ width: "100%", maxWidth: 500, bgcolor: "background.paper" }}>
      {listItems}
    </List>
  );
}

export default StepsList;
