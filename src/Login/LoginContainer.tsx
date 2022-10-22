import React, { useEffect, FC } from "react";
import { useNavigate } from "react-router-dom";
import { Paper, Typography, Container, CircularProgress, Avatar, Button, Box } from "@mui/material";
import Copyright from "./Copyright";
import { useAuth } from "../hooks/useAuth";

const LoginContainer: FC = () => {
  const navigate = useNavigate();
  const { currentAuthUser, isLoading, signInWithGoogle } = useAuth();

  useEffect(() => {
    if (!isLoading && currentAuthUser) {
      navigate("/");
    }
  }, [currentAuthUser, navigate, isLoading]);

  return (
    <Container component="main" maxWidth="xs" sx={{ height: "100vh" }}>
      {isLoading ? (
        <div>
          <CircularProgress />
        </div>
      ) : (
        <Paper
          sx={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "8em" }}
        >
          <Avatar sx={{ width: 200, height: 200 }} src="../TGPicon.png"></Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={signInWithGoogle}
            sx={{ marginTop: "2em" }}
          >
            Sign In With Google
          </Button>
        </Paper>
      )}
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default LoginContainer;
