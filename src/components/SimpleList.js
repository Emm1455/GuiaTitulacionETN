import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

function SimpleList({ data }) {
  const onlyList = data?.map((value) => {
    const labelId = `list-label-${value.number}`;

    return (
      <ListItem key={value.number} disablePadding>
        <ListItemButton
          role={undefined}
          // onClick={() => handleToggle(value.number)}
          dense
          disableGutters
        >
          <ListItemText
            id={labelId}
            primary={`${value.number}. ${value.text}`}
          />
        </ListItemButton>
      </ListItem>
    );
  });

  return (
    <List sx={{ width: "100%", maxWidth: 500, bgcolor: "background.paper" }}>
      {onlyList}
    </List>
  );
}

export default SimpleList;
