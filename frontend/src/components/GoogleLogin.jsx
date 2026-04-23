import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import { useEffect } from "react";
import axios from "axios";

function GLogin() {
  async function googleAuth() {
    window.open("http://localhost:3000/auth/google", "_self");
  }
  return (
    <Button
      variant="contained"
      startIcon={<GoogleIcon />}
      sx={{
        width: 400,
        backgroundColor: "#4285F4", // Google blue
        color: "#fff",
        "&:hover": {
          backgroundColor: "#357ae8",
          width: 405,
        },
      }}
      onClick={googleAuth}
    >
      Sign in with Google
    </Button>
  );
}

export default GLogin;
