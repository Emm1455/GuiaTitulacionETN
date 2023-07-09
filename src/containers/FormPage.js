import React from 'react'
import Box from "@mui/material/Box";

function FormPage({children}) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
        height: "90vh",
      }}
    >
      <Box
      sx={{
        width: 450,
        p: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        border: "solid 1px #d4d4d4",
        borderRadius: "0.5rem",
      }}
    >
      {children}
    </Box>
    </Box>
  )
}

export default FormPage