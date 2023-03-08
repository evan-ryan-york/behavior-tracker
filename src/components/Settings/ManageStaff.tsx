import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { staffFormAtom, staffResetAtom } from "../../recoil/staffAtoms";
import {
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog,
  TextField,
  Button,
} from "@mui/material";
import useAddDoc from "../../hooks/useAddDoc";
import { BLANK_STAFF_FORM } from "../../libraries/blankForms";
import SetStaffSites from "./SetStaffSites";
import useUpdateDoc from "../../hooks/useUpdateDoc";
import { organizationAtom } from "../../recoil/organizationAtoms";
import SetStaffGroups from "./SetStaffGroups";
type Props = {
  open: boolean;
  setOpen: (newValue: boolean) => void;
};

type FormState = EventTarget & {
  name: string;
  value: string;
};

const ManageStaff = ({ open, setOpen }: Props) => {
  const [staffForm, setStaffForm] = useRecoilState(staffFormAtom);
  const { sendRequest: addDoc } = useAddDoc();
  const { sendRequest: updateDoc } = useUpdateDoc();
  const setStaffReset = useSetRecoilState(staffResetAtom);
  const organization = useRecoilValue(organizationAtom);

  const handleChange = (event: React.SyntheticEvent) => {
    const formState = event.target as FormState;
    setStaffForm((prevValue) => {
      return { ...prevValue, [formState.name]: formState.value };
    });
  };

  const handleClose = () => {
    setOpen(false);
    setStaffForm(BLANK_STAFF_FORM);
  };

  const handleSave = async () => {
    if (!organization) return;
    if ("id" in staffForm) {
      await updateDoc({
        col: "staff",
        id: staffForm.id,
        data: { ...staffForm, organizationId: organization.id },
      });
    } else {
      await addDoc({ col: "staff", data: { ...staffForm, organizationId: organization.id } });
    }
    setStaffForm(BLANK_STAFF_FORM);
    setOpen(false);
    setStaffReset((pV: boolean) => !pV);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle sx={{ fontSize: 44, textAlign: "center" }}>{`${
        "id" in staffForm ? "Edit" : "New"
      } Staff Member`}</DialogTitle>
      <DialogContent>
        <DialogContentText>First Name:</DialogContentText>
        <TextField
          autoFocus
          name="firstName"
          type="text"
          required
          fullWidth
          value={staffForm.firstName}
          variant="outlined"
          onChange={handleChange}
        />
        <DialogContentText>Last Name:</DialogContentText>
        <TextField
          autoFocus
          name="lastName"
          type="text"
          required
          fullWidth
          value={staffForm.lastName}
          variant="outlined"
          onChange={handleChange}
        />
        <DialogContentText>Email:</DialogContentText>
        <TextField
          autoFocus
          name="email"
          type="email"
          required
          fullWidth
          value={staffForm.email}
          variant="outlined"
          onChange={handleChange}
        />
        <SetStaffSites />
        <SetStaffGroups />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave}>Submit</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ManageStaff;
