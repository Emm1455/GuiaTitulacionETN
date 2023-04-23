import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Header() {
  const userName = sessionStorage.getItem("name");
  const navigate = useNavigate();
  const cerrarSesión = () => {
    sessionStorage.setItem("name", "");
    sessionStorage.setItem("token", "");
    sessionStorage.setItem("rol", "");
    navigate("/");
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
        p: 2,
      }}
    >
      <Button
        onClick={() => navigate("/")}
        sx={{ textTransform: "none", color: "inherit" }}
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
        <Button
          onClick={() => navigate("/login")}
          sx={{
            textTransform: "none",
            backgroundColor: "info.main",
          }}
          variant="contained"
        >
          Login
        </Button>
      )}
    </Box>
  );
}

export default Header;
