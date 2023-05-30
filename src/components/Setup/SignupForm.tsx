import {
  Alert,
  Button,
  Container,
  FormControl,
  FormLabel,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import useAddDoc from "../../hooks/useAddDoc";
import { useRecoilState } from "recoil";
import { signupFormAtom } from "../../recoil/signupAtoms";
import { validatePassword } from "../../libraries/functions";
import { AuthContext } from "../../providers/AuthProvider";

type Plan = "individual" | "organization" | null;

type Props = {
  selectedPlan: Plan;
};

function SignupForm({ selectedPlan }: Props) {
  const { sendRequest: addDoc } = useAddDoc();
  const [signupForm, setSignupForm] = useRecoilState(signupFormAtom);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
  const { createUser } = useContext(AuthContext);

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSignupForm((pV) => ({ ...pV, [event.target.name]: event.target.value }));
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    const valid = validatePassword(event.target.value);
    if (!valid) {
      setPasswordError(
        "Password must contain at least one number, one uppercase letter, one lowercase letter, and be at least 8 characters long."
      );
    } else {
      setPasswordError(null);
    }
  };

  const handleConfirmPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value !== password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError(null);
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!selectedPlan) return;
    addDoc({ col: "staff", data: { ...signupForm, accountType: selectedPlan } });
    createUser({ email: signupForm.email, password: password });
  };
  return (
    <>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper sx={{ padding: 2 }}>
          <Typography sx={{ textAlign: "center" }} variant="h4">
            Create Your Accont
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormLabel sx={{ mt: 2 }} id="first-name-label">
                    Your First Name
                  </FormLabel>
                  <TextField
                    name="firstName"
                    type="text"
                    required
                    id="first-name"
                    autoComplete="given-name"
                    fullWidth
                    variant="outlined"
                    onChange={handleTextChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormLabel sx={{ mt: 2 }} id="last-name-label">
                    Your Last Name
                  </FormLabel>
                  <TextField
                    name="lastName"
                    type="text"
                    required
                    id="last-name"
                    autoComplete="family-name"
                    fullWidth
                    variant="outlined"
                    onChange={handleTextChange}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
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
                    onChange={handleTextChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormLabel sx={{ mt: 2 }} id="email-label">
                    Create a Secure Password
                  </FormLabel>
                  <TextField
                    name="password"
                    autoComplete="new-password"
                    required
                    id="password"
                    type="password"
                    fullWidth
                    variant="outlined"
                    onChange={handlePasswordChange}
                  />
                  {passwordError && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                      {passwordError}
                    </Alert>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormLabel sx={{ mt: 2 }} id="email-label">
                    Confirm Your Secure Password
                  </FormLabel>
                  <TextField
                    name="confirmPassword"
                    required
                    id="confirmPassword"
                    autoComplete="new-password"
                    type="password"
                    fullWidth
                    variant="outlined"
                    onChange={handleConfirmPasswordChange}
                  />
                  {confirmPasswordError && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                      {confirmPasswordError}
                    </Alert>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Button
                    disabled={Boolean(passwordError) || Boolean(confirmPasswordError)}
                    type="submit"
                    variant="contained"
                    sx={{ mt: 2 }}
                    fullWidth
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </FormControl>
          </form>
        </Paper>
      </Container>
    </>
  );
}

export default SignupForm;
