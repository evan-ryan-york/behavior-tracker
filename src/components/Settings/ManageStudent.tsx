import { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { studentFormAtom, studentsResetAtom } from "../../recoil/studentAtoms";
import {
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog,
  TextField,
  Button,
  Box,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import useAddDoc from "../../hooks/useAddDoc";
import { BLANK_STUDENT_FORM } from "../../libraries/blankForms";
import useUpdateDoc from "../../hooks/useUpdateDoc";
import { organizationAtom } from "../../recoil/organizationAtoms";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTime } from "luxon";
import { enrollStatusesAtom } from "../../recoil/enrollStatusAtoms";
import SetStudentSites from "./SetStudentSites";
import SetStudentGroups from "./SetStudentGroups";

type Props = {
  open: boolean;
  setOpen: (newValue: boolean) => void;
};

type FormState = EventTarget & {
  name: string;
  value: string;
};

const ManageStudent = ({ open, setOpen }: Props) => {
  const [studentForm, setStudentForm] = useRecoilState(studentFormAtom);
  const { sendRequest: addDoc } = useAddDoc();
  const { sendRequest: updateDoc } = useUpdateDoc();
  const setStudentsReset = useSetRecoilState(studentsResetAtom);
  const organization = useRecoilValue(organizationAtom);
  const [birthday, setBirthday] = useState<DateTime | null>(null);
  const enrollStatuses = useRecoilValue(enrollStatusesAtom);

  const handleChange = (event: React.SyntheticEvent) => {
    const formState = event.target as FormState;
    setStudentForm((prevValue) => {
      return { ...prevValue, [formState.name]: formState.value };
    });
  };

  const handleClose = () => {
    setOpen(false);
    setStudentForm(BLANK_STUDENT_FORM);
  };

  const handleBirthdayChange = (newValue: DateTime | null) => {
    const selectedDate = newValue ? newValue.toISO() : "";
    setStudentForm((pV) => ({ ...pV, birthday: selectedDate }));
  };

  const handleSave = async () => {
    if (!organization) return;
    if ("id" in studentForm) {
      await updateDoc({
        col: "students",
        id: studentForm.id,
        data: { ...studentForm, organizationId: organization.id },
      });
    } else {
      await addDoc({
        col: "students",
        data: { ...studentForm, organizationId: organization.id },
      });
    }
    setStudentForm(BLANK_STUDENT_FORM);
    setOpen(false);
    setStudentsReset((pV: boolean) => !pV);
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    setStudentForm((pV) => ({ ...pV, enrollStatus: event.target.value }));
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle sx={{ fontSize: 44, textAlign: "center" }}>{`${
        "id" in studentForm ? "Edit" : "New"
      } Student`}</DialogTitle>
      <DialogContent>
        <DialogContentText>First Name:</DialogContentText>
        <TextField
          autoFocus
          name="firstName"
          type="text"
          required
          fullWidth
          value={studentForm.firstName}
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
          value={studentForm.lastName}
          variant="outlined"
          onChange={handleChange}
        />
        <DialogContentText>Local Id:</DialogContentText>
        <TextField
          autoFocus
          name="localId"
          type="text"
          required
          fullWidth
          value={studentForm.localId}
          variant="outlined"
          onChange={handleChange}
        />
        <Box sx={{ mt: 2 }}>
          <DialogContentText>Select Birthday:</DialogContentText>
          <LocalizationProvider dateAdapter={AdapterLuxon}>
            <DatePicker
              value={DateTime.fromFormat("D", studentForm.birthday)}
              onChange={handleBirthdayChange}
              slotProps={{ textField: { variant: "outlined", sx: { mt: 2 }, fullWidth: true } }}
            />
          </LocalizationProvider>
        </Box>
        <Box sx={{ mt: 2 }}>
          <DialogContentText>Select Enrollment Status:</DialogContentText>
          <Select
            id="enroll-status-select"
            value={studentForm.enrollStatus}
            onChange={handleSelectChange}
            fullWidth
          >
            {enrollStatuses &&
              enrollStatuses.map((enrollStatus) => (
                <MenuItem key={enrollStatus.id} value={enrollStatus.id}>
                  {enrollStatus.name}
                </MenuItem>
              ))}
          </Select>
        </Box>
        <Box>
          <SetStudentSites />
        </Box>
        <Box>
          <SetStudentGroups />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave}>Submit</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ManageStudent;
