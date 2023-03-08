import { SyntheticEvent } from "react";
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import useUpdateDoc from "../../hooks/useUpdateDoc";
import useAddDoc from "../../hooks/useAddDoc";
import { BLANK_REPLACEMENT_BEHAVIOR_FORM } from "../../libraries/blankForms";
import DialogTitle from "@mui/material/DialogTitle";
import { loggedInStaffAtom } from "../../recoil/staffAtoms";
import {
  replacementBehaviorFormAtom,
  replacementBehaviorsResetAtom,
} from "../../recoil/replacementBehaviorsAtoms";
import { behaviorsAtom } from "../../recoil/behaviorsAtoms";

type Props = {
  open: boolean;
  setOpen: (value: boolean | ((pV: boolean) => boolean)) => void;
};

type FormState = EventTarget & {
  name: string;
  value: string;
  checked: string;
};

export default function ManageReplacementBehavior({ open, setOpen }: Props) {
  const behaviors = useRecoilValue(behaviorsAtom);
  const { sendRequest: updateDoc } = useUpdateDoc();
  const { sendRequest: addDoc } = useAddDoc();
  const [replacementBehaviorForm, setReplacementBehaviorForm] = useRecoilState(
    replacementBehaviorFormAtom
  );
  const setReplacementBehaviorReset = useSetRecoilState(replacementBehaviorsResetAtom);
  const loggedInStaff = useRecoilValue(loggedInStaffAtom);

  const handleChange = (event: SyntheticEvent) => {
    const formState = event.target as FormState;
    setReplacementBehaviorForm((pV) => {
      return { ...pV, [formState.name]: formState.value };
    });
  };

  const handleClose = () => {
    setOpen(false);
    setReplacementBehaviorForm(BLANK_REPLACEMENT_BEHAVIOR_FORM);
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    setReplacementBehaviorForm((pV) => ({ ...pV, [event.target.name]: event.target.value }));
  };

  const handleSave = async () => {
    if (!loggedInStaff) return;
    const formToSubmit = {
      ...replacementBehaviorForm,
      organizationId: loggedInStaff.organizationId,
    };
    if ("id" in replacementBehaviorForm) {
      await updateDoc({
        col: "replacementBehaviors",
        data: formToSubmit,
        id: replacementBehaviorForm.id,
      });
    } else {
      await addDoc({ col: "replacementBehaviors", data: formToSubmit });
    }
    handleClose();
    setReplacementBehaviorForm(BLANK_REPLACEMENT_BEHAVIOR_FORM);
    setReplacementBehaviorReset((pV) => !pV);
  };

  return (
    <>
      {replacementBehaviorForm && (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
          <DialogTitle sx={{ fontSize: 44, textAlign: "center" }}>{`${
            "id" in replacementBehaviorForm ? "Edit" : "New"
          } Replacement Behavior`}</DialogTitle>
          <DialogContent>
            <Typography sx={{ mb: 1 }}>Label</Typography>
            <TextField
              fullWidth
              name="label"
              value={replacementBehaviorForm.label}
              onChange={handleChange}
            />
            <Typography sx={{ mb: 1, mt: 1 }}>Target Behavior</Typography>
            <Select
              name="behaviorId"
              fullWidth
              onChange={handleSelectChange}
              value={replacementBehaviorForm.behaviorId}
            >
              {behaviors &&
                behaviors.map((behavior) => (
                  <MenuItem key={behavior.id} value={behavior.id}>
                    {behavior.label}
                  </MenuItem>
                ))}
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
