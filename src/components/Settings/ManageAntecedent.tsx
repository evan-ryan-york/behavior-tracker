import { SyntheticEvent } from "react";
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";
import { antecedentFormAtom, antecedentsResetAtom } from "../../recoil/antecedentsAtoms";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import useUpdateDoc from "../../hooks/useUpdateDoc";
import useAddDoc from "../../hooks/useAddDoc";
import { BLANK_ANTECEDENT_FORM } from "../../libraries/blankForms";
import DialogTitle from "@mui/material/DialogTitle";
import { loggedInStaffAtom } from "../../recoil/staffAtoms";
import { FUNCTIONS_OF_BEHAVIOR } from "../../libraries/objects";

type Props = {
  open: boolean;
  setOpen: (value: boolean | ((pV: boolean) => boolean)) => void;
};

type FormState = EventTarget & {
  name: string;
  value: string;
  checked: string;
};

export default function ManageAntecedent({ open, setOpen }: Props) {
  const { sendRequest: updateDoc } = useUpdateDoc();
  const { sendRequest: addDoc } = useAddDoc();
  const [antecedentForm, setAntecedentForm] = useRecoilState(antecedentFormAtom);
  const setAntecedentsReset = useSetRecoilState(antecedentsResetAtom);
  const loggedInStaff = useRecoilValue(loggedInStaffAtom);

  const handleChange = (event: SyntheticEvent) => {
    const formState = event.target as FormState;
    setAntecedentForm((pV) => {
      return { ...pV, [formState.name]: formState.value };
    });
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    setAntecedentForm((pV) => ({ ...pV, [event.target.name]: event.target.value }));
  };

  const handleClose = () => {
    setOpen(false);
    setAntecedentForm(BLANK_ANTECEDENT_FORM);
  };

  const handleSave = async () => {
    if (!loggedInStaff) return;
    const formToSubmit = { ...antecedentForm, organizationId: loggedInStaff.organizationId };
    if ("id" in antecedentForm) {
      await updateDoc({ col: "antecedents", data: formToSubmit, id: antecedentForm.id });
    } else {
      await addDoc({ col: "antecedents", data: formToSubmit });
    }
    handleClose();
    setAntecedentForm(BLANK_ANTECEDENT_FORM);
    setAntecedentsReset((pV) => !pV);
  };

  return (
    <>
      {antecedentForm && (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
          <DialogTitle sx={{ fontSize: 44, textAlign: "center" }}>{`${
            "id" in antecedentForm ? "Edit" : "New"
          } Antecedent`}</DialogTitle>
          <DialogContent>
            <Typography sx={{ mb: 1 }}>Label</Typography>
            <TextField
              fullWidth
              name="label"
              value={antecedentForm.label}
              onChange={handleChange}
            />
            <Typography sx={{ mb: 1, mt: 2 }}>Function of Behavior</Typography>
            <Select
              name="functionOfBehavior"
              onChange={handleSelectChange}
              value={antecedentForm.functionOfBehavior}
              fullWidth
            >
              <MenuItem value={FUNCTIONS_OF_BEHAVIOR.ACCESS}>
                {FUNCTIONS_OF_BEHAVIOR.ACCESS}
              </MenuItem>
              <MenuItem value={FUNCTIONS_OF_BEHAVIOR.ESCAPE}>
                {FUNCTIONS_OF_BEHAVIOR.ESCAPE}
              </MenuItem>
              <MenuItem value={FUNCTIONS_OF_BEHAVIOR.ATTENTION}>
                {FUNCTIONS_OF_BEHAVIOR.ATTENTION}
              </MenuItem>
              <MenuItem value={FUNCTIONS_OF_BEHAVIOR.SENSORY}>
                {FUNCTIONS_OF_BEHAVIOR.SENSORY}
              </MenuItem>
            </Select>
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
