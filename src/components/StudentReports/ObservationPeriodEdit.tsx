import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import { useRecoilValue } from "recoil";
import { observationPeriodsAtom } from "../../recoil/observationAtoms";
import { getDatabase, ref, set } from "firebase/database";
import { ObservationPeriod, ObservationRecord } from "../../types/types";
import useUpdateDoc from "../../hooks/useUpdateDoc";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
  observationPeriod: ObservationPeriod;
  filteredObservations: ObservationRecord[];
};

function ObservationPeriodEdit({ open, setOpen, observationPeriod, filteredObservations }: Props) {
  const observationPeriods = useRecoilValue(observationPeriodsAtom);
  const { sendRequest: updateDoc } = useUpdateDoc();

  const handleClose = () => {
    setOpen(false);
  };

  const handleStartTimeChange = () => {};

  const handleEndTimeChange = () => {};

  const handleSave = () => {
    if (!observationPeriods) return;
    const index = observationPeriods.findIndex(
      (currentPeriod) => observationPeriod.startTime === currentPeriod.startTime
    );
    const mutablePeriods = [...observationPeriods];
    mutablePeriods.splice(index, 1);
    const db = getDatabase();
    set(
      ref(
        db,
        `observationPeriods/${observationPeriod.organizationId}/${observationPeriod.studentId}/${observationPeriod.authorId}`
      ),
      mutablePeriods
    );
    filteredObservations.forEach((observation) => {
      updateDoc({
        col: "observations",
        data: { ...observation, active: false },
        id: observation.id,
      });
    });
  };
  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogTitle sx={{ fontSize: 44, textAlign: "center" }}>
          Edit Observation Period
        </DialogTitle>
        <DialogContent>
          <Typography>Observation Period Label</Typography>
          <TextField />
          <Typography>Observation Period Start Time</Typography>
          <LocalizationProvider dateAdapter={AdapterLuxon}>
            <DateTimePicker
              label="Date&Time picker"
              value={""}
              onChange={handleStartTimeChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <Typography>Observation Period End Time</Typography>
          <LocalizationProvider dateAdapter={AdapterLuxon}>
            <DateTimePicker
              label="Date&Time picker"
              value={""}
              onChange={handleEndTimeChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </DialogContent>
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

export default ObservationPeriodEdit;
