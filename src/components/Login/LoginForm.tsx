import {
  Alert,
  Button,
  Container,
  FormControl,
  FormLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { emailSignIn, loginError } = useContext(AuthContext);

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    emailSignIn({ email, password });
  };
  return (
    <>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Paper sx={{ padding: 2 }}>
          <Typography sx={{ textAlign: "center" }} variant="h4">
            Sign In
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth>
              <FormLabel sx={{ mt: 2 }} id="email-label">
                Your Email Name
              </FormLabel>
              <TextField
                name="email"
                required
                id="email"
                type="email"
                autoComplete="email"
                fullWidth
                variant="outlined"
                onChange={handleEmailChange}
              />
              <FormLabel sx={{ mt: 2 }} id="email-label">
                Your Password
              </FormLabel>
              <TextField
                name="password"
                autoComplete="password"
                required
                id="password"
                type="password"
                fullWidth
                variant="outlined"
                onChange={handlePasswordChange}
              />
              {loginError && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {loginError}
                </Alert>
              )}

              <Button type="submit" variant="contained" sx={{ mt: 2 }} fullWidth>
                Submit
              </Button>
            </FormControl>
          </form>
        </Paper>
      </Container>
    </>
  );
}

export default LoginForm;
