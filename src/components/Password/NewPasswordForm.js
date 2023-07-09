import React, { useState } from 'react'
import { Typography, TextField, Button } from "@mui/material/";
import useRequest from '../../hooks/useRequest';
import { endpoints } from '../../api/connectionData';
import { useNavigate } from "react-router-dom";
import errorAlert from "../../alerts/errorAlert";

function NewPasswordForm() {

  const [password, SetPassword] = useState("");
  const [passwordError, SetPasswordError] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordVerif, SetPasswordVerif] = useState("");
  const [passwordVerifError, SetPasswordVerifError] = useState("");
  const [validPasswordVerif, setValidPasswordVerif] = useState(false);
  let restoreToken = window.location.pathname.split("/")[2];
  // eslint-disable-next-line no-unused-vars
  const [resNewPassword, loadingNewPassword, sendNewPassword] = useRequest(
    endpoints.NewPasswordPassword,
    "PUT",
    restoreToken,
    handleNewPassword
  );
  const navigate = useNavigate();

  function handleNewPassword(res){
    if(res !== "Algo salió mal"){
      navigate("/");
    }
    else{
      errorAlert(`${res.message}: ${res.body.error}`);
    }
  }

  function handlePassword(event) {
    const value = event.target.value;
    const regex = /^(?!^[0-9]*$)(?!^[a-zA-ZñÑ_]*$)(?=.*[a-zA-Z0-9ñÑ_]).{8,}$/;
    SetPassword(value);
    if (value === "") {
      setValidPassword(false);
      SetPasswordError("Este campo no puede estar vacio");
    } else {
      if (!regex.test(value)) {
        SetPasswordError("Utiliza números, letras y 8 caracteres mínimo");
        setValidPassword(false);
      } else {
        setValidPassword(true);
        SetPasswordError("");
      }
    }
  }

  function handlePasswordVerif(event) {
    const value = event.target.value;
    SetPasswordVerif(value);
    if (value !== password) {
      setValidPasswordVerif(false);
      SetPasswordVerifError("Las contraseñas deben coincidir");
    } else {
      setValidPasswordVerif(true);
      SetPasswordVerifError("");
    }
  }

  const handleSubmit = function () {
    sendNewPassword({password});
    // console.log(password,window.location.pathname.split("/")[2]);
  };

  return (
    <>
      <Typography variant="h5">Nueva contraseña</Typography>
      <TextField
        required
        fullWidth
        id="password"
        label="Contraseña"
        variant="outlined"
        size="small"
        type="password"
        value={password}
        error={!!passwordError}
        helperText={passwordError ? passwordError : ""}
        onChange={handlePassword}
      />
      <TextField
        required
        fullWidth
        id="password_verification"
        label="Repite la contraseña"
        variant="outlined"
        size="small"
        type="password"
        value={passwordVerif}
        error={!!passwordVerifError}
        helperText={passwordVerifError ? passwordVerifError : ""}
        onChange={handlePasswordVerif}
      />
      <Button
        onClick={() => handleSubmit()}
        disabled={!validPassword || !validPasswordVerif || loadingNewPassword === "requesting"}
        variant="contained"
        fullWidth
        sx={{ textTransform: "none" }}
      >
        Restablecer contraseña
      </Button>
    </>
  )
}

export default NewPasswordForm