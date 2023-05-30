import { SyntheticEvent } from "react";
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";
import { sitesResetAtom, siteFormAtom } from "../../recoil/sitesAtoms";
import { Button, TextField, Dialog, DialogActions, DialogContent, Typography } from "@mui/material";
import useUpdateDoc from "../../hooks/useUpdateDoc";
import useAddDoc from "../../hooks/useAddDoc";
import { BLANK_SITE_FORM } from "../../libraries/blankForms";
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

export default function ManageSite({ open, setOpen }: Props) {
  const loggedInStaff = useRecoilValue(loggedInStaffAtom);
  const { sendRequest: updateDoc } = useUpdateDoc();
  const { sendRequest: addDoc } = useAddDoc();
  const [siteForm, setSiteForm] = useRecoilState(siteFormAtom);
  const setSitesReset = useSetRecoilState(sitesResetAtom);

  const handleChange = (event: SyntheticEvent) => {
    const formState = event.target as FormState;
    setSiteForm((pV) => {
      return { ...pV, [formState.name]: formState.value };
    });
  };

  const handleClose = () => {
    setOpen(false);
    setSiteForm(BLANK_SITE_FORM);
  };

  const handleSave = async () => {
    if (!loggedInStaff) return;
    const formToSubmit = { ...siteForm, organizationId: loggedInStaff.organizationId };
    if ("id" in formToSubmit) {
      await updateDoc({ col: "sites", data: formToSubmit, id: formToSubmit.id });
    } else {
      await addDoc({ col: "sites", data: formToSubmit });
    }
    handleClose();
    setSiteForm(BLANK_SITE_FORM);
    setSitesReset((pV) => !pV);
  };

  return (
    <>
      {siteForm && (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
          <DialogTitle sx={{ fontSize: 44, textAlign: "center" }}>{`${
            "id" in siteForm ? "Edit" : "New"
          } Site`}</DialogTitle>
          <DialogContent>
            <Typography sx={{ mb: 1 }}>Site Name</Typography>
            <TextField fullWidth name="name" value={siteForm.name} onChange={handleChange} />
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
