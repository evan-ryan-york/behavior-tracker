import { SyntheticEvent } from "react";
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  Box,
} from "@mui/material";
import useUpdateDoc from "../../hooks/useUpdateDoc";
import useAddDoc from "../../hooks/useAddDoc";
import { BLANK_PERIOD_FORM } from "../../libraries/blankForms";
import DialogTitle from "@mui/material/DialogTitle";
import { loggedInStaffAtom } from "../../recoil/staffAtoms";
import { periodFormAtom, periodsResetAtom } from "../../recoil/periodsAtoms";
import SetPeriodSites from "./SetPeriodSites";

type Props = {
  open: boolean;
  setOpen: (value: boolean | ((pV: boolean) => boolean)) => void;
};

type FormState = EventTarget & {
  name: string;
  value: string;
  checked: string;
};

export default function ManagePeriod({ open, setOpen }: Props) {
  const loggedInStaff = useRecoilValue(loggedInStaffAtom);
  const { sendRequest: updateDoc } = useUpdateDoc();
  const { sendRequest: addDoc } = useAddDoc();
  const [periodForm, setPeriodForm] = useRecoilState(periodFormAtom);
  const setPeriodsReset = useSetRecoilState(periodsResetAtom);

  const handleChange = (event: SyntheticEvent) => {
    const formState = event.target as FormState;
    setPeriodForm((pV) => {
      return { ...pV, [formState.name]: formState.value };
    });
  };

  const handleClose = () => {
    setOpen(false);
    setPeriodForm(BLANK_PERIOD_FORM);
  };

  const handleSave = async () => {
    if (!loggedInStaff) return;
    const formToSubmit = { ...periodForm, organizationId: loggedInStaff.organizationId };
    if ("id" in formToSubmit) {
      await updateDoc({ col: "periods", data: formToSubmit, id: formToSubmit.id });
    } else {
      await addDoc({ col: "periods", data: formToSubmit });
    }
    handleClose();
    setPeriodForm(BLANK_PERIOD_FORM);
    setPeriodsReset((pV) => !pV);
  };

  return (
    <>
      {periodForm && (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
          <DialogTitle sx={{ fontSize: 44, textAlign: "center" }}>{`${
            "id" in periodForm ? "Edit" : "New"
          } Group`}</DialogTitle>
          <DialogContent>
            <Typography sx={{ mb: 1 }}>Group Name</Typography>
            <TextField fullWidth name="name" value={periodForm.name} onChange={handleChange} />
            <Box>
              <Typography sx={{ mb: 1, mt: 2 }}>Select Site for Period</Typography>
              <SetPeriodSites />
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
