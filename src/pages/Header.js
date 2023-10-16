import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MeblasoftIcon from "../assets/meblasoft.svg";

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
        justifyContent: "space-between",
        alignItems: "center",
        color: "primary.contrastText",
        gap: 2,
        p: 1.5,
      }}
    >
      <Button
        href="https://www.facebook.com/profile.php?id=61550931070154"
        sx={{
          display: "flex",
          alignItems: "center",
          ml: 1
        }}
      >
        <img src={MeblasoftIcon} alt="project icon" height="40" width="40" />
      </Button>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          onClick={() => navigate("/")}
          sx={{
            textTransform: "none",
            color: "inherit",
          }}
        >
          Inicio
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
              Ingresar
            </Button>
            <Button
              onClick={() => navigate("/sign-in")}
              color="success"
              sx={{
                textTransform: "none",
              }}
              variant="contained"
            >
              Registrarse
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Header;
