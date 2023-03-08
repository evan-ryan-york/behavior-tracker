import { SyntheticEvent } from "react";
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";
import { behaviorFormAtom, behaviorsResetAtom } from "../../recoil/behaviorsAtoms";
import { Button, TextField, Dialog, DialogActions, DialogContent, Typography } from "@mui/material";
import useUpdateDoc from "../../hooks/useUpdateDoc";
import useAddDoc from "../../hooks/useAddDoc";
import { BLANK_LABEL_FORM } from "../../libraries/blankForms";
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

export default function ManageBehavior({ open, setOpen }: Props) {
  const { sendRequest: updateDoc } = useUpdateDoc();
  const { sendRequest: addDoc } = useAddDoc();
  const [behaviorForm, setBehaviorForm] = useRecoilState(behaviorFormAtom);
  const setBehaviorsReset = useSetRecoilState(behaviorsResetAtom);
  const loggedInStaff = useRecoilValue(loggedInStaffAtom);

  const handleChange = (event: SyntheticEvent) => {
    const formState = event.target as FormState;
    setBehaviorForm((pV) => {
      return { ...pV, [formState.name]: formState.value };
    });
  };

  const handleClose = () => {
    setOpen(false);
    setBehaviorForm(BLANK_LABEL_FORM);
  };

  const handleSave = async () => {
    if (!loggedInStaff) return;
    const formToSubmit = { ...behaviorForm, organizationId: loggedInStaff.organizationId };
    if ("id" in behaviorForm) {
      await updateDoc({ col: "behaviors", data: formToSubmit, id: behaviorForm.id });
    } else {
      await addDoc({ col: "behaviors", data: formToSubmit });
    }
    handleClose();
    setBehaviorForm(BLANK_LABEL_FORM);
    setBehaviorsReset((pV) => !pV);
  };

  return (
    <>
      {behaviorForm && (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
          <DialogTitle sx={{ fontSize: 44, textAlign: "center" }}>{`${
            "id" in behaviorForm ? "Edit" : "New"
          } Behavior`}</DialogTitle>
          <DialogContent>
            <Typography sx={{ mb: 1 }}>Label</Typography>
            <TextField fullWidth name="label" value={behaviorForm.label} onChange={handleChange} />
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
