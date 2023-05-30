import {
  Autocomplete,
  Button,
  Container,
  FormControl,
  FormLabel,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { BLANK_ORGANIZATTION_FORM } from "../../libraries/blankForms";
import { STATES } from "../../libraries/objects";
import { useRecoilState, useRecoilValue } from "recoil";
import { loggedInStaffAtom } from "../../recoil/staffAtoms";
import useAddDoc from "../../hooks/useAddDoc";
import useUpdateDoc from "../../hooks/useUpdateDoc";
import { StaffRecord } from "../../types/types";

function validatePhone(phone: string) {
  // Check if the phone number is empty.
  if (phone === "") {
    return false;
  }

  // Check if the phone number is at least 10 digits long.
  if (phone.length < 10) {
    return false;
  }

  // The phone number is valid.
  return true;
}

function ConnectOrganizationForm() {
  const [organizationForm, setOrganizationForm] = useState(BLANK_ORGANIZATTION_FORM);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [loggedInStaff, setLoggedInStaff] = useRecoilState(loggedInStaffAtom);
  const { sendRequest: addDoc } = useAddDoc();
  const { sendRequest: updateDoc } = useUpdateDoc();

  useEffect(() => {
    if (!loggedInStaff) return;
    setOrganizationForm((pV) => ({ ...pV, primaryEmail: loggedInStaff.email }));
  }, [loggedInStaff]);

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setOrganizationForm((pV) => ({ ...pV, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!loggedInStaff) return;
    const organizationId = await addDoc({ col: "organizations", data: organizationForm });
    await updateDoc({
      col: "staff",
      data: { organizationId: organizationId },
      id: loggedInStaff.id,
    });
    setOrganizationForm(BLANK_ORGANIZATTION_FORM);
    setLoggedInStaff((pV) => ({ ...(pV as StaffRecord), organizationId: organizationId }));
  };

  const handleStatesSelect = (event: any, value: any) => {
    setOrganizationForm((pV) => ({ ...pV, states: value }));
  };
  return (
    <>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper sx={{ padding: 2 }}>
          <Typography sx={{ textAlign: "center" }} variant="h4">
            Setup Your Organization
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <FormLabel sx={{ mt: 2 }} id="name-label">
                    Organization's Name
                  </FormLabel>
                  <TextField
                    name="name"
                    type="text"
                    required
                    id="name"
                    autoComplete="name"
                    fullWidth
                    variant="outlined"
                    onChange={handleTextChange}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormLabel sx={{ mt: 2 }} id="description-label">
                    Organization's Mission or Description
                  </FormLabel>
                  <TextField
                    name="description"
                    type="text"
                    required
                    multiline
                    rows={4}
                    id="description"
                    fullWidth
                    variant="outlined"
                    onChange={handleTextChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormLabel sx={{ mt: 2 }} id="phone-label">
                    The Primary Phone Number For Your Organization
                  </FormLabel>
                  <TextField
                    name="primaryPhone"
                    type="tel"
                    required
                    id="tel"
                    error={Boolean(phoneError)}
                    autoComplete="tel"
                    fullWidth
                    variant="outlined"
                    onChange={handleTextChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormLabel sx={{ mt: 2 }} id="email-label">
                    The Primary Email For Your Organization
                  </FormLabel>
                  <TextField
                    name="primaryEmail"
                    type="email"
                    required
                    id="description"
                    value={organizationForm.primaryEmail}
                    autoComplete="email"
                    fullWidth
                    variant="outlined"
                    onChange={handleTextChange}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Autocomplete
                    multiple
                    sx={{ mt: 2 }}
                    options={STATES}
                    onChange={handleStatesSelect}
                    value={organizationForm.states}
                    filterSelectedOptions
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Select States Your Organization Operates In"
                        placeholder="Select States Your Organization Operates In"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" sx={{ mt: 2 }} fullWidth>
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

export default ConnectOrganizationForm;
