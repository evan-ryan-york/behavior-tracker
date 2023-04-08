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
import { BLANK_SETTING_FORM } from "../../libraries/blankForms";
import DialogTitle from "@mui/material/DialogTitle";
import { loggedInStaffAtom } from "../../recoil/staffAtoms";
import { settingFormAtom, settingsResetAtom } from "../../recoil/settingsAtoms";
import SetSettingSites from "./SetSettingSites";

type Props = {
  open: boolean;
  setOpen: (value: boolean | ((pV: boolean) => boolean)) => void;
};

type FormState = EventTarget & {
  name: string;
  value: string;
  checked: string;
};

export default function ManageSetting({ open, setOpen }: Props) {
  const loggedInStaff = useRecoilValue(loggedInStaffAtom);
  const { sendRequest: updateDoc } = useUpdateDoc();
  const { sendRequest: addDoc } = useAddDoc();
  const [settingForm, setSettingForm] = useRecoilState(settingFormAtom);
  const setSettingsReset = useSetRecoilState(settingsResetAtom);

  const handleChange = (event: SyntheticEvent) => {
    const formState = event.target as FormState;
    setSettingForm((pV) => {
      return { ...pV, [formState.name]: formState.value };
    });
  };

  const handleClose = () => {
    setOpen(false);
    setSettingForm(BLANK_SETTING_FORM);
  };

  const handleSave = async () => {
    if (!loggedInStaff) return;
    const formToSubmit = { ...settingForm, organizationId: loggedInStaff.organizationId };
    if ("id" in formToSubmit) {
      await updateDoc({ col: "settings", data: formToSubmit, id: formToSubmit.id });
    } else {
      await addDoc({ col: "settings", data: formToSubmit });
    }
    handleClose();
    setSettingForm(BLANK_SETTING_FORM);
    setSettingsReset((pV) => !pV);
  };

  return (
    <>
      {settingForm && (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
          <DialogTitle sx={{ fontSize: 44, textAlign: "center" }}>{`${
            "id" in settingForm ? "Edit" : "New"
          } Setting`}</DialogTitle>
          <DialogContent>
            <Typography sx={{ mb: 1 }}>Setting Name</Typography>
            <TextField fullWidth name="name" value={settingForm.name} onChange={handleChange} />
            <Box>
              <Typography sx={{ mb: 1, mt: 2 }}>Select Site for Setting</Typography>
              <SetSettingSites />
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
