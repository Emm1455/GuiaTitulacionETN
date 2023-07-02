import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Header() {
  const userName = sessionStorage.getItem("name");
  const navigate = useNavigate();
  const cerrarSesión = () => {
    sessionStorage.clear();
    navigate("/login");
  };
  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "primary.light",
        justifyContent: "flex-end",
        alignItems: "center",
        color: "primary.contrastText",
        gap: 2,
        p: 1.5,
      }}
    >
      <Button
        onClick={() => navigate("/")}
        sx={{
          textTransform: "none",
          color: "inherit",
        }}
      >
        Home
      </Button>
      {userName ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography variant="body2">{userName}</Typography>
          <Button
            onClick={() => cerrarSesión()}
            sx={{ textTransform: "none", color: "inherit" }}
          >
            (Cerrar Sesión)
          </Button>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
          <Button
            onClick={() => navigate("/login")}
            color="info"
            sx={{
              textTransform: "none",
            }}
            variant="contained"
          >
            Log in
          </Button>
          <Button
            onClick={() => navigate("/sign-in")}
            color="success"
            sx={{
              textTransform: "none",
            }}
            variant="contained"
          >
            Sign in
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default Header;
