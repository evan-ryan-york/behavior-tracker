import { SyntheticEvent, useState } from "react";
import { Paper, Box, TextField, Typography, Button } from "@mui/material";

type Props = {
  setPasswordApproved: (pV: boolean) => void;
};

type FormState = EventTarget & {
  name: string;
  value: string;
};

function PasswordProtections({ setPasswordApproved }: Props) {
  const [text, setText] = useState<string>("");

  const handleSubmit = () => {
    if (text === process.env.REACT_APP_DB_CHANGES_PASSWORD) {
      setPasswordApproved(true);
    }
    setText("");
  };

  const handleChange = (event: SyntheticEvent) => {
    const formState = event.target as FormState;
    setText(formState.value);
  };

  return (
    <Paper sx={{ textAlign: "center", padding: 4, mt: 8 }}>
      <Typography variant="h2">Please Enter the Administrator Password</Typography>
      <Box>
        <TextField
          sx={{ pt: 4, width: "40vw"}}
          type="password"
          onChange={handleChange}
          value={text}
          inputProps={{style: {fontSize: 30}}}
        />
      </Box>
      <Box sx={{ pt: 4, width: "40vw", margin: "0 auto" }}>
        <Button sx={{ fontSize: 24 }} fullWidth variant="outlined" onClick={handleSubmit}>
          Enter
        </Button>
      </Box>
    </Paper>
  );
}

export default PasswordProtections;
