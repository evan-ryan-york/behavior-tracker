import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Button, Box } from "@mui/material";
import Copyright from "./Copyright";
import { AuthContext } from "../../providers/AuthProvider";
import LoginForm from "./LoginForm";

const LoginContainer = () => {
  const navigate = useNavigate();
  const { currentAuthUser, loading, signInWithGoogle } = useContext(AuthContext);
  console.log(currentAuthUser)

  useEffect(() => {
    if (!loading && currentAuthUser) {
      navigate("/student-dashboard");
    }
  }, [currentAuthUser, navigate, loading]);

  return (
    <Box sx={{ width: "100VW", height: "100VH", backgroundColor: "#111", margin: "0 auto" }}>
      <>
        <Box sx={{ width: 150, margin: "0 auto", pt: "10VH" }}>
          <img width="100%" src="/white_check_hex.png" alt="Behavior Plan Maker Logo" />
        </Box>
        <Typography sx={{ mt: 2, color: "white" }} variant="h2" textAlign={"center"}>
          Behavior Plan Maker
        </Typography>
        <LoginForm />
        <Box sx={{ textAlign: "center" }}>
          <Button
            size="large"
            type="submit"
            color="primary"
            variant="outlined"
            onClick={signInWithGoogle}
            sx={{ mt: 2, padding: 1, fontSize: 16 }}
          >
            Sign In With Google
          </Button>
          <Typography sx={{ mt: 2, color: "white" }} variant="h6">
            Don't have an account?
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => navigate("/setup")}
          >
            Sign Up
          </Button>
        </Box>
        <Box mt={4}>
          <Copyright />
        </Box>
      </>
    </Box>
  );
};

export default LoginContainer;
