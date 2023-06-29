import { Box, Typography, TextField, Button, Link } from "@mui/material/";
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
    false,
    handleLogin
  );

  function handleLogin(res) {
    if (res.message === "Loggeado correctamente") {
      sessionStorage.setItem("name", res.body.name);
      sessionStorage.setItem("token", res.body.token);
      sessionStorage.setItem("rol", res.body.rol);
      sessionStorage.setItem("profile", JSON.stringify(res.body.trajectory[0]));
      sessionStorage.setItem("project", JSON.stringify(res.body.trajectory[1]));
      navigate("/");
    } else {
      errorAlert(`${res.message}: ${res.body.error}`);
    }
  }

  const handleSubmit = function () {
    sendReqLogin({ email: email, password: password });
  };

  return (
    <Box
      sx={{
        width: 450,
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h4">Login</Typography>
      <TextField
        required
        fullWidth
        id="email"
        label="Email"
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
        label="Password"
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
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          onClick={() => handleSubmit()}
          disabled={loadingLogin === "requesting"}
          variant="contained"
          sx={{ textTransform: "none", width: 150 }}
        >
          Sign in
        </Button>
        <Typography variant="body2">
          No tienes una cuenta?{" "}
          <Link href="/sign-in" underline="hover">
            Registrate
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default LoginForm;
