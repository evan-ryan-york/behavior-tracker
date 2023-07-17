import { useEffect, useState, ChangeEvent } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
  Alert,
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
  const [mode, setMode] = useState<"New" | "Edit">("New");
  const [error, setError] = useState<string | null>(null);
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
      setMode("Edit");
    } else {
      setObservationPeriodForm({
        studentId: selectedStudent.id,
        organizationId: organization.id,
        authorId: loggedInStaff.id,
        startTime: Date.now(),
        endTime: Date.now() + 1000 * 60 * 60,
        label: "Observation Session",
      });
      setMode("New");
    }
  }, [selectedStudent, organization, loggedInStaff, observationPeriod]);

  useEffect(() => {
    if (!observationPeriodForm) return;
    const { startTime, endTime } = observationPeriodForm;
    if (startTime === 0) {
      setError("Please select a start date");
    } else if (endTime === 0) {
      setError("Please select and end date");
    } else if (startTime > endTime) {
      setError(
        "Your start time is set after your end time. An observation session start time must be before it's end time."
      );
    } else if (endTime - startTime < 1000 * 60) {
      setError(
        "Your total observation preiod is less than a minute. Observation periods must be at least one minute long."
      );
    } else if (endTime - startTime > 86399999) {
      setError(
        "An observation session can not last more than a day. Please create a unique observation session for each period of time that you observe a child."
      );
    } else {
      setError(null);
    }
  }, [observationPeriodForm]);

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
          {`${mode} Observation Session`}
        </DialogTitle>
        {observationPeriodForm && (
          <DialogContent>
            <Typography>Observation Session Label</Typography>
            <TextField fullWidth value={observationPeriodForm.label} onChange={handleLabelChange} />
            <Typography sx={{ mt: 2 }}>Observation Session Start Time</Typography>
            <LocalizationProvider dateAdapter={AdapterLuxon}>
              <DateTimePicker
                label="Start Time"
                value={DateTime.fromMillis(observationPeriodForm.startTime)}
                onChange={handleStartTimeChange}
                slotProps={{ textField: { variant: "outlined", sx: { mt: 2 }, fullWidth: true } }}
              />
            </LocalizationProvider>
            <Typography sx={{ mt: 2 }}>Observation Session End Time</Typography>
            <LocalizationProvider dateAdapter={AdapterLuxon}>
              <DateTimePicker
                label="End Time"
                value={DateTime.fromMillis(observationPeriodForm.endTime)}
                onChange={handleEndTimeChange}
                slotProps={{ textField: { variant: "outlined", sx: { mt: 2 }, fullWidth: true } }}
              />
            </LocalizationProvider>
            {error && (
              <Alert sx={{ mt: 2 }} severity="error">
                {error}
              </Alert>
            )}
          </DialogContent>
        )}
        <DialogActions>
          <Button disabled={Boolean(error)} color="secondary" onClick={handleSave}>
            Save
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ManageObservationPeriod;
