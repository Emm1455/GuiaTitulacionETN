import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
} from "@mui/material/";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import successAlert from "../alerts/successAlert";
import errorAlert from "../alerts/errorAlert";
import { endpoints } from "../api/connectionData";
import useRequest from "../hooks/useRequest";
import SearchBox from "./SearchBox";

function LoginForm() {
  const [createDisabled, SetCreateDisabled] = useState(true);
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [name, SetName] = useState("");
  const [lastName, SetLastName] = useState("");
  const [mention, SetMention] = useState("");
  const [professor, SetProfessor] = useState("");
  const [projectTitle, SetProjectTitle] = useState("");
  const [tutor, SetTutor] = useState({title: ""});
  const [court1, SetCourt1] = useState({title: ""});
  const [court2, SetCourt2] = useState({title: ""});
  const [passwordError, SetPasswordError] = useState("");
  const [emailError, SetEmailError] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [validEmail, setValidEmail] = useState(false);

  const [getPageRes, getPageLoading, getPageRequest] = useRequest(
    endpoints.professors,
    "GET",
    "",
    () => {}
  );

  const professors = [
    {
      value: 0,
      label: "Jose Campero",
    },
    {
      value: 1,
      label: "Gonzalo Caba",
    },
    {
      value: 2,
      label: "Luis Jurado V.",
    },
    {
      value: 3,
      label: "Jorge León",
    },
    {
      value: 4,
      label: "Jorge Nava",
    },
  ];

  const mentions = [
    {
      value: 0,
      label: "Telecomunicaciones",
    },
    {
      value: 1,
      label: "Sistemas de computación",
    },
    {
      value: 2,
      label: "Control",
    },
  ];

  let courts = [];

  if(getPageLoading === 'requested'){
    courts = getPageRes.map((value) => {
      return {title: value.name, id: value._id}
    });
  }

  const navigate = useNavigate();

  // eslint-disable-next-line no-unused-vars
  const [resSignIn, loadingSignIn, sendReqSignIn] = useRequest(
    endpoints.user,
    "POST",
    "",
    handleSignIn
  );

  function handleSignIn(res) {
    if (res.message === "usuario registrado correctamente") {
      successAlert(`Bienvenido ${res.body.name}`);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      errorAlert(`${res.message}: ${res.body.error}`);
    }
  }

  const handleSubmit = function () {
    const userName = userNameGenerator(name, lastName);
    const data = {
      name: `${name} ${lastName}`,
      username: userName,
      email: email,
      professor: professor,
      tutor: tutor,
      projectTitle: projectTitle,
      mention: mention,
      courts: [court1.title, court2.title],
      password: password,
    };

    sendReqSignIn(data);
  };

  function userNameGenerator(name, lastName) {
    const nameArray = name.split(" ");
    const lastNameArray = lastName.split(" ");
    const nameLetters = nameArray.map((item) => item[0].toLowerCase()).join("");
    return nameLetters + lastNameArray[0].toLowerCase();
  }

  useEffect(() => {
    if (
      name !== "" &&
      lastName !== "" &&
      professor !== "" &&
      mention !== "" &&
      validPassword &&
      validEmail
    )
      SetCreateDisabled(false);
    else SetCreateDisabled(true);
  }, [name, lastName, professor, mention, validPassword, validEmail]);

  useEffect(() => {
    getPageRequest();
  },[]);

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
      <Typography variant="h6" sx={{ alignSelf: "flex-start" }}>
        Datos personales
      </Typography>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          gap: 2,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TextField
          required
          fullWidth
          variant="outlined"
          size="small"
          id="name"
          label="Nombre (s)"
          value={name}
          onChange={(e) => {
            SetName(e.target.value);
          }}
        />
        <TextField
          required
          fullWidth
          variant="outlined"
          size="small"
          id="lastName"
          label="Apellidos"
          value={lastName}
          onChange={(e) => {
            SetLastName(e.target.value);
          }}
        />
      </Box>
      <TextField
        required
        fullWidth
        variant="outlined"
        size="small"
        id="email"
        label="Email"
        value={email}
        error={!!emailError}
        helperText={emailError ? emailError : ""}
        onChange={handleEmail}
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
        error={!!passwordError}
        helperText={passwordError ? passwordError : ""}
        onChange={handlePassword}
      />
      <Typography variant="h6" sx={{ alignSelf: "flex-start" }}>
        Datos académicos
      </Typography>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          gap: 2,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TextField
          required
          select
          fullWidth
          variant="outlined"
          size="small"
          id="professor"
          label="Docente"
          value={professor}
          onChange={(e) => {
            SetProfessor(e.target.value);
          }}
        >
          {professors.map((option) => (
            <MenuItem key={option.value} value={option.label}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          required
          select
          fullWidth
          variant="outlined"
          size="small"
          id="mention"
          label="Mención"
          value={mention}
          onChange={(e) => {
            SetMention(e.target.value);
          }}
        >
          {mentions.map((option) => (
            <MenuItem key={option.value} value={option.label}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <TextField
        multiline
        fullWidth
        variant="outlined"
        size="small"
        id="projectTitle"
        label="Título de proyecto"
        value={projectTitle}
        onChange={(e) => {
          SetProjectTitle(e.target.value);
        }}
      />
      <SearchBox
          value={tutor}
          setValue={SetTutor}
          label={"Tutor"}
          data={courts}
        />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          gap: 2,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <SearchBox
          value={court1}
          setValue={SetCourt1}
          label={"Tribunal 1"}
          data={courts}
        />
        <SearchBox
          value={court2}
          setValue={SetCourt2}
          label={"Tribunal 2"}
          data={courts}
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          onClick={() => navigate("/")}
          variant="contained"
          sx={{ textTransform: "none", width: 150 }}
        >
          Cancelar
        </Button>
        <Button
          disabled={createDisabled || loadingSignIn === "requesting"}
          onClick={() => handleSubmit()}
          variant="contained"
          sx={{ textTransform: "none", width: 150 }}
        >
          Crear cuenta
        </Button>
      </Box>
    </>
  );
}

export default LoginForm;
