import { useEffect, useState, ChangeEvent } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";
import { ObservationPeriod } from "../../types/types";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { DateTime } from "luxon";
import useUpdateRTDoc from "../../hooks/useUpdateRTDoc";
import { selectedStudentAtom } from "../../recoil/studentAtoms";
import { loggedInStaffAtom } from "../../recoil/staffAtoms";
import { organizationAtom } from "../../recoil/organizationAtoms";
import useAddRTDoc from "../../hooks/useAddRTDoc";
import {
  manageObservationPeriodOpenAtom,
  observationPeriodForEditAtom,
} from "../../recoil/observationAtoms";

function ManageObservationPeriod() {
  const [open, setOpen] = useRecoilState(manageObservationPeriodOpenAtom);
  const observationPeriod = useRecoilValue(observationPeriodForEditAtom);
  const { sendRequest: updateRTDoc } = useUpdateRTDoc();
  const { sendRequest: addRTDoc } = useAddRTDoc();
  const selectedStudent = useRecoilValue(selectedStudentAtom);
  const organization = useRecoilValue(organizationAtom);
  const loggedInStaff = useRecoilValue(loggedInStaffAtom);
  const [observationPeriodForm, setObservationPeriodForm] = useState<ObservationPeriod | null>(
    null
  );

  useEffect(() => {
    if (!selectedStudent || !organization || !loggedInStaff) return;
    if (observationPeriod) {
      setObservationPeriodForm({
        studentId: observationPeriod.studentId,
        organizationId: observationPeriod.organizationId,
        authorId: observationPeriod.authorId,
        startTime: observationPeriod.startTime,
        endTime: observationPeriod.endTime,
        label: observationPeriod.label,
      });
    } else {
      setObservationPeriodForm({
        studentId: selectedStudent.id,
        organizationId: organization.id,
        authorId: loggedInStaff.id,
        startTime: Date.now(),
        endTime: Date.now(),
        label: "Observation Period",
      });
    }
  }, [selectedStudent, organization, loggedInStaff, observationPeriod]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleLabelChange = (event: ChangeEvent<HTMLInputElement>) => {
    setObservationPeriodForm((pV) => {
      if (!pV) return null;
      return { ...pV, label: event.target.value };
    });
  };

  const handleStartTimeChange = (time: DateTime | null) => {
    setObservationPeriodForm((pV) => {
      if (!pV) return null;
      return { ...pV, startTime: time ? time.toMillis() : 0 };
    });
  };

  const handleEndTimeChange = (time: DateTime | null) => {
    setObservationPeriodForm((pV) => {
      if (!pV) return null;
      return { ...pV, endTime: time ? time.toMillis() : 0 };
    });
  };

  const handleSave = () => {
    if (!observationPeriodForm) return;
    if (observationPeriod) {
      updateRTDoc({
        data: observationPeriodForm,
        path: `observationPeriods/${observationPeriod.organizationId}/${observationPeriod.studentId}/${observationPeriod.id}`,
      });
    } else {
      addRTDoc({
        data: observationPeriodForm,
        path: `observationPeriods/${observationPeriodForm.organizationId}/${observationPeriodForm.studentId}`,
      });
    }
    handleClose();
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogTitle sx={{ fontSize: 44, textAlign: "center" }}>
          Edit Observation Period
        </DialogTitle>
        {observationPeriodForm && (
          <DialogContent>
            <Typography>Observation Period Label</Typography>
            <TextField fullWidth value={observationPeriodForm.label} onChange={handleLabelChange} />
            <Typography sx={{ mt: 2 }}>Observation Period Start Time</Typography>
            <LocalizationProvider dateAdapter={AdapterLuxon}>
              <DateTimePicker
                label="Start Time"
                value={DateTime.fromMillis(observationPeriodForm.startTime)}
                onChange={handleStartTimeChange}
                renderInput={(params) => <TextField sx={{ mt: 1 }} fullWidth {...params} />}
              />
            </LocalizationProvider>
            <Typography sx={{ mt: 2 }}>Observation Period End Time</Typography>
            <LocalizationProvider dateAdapter={AdapterLuxon}>
              <DateTimePicker
                label="End Time"
                value={DateTime.fromMillis(observationPeriodForm.endTime)}
                onChange={handleEndTimeChange}
                renderInput={(params) => <TextField sx={{ mt: 1 }} fullWidth {...params} />}
              />
            </LocalizationProvider>
          </DialogContent>
        )}
        <DialogActions>
          <Button color="secondary" onClick={handleSave}>
            Save
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ManageObservationPeriod;
