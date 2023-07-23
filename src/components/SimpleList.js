import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

function SimpleList({ data }) {
  const onlyList = data?.map((value) => {
    const labelId = `list-label-${value.number}`;

    return (
      <ListItem key={value.number} disablePadding>
          <ListItemText
            id={labelId}
            primary={`${value.number}. ${value.text}`}
            primaryTypographyProps={{fontSize:"0.875rem", pt:0.5, pb:0.5}}
          />
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
