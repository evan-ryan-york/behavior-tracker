import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Paper, Typography, Container, CircularProgress, Avatar, Button, Box } from "@mui/material";
import Copyright from "./Copyright";
import { AuthContext } from "../../providers/AuthProvider";

const LoginContainer = () => {
  const navigate = useNavigate();
  const { currentAuthUser, loading, signInWithGoogle } = useContext(AuthContext);

  useEffect(() => {
    if (!loading && currentAuthUser) {
      navigate("/");
    }
  }, [currentAuthUser, navigate, loading]);

  return (
    <Container component="main" maxWidth="xs" sx={{ minHeight: "100vh", pt: 8 }}>
      {loading ? (
        <div>
          <CircularProgress />
        </div>
      ) : (
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 4,
            textAlign: "center",
          }}
        >
          <Avatar sx={{ width: 200, height: 200 }} src="../TGPicon.png"></Avatar>
          <Typography variant="h4" sx={{ pt: 2 }}>
            Incident Report System
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={signInWithGoogle}
            sx={{ mt: 2 }}
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
