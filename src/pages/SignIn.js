import Box from "@mui/material/Box";
import SignInForm from "../containers/SignInForm";

function SignIn() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
      <SignInForm />
    </Box>
  );
}

export default SignIn;
