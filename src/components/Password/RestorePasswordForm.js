import React, {useState} from 'react'
import { Typography, TextField, Button } from "@mui/material/";
import useRequest from '../../hooks/useRequest';
import { useNavigate } from "react-router-dom";
import { endpoints } from '../../api/connectionData';
import errorAlert from "../../alerts/errorAlert";

function RestorePasswordForm() {
  const [email, SetEmail] = useState("");
  const [emailError, SetEmailError] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [resRestore, loadingRestore, sendRestore] = useRequest(
    endpoints.restorePassword,
    "POST",
    "",
    handleRestore
  );
  const navigate = useNavigate();

  const handleSubmit = function () {
    sendRestore({email});
    // console.log(email);
  };

  function handleRestore(res){
    if(res !== "Algo salió mal"){
      navigate("/");
    }
    else{
      errorAlert(`${res.message}: ${res.body.error}`);
    }
  }

  function handleEmail(event) {
    const value = event.target.value;
    const regex = /[\w-.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
    SetEmail(value);
    if (value === "") {
      setValidEmail(false);
      SetEmailError("Este campo no puede estar vacio");
    } else {
      if (!regex.test(value)) {
        SetEmailError("Ingresa un email válido");
        setValidEmail(false);
      } else {
        setValidEmail(true);
        SetEmailError("");
      }
    }
  }

  return (
    <>
      <Typography variant="h5">Renueva tu contraseña</Typography>
      <Typography variant="subtitle">Te enviaremos un link de restauración a la cuenta asociada a tu correo electrónico.</Typography>
      <TextField
        required
        fullWidth
        id="email"
        label="Correo electrónico"
        variant="outlined"
        size="small"
        value={email}
        error={!!emailError}
        helperText={emailError ? emailError : ""}
        onChange={handleEmail}
      />
      <Button
        onClick={() => handleSubmit()}
        disabled={!validEmail || loadingRestore === "requesting"}
        variant="contained"
        fullWidth
        sx={{ textTransform: "none" }}
      >
        Enviar
      </Button>
    </>
  )
}

export default RestorePasswordForm