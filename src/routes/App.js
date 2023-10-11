import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import blue from "@mui/material/colors/blue";
import { Routes, Route } from "react-router-dom";
import Header from "../pages/Header";
import Login from "../pages/Login";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import PageNotFound from "../pages/PageNotFound";
import StageProfile from "../pages/StageProfile";
import StageProject from "../pages/StageProject";
import StagePublicDefense from "../pages/StagePublicDefense";
import StageGraduation from "../pages/StageGraduation";
import StageDegreeCertificates from "../pages/StageDegreeCertificates";
import StageStudiesConclusion from "../pages/StageStudiesConclusion";
import StageSenapi from "../pages/StageSenapi";
import RestorePassword from "../pages/RestorePassword";
import NewPassword from "../pages/NewPassword";

function App() {
  const theme = createTheme({
    palette: {
      // mode: "light",
      primary: {
        main: blue[900],
        contrastText: "#fff",
      },
      secondary: {
        main: "#b71c1c",
      },
    },
    components:{
      
    }
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", flexDirection: "column", flexShrink: 0 }}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/stage-profile" element={<StageProfile />} />
          <Route path="/stage-project" element={<StageProject />} />
          <Route path="/stage-public-defense" element={<StagePublicDefense />} />
          <Route path="/stage-graduation" element={<StageGraduation />} />
          <Route path="/stage-degree-certificates" element={<StageDegreeCertificates />} />
          <Route path="/stage-studies-conclusion" element={<StageStudiesConclusion />} />
          <Route path="/stage-senapi" element={<StageSenapi />} />
          <Route path="/restore-password" element={<RestorePassword />} />
          <Route path="/restore-password/*" element={<NewPassword />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
}

export default App;
