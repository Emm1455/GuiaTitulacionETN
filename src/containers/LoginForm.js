import { Box, Typography, TextField, Button, Link, Divider } from "@mui/material/";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import errorAlert from "../alerts/errorAlert";
import { endpoints } from "../api/connectionData";
import useRequest from "../hooks/useRequest";

function LoginForm() {
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [resLogin, loadingLogin, sendReqLogin] = useRequest(
    endpoints.login,
    "POST",
    "",
    handleLogin
  );

  function handleLogin(res) {
    if (res.message === "Loggeado correctamente") {
      sessionStorage.setItem("name", res.body.name);
      sessionStorage.setItem("token", res.body.token);
      sessionStorage.setItem("rol", res.body.rol);
      sessionStorage.setItem("profile", JSON.stringify(res.body.trajectory[0]));
      sessionStorage.setItem("project", JSON.stringify(res.body.trajectory[1]));
      sessionStorage.setItem("publicDefense", JSON.stringify(res.body.trajectory[4]));
      sessionStorage.setItem("graduation", JSON.stringify(res.body.trajectory[6]));
      navigate("/");
    } else {
      errorAlert(`${res.message}: ${res.body.error}`);
    }
  }

  const handleSubmit = function () {
    sendReqLogin({ email: email, password: password });
  };

  return (
    <
    >
      <Typography variant="h4">Guía de titulación</Typography>
      <TextField
        required
        fullWidth
        id="email"
        label="Correo electrónico"
        variant="outlined"
        size="small"
        value={email}
        onChange={(e) => {
          SetEmail(e.target.value);
        }}
      />
      <TextField
        required
        fullWidth
        id="password"
        label="Contraseña"
        variant="outlined"
        size="small"
        type="password"
        value={password}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSubmit();
        }}
        onChange={(e) => {
          SetPassword(e.target.value);
        }}
      />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection:"column",
          alignItems:"center",
          gap:2
        }}
      >
        <Button
          onClick={() => handleSubmit()}
          disabled={loadingLogin === "requesting"}
          variant="contained"
          fullWidth
          sx={{ textTransform: "none" }}
        >
          Iniciar sesión
        </Button>
        <Button
          onClick={() => navigate("/restore-password")}
          disabled={loadingLogin === "requesting"}
          variant="text"
          fullWidth
          disableRipple
          sx={{ textTransform: "none" }}
        >
          Olvidaste tu contraseña?
        </Button>
        <Divider flexItem>o</Divider>
        <Typography variant="body2">
          No tienes una cuenta?{" "}
          <Link href="/sign-in" underline="hover">
            Registrate aquí
          </Link>
        </Typography>
      </Box>
    </>
  );
}

export default LoginForm;
