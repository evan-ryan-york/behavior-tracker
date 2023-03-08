import { SyntheticEvent } from "react";
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";
import { groupsResetAtom, groupFormAtom } from "../../recoil/groupAtoms";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  Box,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import useUpdateDoc from "../../hooks/useUpdateDoc";
import useAddDoc from "../../hooks/useAddDoc";
import { BLANK_GROUP_FORM } from "../../libraries/blankForms";
import DialogTitle from "@mui/material/DialogTitle";
import { loggedInStaffAtom } from "../../recoil/staffAtoms";
import { sitesAtom } from "../../recoil/sitesAtoms";

type Props = {
  open: boolean;
  setOpen: (value: boolean | ((pV: boolean) => boolean)) => void;
};

type FormState = EventTarget & {
  name: string;
  value: string;
  checked: string;
};

export default function ManageGroup({ open, setOpen }: Props) {
  const loggedInStaff = useRecoilValue(loggedInStaffAtom);
  const { sendRequest: updateDoc } = useUpdateDoc();
  const { sendRequest: addDoc } = useAddDoc();
  const [groupForm, setGroupForm] = useRecoilState(groupFormAtom);
  const setGroupsReset = useSetRecoilState(groupsResetAtom);
  const sites = useRecoilValue(sitesAtom);

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
    const formToSubmit = { ...groupForm, organizationId: loggedInStaff.organizationId };
    if ("id" in formToSubmit) {
      await updateDoc({ col: "groups", data: formToSubmit, id: formToSubmit.id });
    } else {
      await addDoc({ col: "groups", data: formToSubmit });
    }
    handleClose();
    setGroupForm(BLANK_GROUP_FORM);
    setGroupsReset((pV) => !pV);
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    setGroupForm((pV) => ({ ...pV, siteId: event.target.value }));
  };

  return (
    <>
      {groupForm && (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
          <DialogTitle sx={{ fontSize: 44 , textAlign: "center"}}>{`${
        "id" in groupForm ? "Edit" : "New"
      } Group`}</DialogTitle>
          <DialogContent>
            <Typography sx={{ mb: 1 }}>Group Name</Typography>
            <TextField fullWidth name="name" value={groupForm.name} onChange={handleChange} />
            <Box>
              <Typography sx={{ mb: 1, mt: 2 }}>Select Site for Group</Typography>
              <Select
                id="site-select"
                value={groupForm.siteId}
                label="Select Site for Group"
                onChange={handleSelectChange}
                fullWidth
              >
                {sites &&
                  sites.map((site) => (
                    <MenuItem key={site.id} value={site.id}>
                      {site.name}
                    </MenuItem>
                  ))}
              </Select>
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
