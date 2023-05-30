import { SyntheticEvent } from "react";
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";
import { groupsResetAtom, groupFormAtom } from "../../recoil/groupAtoms";
import { Button, TextField, Dialog, DialogActions, DialogContent, Typography } from "@mui/material";
import useUpdateDoc from "../../hooks/useUpdateDoc";
import useAddDoc from "../../hooks/useAddDoc";
import { BLANK_GROUP_FORM } from "../../libraries/blankForms";
import DialogTitle from "@mui/material/DialogTitle";
import { loggedInStaffAtom } from "../../recoil/staffAtoms";
import { sitesAtom } from "../../recoil/sitesAtoms";

type Props = {
  open: boolean;
  setOpen: (value: boolean | ((pV: boolean) => boolean)) => void;
  selectedSiteId: string;
};

type FormState = EventTarget & {
  name: string;
  value: string;
  checked: string;
};

export default function ManageGroup({ open, setOpen, selectedSiteId }: Props) {
  const loggedInStaff = useRecoilValue(loggedInStaffAtom);
  const { sendRequest: updateDoc } = useUpdateDoc();
  const { sendRequest: addDoc } = useAddDoc();
  const [groupForm, setGroupForm] = useRecoilState(groupFormAtom);
  const setGroupsReset = useSetRecoilState(groupsResetAtom);

  const handleChange = (event: SyntheticEvent) => {
    const formState = event.target as FormState;
    setGroupForm((pV) => {
      return { ...pV, [formState.name]: formState.value };
    });
  };

  const handleClose = () => {
    setOpen(false);
    setGroupForm(BLANK_GROUP_FORM);
  };

  const handleSave = async () => {
    if (!loggedInStaff) return;
    const formToSubmit = {
      ...groupForm,
      organizationId: loggedInStaff.organizationId,
      siteId: selectedSiteId,
    };
    if ("id" in formToSubmit) {
      await updateDoc({ col: "groups", data: formToSubmit, id: formToSubmit.id });
    } else {
      await addDoc({ col: "groups", data: formToSubmit });
    }
    handleClose();
    setGroupForm(BLANK_GROUP_FORM);
    setGroupsReset((pV) => !pV);
  };

  return (
    <>
      {groupForm && (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
          <DialogTitle sx={{ fontSize: 44, textAlign: "center" }}>{`${
            "id" in groupForm ? "Edit" : "New"
          } Group`}</DialogTitle>
          <DialogContent>
            <Typography sx={{ mb: 1 }}>Group Name</Typography>
            <TextField fullWidth name="name" value={groupForm.name} onChange={handleChange} />
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
