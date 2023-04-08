import { Box, Button, Dialog, DialogContent, DialogTitle, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import useAddDoc from "../../hooks/useAddDoc";
import { selectedStudentAtom } from "../../recoil/studentAtoms";
import { useRecoilValue } from "recoil";

type Props = {
  open: boolean;
  setOpen: (pV: boolean) => void;
};

function makeid() {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < 16) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

function SendLinkDialog({ open, setOpen }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { sendRequest: addDoc } = useAddDoc();
  const selectedStudent = useRecoilValue(selectedStudentAtom);
  const passcode = makeid();

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if (!selectedStudent) return;
    addDoc({
      col: "mail",
      data: {
        to: email,
        message: {
          subject: `Survey Link for ${selectedStudent.firstName}`,
          html: `You have been invited to fill out a behavior survey for ${selectedStudent.firstName} ${selectedStudent.lastName}. To fill the survey out, please click the following link <a href="http://localhost:3000/behavior-survey?studentId=${selectedStudent.id}&passcode=${passcode}">here</a>`,
        },
      },
    });
    addDoc({
      col: "surveyLinks",
      data: {
        email: email,
        studentId: selectedStudent.id,
        compleated: false,
        passcode: passcode,
      },
    });
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    console.log(makeid());
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <Box sx={{ padding: 1 }}>
        <DialogTitle sx={{ fontSize: 44, textAlign: "center" }}>
          Send Behavior Survey Via Email
        </DialogTitle>
      </Box>
      <DialogContent>
        <Box sx={{ padding: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                value={name}
                type="name"
                label="Name"
                fullWidth
                onChange={handleNameChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={email}
                type="email"
                label="Email"
                fullWidth
                onChange={handleEmailChange}
              />
            </Grid>
          </Grid>
          <Button onClick={handleSubmit} sx={{ mt: 2, padding: 2 }} fullWidth variant="contained">
            Submit
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default SendLinkDialog;
