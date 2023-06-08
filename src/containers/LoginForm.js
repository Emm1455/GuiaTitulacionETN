import { Box, Typography, TextField, Button, Link } from "@mui/material/";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import successAlert from "../alerts/successAlert";
import errorAlert from "../alerts/errorAlert";
import { URI } from "../utils/connectionData";

function LoginForm() {
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = function () {
    postData(`${URI}/login`, { email: email, password: password }).then(
      (data) => {
        if (data.message === "Loggeado correctamente") {
          sessionStorage.setItem("name", data.body.name);
          sessionStorage.setItem("token", data.body.token);
          sessionStorage.setItem("rol", data.body.rol);
          sessionStorage.setItem(
            "profile",
            JSON.stringify(data.body.trajectory[0])
          );
          successAlert(`Bienvenido ${data.body.name}`);
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else {
          errorAlert(`${data.message}: ${data.body.error}`);
        }
      }
    );
  };

  async function postData(url = "", data = {}) {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  }

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
