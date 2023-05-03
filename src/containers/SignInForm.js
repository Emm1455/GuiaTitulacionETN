import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Divider,
} from "@mui/material/";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import successAlert from "../alerts/successAlert";
import errorAlert from "../alerts/errorAlert";
import { URI } from "../utils/connectionData";

function LoginForm() {
  const [createDisabled, SetCreateDisabled] = useState(true);
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [name, SetName] = useState("");
  const [lastName, SetLastName] = useState("");
  const [mention, SetMention] = useState("");
  const [professor, SetProfessor] = useState("");
  const [projectTitle, SetProjectTitle] = useState("");
  const [tutor, SetTutor] = useState("");
  const [court, SetCourt] = useState(["", ""]);
  const [passwordError, SetPasswordError] = useState("");
  const [emailError, SetEmailError] = useState("");

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

  const courts = [
    {
      value: 0,
      label: "Jorge León Gomez",
    },
    {
      value: 1,
      label: "Juan Aguilera Rios",
    },
    {
      value: 2,
      label: "Balderrama",
    },
    {
      value: 3,
      label: "Quiroga",
    },
  ];

  const navigate = useNavigate();

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
      courts: court,
      password: password,
    };

    postData(`${URI}/user`, { data }).then((data) => {
      console.log(data);
      if (data.message === "usuario registrado correctamente") {
        successAlert(`Bienvenido ${data.body.name}`);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        errorAlert(`${data.message}: ${data.body.error}`);
      }
    });
  };

  async function postData(url = "", data = {}) {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  function userNameGenerator(name, lastName) {
    const nameArray = name.split(" ");
    const lastNameArray = lastName.split(" ");
    const nameLetters = nameArray.map((item) => item[0].toLowerCase()).join("");
    return nameLetters + lastNameArray[0].toLowerCase();
  }

  function handleCourt(value, option) {
    SetCourt(
      court.map((item, index) => (index === option ? (item = value) : item))
    );
  }

  useEffect(() => {
    if (name !== "" && lastName !== "" && professor !== "" && mention !== "")
      SetCreateDisabled(false);
    else SetCreateDisabled(true);
  }, [name, lastName, professor, mention]);

  function handlePassword(event) {
    const value = event.target.value;
    const regex = /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{8,})$/;
    SetPassword(value);
    if (value === "") {
      SetCreateDisabled(true);
      SetPasswordError("Este campo no puede estar vacio");
    } else {
      if (!regex.test(value)) {
        SetPasswordError("Utiliza números, letras y 8 caracteres mínimo");
        SetCreateDisabled(true);
      } else {
        SetCreateDisabled(false);
        SetPasswordError("");
      }
    }
  }

  function handleEmail(event) {
    const value = event.target.value;
    const regex = /[\w-.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
    SetEmail(value);
    if (value === "") {
      SetCreateDisabled(true);
      SetEmailError("Este campo no puede estar vacio");
    } else {
      if (!regex.test(value)) {
        SetEmailError("Ingresa un email válido");
        SetCreateDisabled(true);
      } else {
        SetCreateDisabled(false);
        SetEmailError("");
      }
    }
  }

  return (
    <Box
      component="form"
      sx={{
        width: 450,
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        justifyContent: "flex-start",
        alignItems: "center",
        border: "1px #d4d4d4 solid",
      }}
    >
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
      <Divider variant="middle" />
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
      <TextField
        fullWidth
        variant="outlined"
        size="small"
        id="tutor"
        label="Tutor"
        value={tutor}
        onChange={(e) => {
          SetTutor(e.target.value);
        }}
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
        <TextField
          select
          fullWidth
          variant="outlined"
          size="small"
          id="court1"
          label="Tribunal 1"
          value={court[0]}
          onChange={(e) => {
            handleCourt(e.target.value, 0);
          }}
        >
          {courts.map((option) => (
            <MenuItem key={option.value} value={option.label}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          fullWidth
          variant="outlined"
          size="small"
          id="court2"
          label="Tribunal 2"
          value={court[1]}
          onChange={(e) => {
            handleCourt(e.target.value, 1);
          }}
        >
          {courts.map((option) => (
            <MenuItem key={option.value} value={option.label}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
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
          disabled={createDisabled}
          onClick={() => handleSubmit()}
          variant="contained"
          sx={{ textTransform: "none", width: 150 }}
        >
          Crear cuenta
        </Button>
      </Box>
    </Box>
  );
}

export default LoginForm;
