import { SyntheticEvent } from "react";
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";
import { consequenceFormAtom, consequencesResetAtom } from "../../recoil/consequencesAtoms";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  SelectChangeEvent,
  Select,
  MenuItem,
} from "@mui/material";
import useUpdateDoc from "../../hooks/useUpdateDoc";
import useAddDoc from "../../hooks/useAddDoc";
import { BLANK_CONSEQUENCE_FORM } from "../../libraries/blankForms";
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

export default function ManageConsequence({ open, setOpen }: Props) {
  const { sendRequest: updateDoc } = useUpdateDoc();
  const { sendRequest: addDoc } = useAddDoc();
  const [consequencesForm, setConsequencesForm] = useRecoilState(consequenceFormAtom);
  const setConsequencesReset = useSetRecoilState(consequencesResetAtom);
  const loggedInStaff = useRecoilValue(loggedInStaffAtom);

  const handleChange = (event: SyntheticEvent) => {
    const formState = event.target as FormState;
    setConsequencesForm((pV) => {
      return { ...pV, [formState.name]: formState.value };
    });
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    setConsequencesForm((pV) => ({ ...pV, [event.target.name]: event.target.value }));
  };

  const handleClose = () => {
    setOpen(false);
    setConsequencesForm(BLANK_CONSEQUENCE_FORM);
  };

  const handleSave = async () => {
    if (!loggedInStaff) return;
    const formToSubmit = { ...consequencesForm, organizationId: loggedInStaff.organizationId };
    if ("id" in consequencesForm) {
      await updateDoc({ col: "consequences", data: formToSubmit, id: consequencesForm.id });
    } else {
      await addDoc({ col: "consequences", data: formToSubmit });
    }
    handleClose();
    setConsequencesForm(BLANK_CONSEQUENCE_FORM);
    setConsequencesReset((pV) => !pV);
  };

  return (
    <>
      {consequencesForm && (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
          <DialogTitle sx={{ fontSize: 44, textAlign: "center" }}>{`${
            "id" in consequencesForm ? "Edit" : "New"
          } Consequence`}</DialogTitle>
          <DialogContent>
            <Typography sx={{ mb: 1 }}>Label</Typography>
            <TextField
              fullWidth
              name="label"
              value={consequencesForm.label}
              onChange={handleChange}
            />
            <Typography sx={{ mb: 1, mt: 2 }}>Function of Behavior</Typography>
            <Select
              name="functionOfBehavior"
              onChange={handleSelectChange}
              value={consequencesForm.functionOfBehavior}
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
