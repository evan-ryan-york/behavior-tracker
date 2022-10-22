import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { staffResetAtom } from "../../recoil/atoms";
import {
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog,
  TextField,
  Button,
} from "@mui/material";
import useAddDoc from "../../hooks/useAddDoc";

const blankForm = {
  firstName: "",
  lastName: "",
  email: "",
  sections: [],
  items: [],
};

type Props = {
  open: boolean;
  onOpen: (newValue: boolean) => void;
};

type FormState = EventTarget & {
  name: string;
  value: string;
}

//type FormState2 = Partial<BlankFormState>;

const CreateDialog: React.FC<Props> = ({ open, onOpen }) => {
  const [form, setForm] = useState({ ...blankForm });
  const { sendRequest: addDoc } = useAddDoc();
  const setStaffReset = useSetRecoilState(staffResetAtom);

  const handleChange = (event: React.SyntheticEvent) => {
    const formState = event.target as FormState
    setForm((prevValue) => {
      return { ...prevValue, [formState.name]: formState.value };
    });
  };

  const handleClose = () => {
    onOpen(false);
  };

  const handleSave = async () => {
    await addDoc({ col: "staff", data: form });
    setForm(blankForm);
    onOpen(false);
    setStaffReset((pV: boolean) => !pV);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ fontSize: 44 }}>Add New Staff Member</DialogTitle>
      <DialogContent>
        <DialogContentText>First Name:</DialogContentText>
        <TextField
          autoFocus
          name="firstName"
          type="text"
          required
          fullWidth
          value={form.firstName}
          variant="outlined"
          onChange={handleChange}
        />
        <DialogContentText>Last Name:</DialogContentText>
        <TextField
          autoFocus
          name="lastName"
          type="text"
          required
          fullWidth
          value={form.lastName}
          variant="outlined"
          onChange={handleChange}
        />
        <DialogContentText>Email:</DialogContentText>
        <TextField
          autoFocus
          name="email"
          type="email"
          required
          fullWidth
          value={form.email}
          variant="outlined"
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave}>Submit</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(CreateDialog);
