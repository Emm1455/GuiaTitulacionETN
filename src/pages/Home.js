import { useState } from "react";
import Box from "@mui/material/Box";
import { Fab } from "@mui/material";
import ReviewsIcon from "@mui/icons-material/Reviews";
import StagesTimeLine from "../containers/StagesTimeLine";
import SuggestionsDialog from "../components/SuggestionsDialog";
import useRequest from "../hooks/useRequest";
import { endpoints } from "../api/connectionData";
import errorAlert from "../alerts/errorAlert";

function Home() {
  const userToken = sessionStorage.getItem("token");
  const [dialogState, setDialogState] = useState(false);
  const [suggestion, setSuggestion] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [resSug, loadingSug, sendSug] = useRequest(
    endpoints.suggestions,
    "POST",
    true,
    handleSug
  );
  const handleClickOpen = () => {
    setDialogState(true);
  };
  const handleClose = () => {
    setDialogState(false);
    setSuggestion("");
  };

  const handleSubmit = (suggestion) => {
    sendSug({ suggestion });
  };

  function handleSug(res) {
    if (res.message === "Sugerencia guardada correctamente") {
      setDialogState(false);
      setSuggestion("");
    } else {
      errorAlert(`${res.message}: ${res.body.error}`);
    }
  }

  return (
    <Box sx={{ display: "flex", flex: 1 }}>
      <StagesTimeLine />
      {/* TO-DO: Add summary section
      <Box
        sx={{
          display: "flex",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">Under construction</Typography>
      </Box> */}
      {userToken ? (
        <>
          <Fab
            size="medium"
            color="primary"
            aria-label="suggestions"
            variant="extended"
            onClick={handleClickOpen}
            sx={{
              textTransform: "none",
              position: "absolute",
              bottom: "1rem",
              right: "1rem",
            }}
          >
            <ReviewsIcon sx={{ mr: 1 }} />
            Sugerencias
          </Fab>
          <SuggestionsDialog
            open={dialogState}
            handleClose={handleClose}
            handleSubmit={handleSubmit}
            suggestion={suggestion}
            setSuggestion={setSuggestion}
          />
        </>
      ) : (
        <></>
      )}
    </Box>
  );
}

export default Home;
