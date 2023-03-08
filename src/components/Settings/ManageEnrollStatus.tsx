import { SyntheticEvent } from "react";
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";
import { enrollStatusesResetAtom, enrollStatusFormAtom } from "../../recoil/enrollStatusAtoms";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  FormControlLabel,
  Switch,
  Box,
} from "@mui/material";
import useUpdateDoc from "../../hooks/useUpdateDoc";
import useAddDoc from "../../hooks/useAddDoc";
import { BLANK_ENROLL_STATUS_FORM } from "../../libraries/blankForms";
import DialogTitle from "@mui/material/DialogTitle";
import { loggedInStaffAtom } from "../../recoil/staffAtoms";

type Props = {
  open: boolean;
  setOpen: (value: boolean | ((pV: boolean) => boolean)) => void;
};

type FormState = EventTarget & {
  name: string;
  value: string;
  checked: string;
};

export default function ManageEnrollStatus({ open, setOpen }: Props) {
  const loggedInStaff = useRecoilValue(loggedInStaffAtom);
  const { sendRequest: updateDoc } = useUpdateDoc();
  const { sendRequest: addDoc } = useAddDoc();
  const [enrollStatusForm, setEnrollStatusForm] = useRecoilState(enrollStatusFormAtom);
  const setEnrollStatusesReset = useSetRecoilState(enrollStatusesResetAtom);

  const handleTextChange = (event: SyntheticEvent) => {
    const formState = event.target as FormState;
    setEnrollStatusForm((pV) => {
      return { ...pV, [formState.name]: formState.value };
    });
  };

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnrollStatusForm((pV) => ({ ...pV, showByDefault: event.target.checked }));
  };

  const handleClose = () => {
    setOpen(false);
    setEnrollStatusForm(BLANK_ENROLL_STATUS_FORM);
  };

  const handleSave = async () => {
    if (!loggedInStaff) return;
    const formToSubmit = { ...enrollStatusForm, organizationId: loggedInStaff.organizationId };
    if ("id" in formToSubmit) {
      await updateDoc({ col: "enrollStatuses", data: formToSubmit, id: formToSubmit.id });
    } else {
      await addDoc({ col: "enrollStatuses", data: formToSubmit });
    }
    handleClose();
    setEnrollStatusForm(BLANK_ENROLL_STATUS_FORM);
    setEnrollStatusesReset((pV) => !pV);
  };

  return (
    <>
      {enrollStatusForm && (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
          <DialogTitle sx={{ fontSize: 44, textAlign: "center" }}>{`${
            "id" in enrollStatusForm ? "Edit" : "New"
          } Enrollment Status`}</DialogTitle>
          <DialogContent>
            <Typography sx={{ mb: 1 }}>Enroll Status Name</Typography>
            <TextField fullWidth name="name" value={enrollStatusForm.name} onChange={handleTextChange} />
            <Box sx={{ mt: 2 }}>
              <FormControlLabel
                control={
                  <Switch onChange={handleSwitchChange} checked={enrollStatusForm.showByDefault} />
                }
                label="Show By Default?"
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSave}>Save</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
