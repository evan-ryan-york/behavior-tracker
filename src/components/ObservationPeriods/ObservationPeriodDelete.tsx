import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { useRecoilValue } from "recoil";
import { observationPeriodsAtom } from "../../recoil/observationAtoms";
import { getDatabase, ref, set } from "firebase/database";
import { ObservationPeriod, ObservationRecord } from "../../types/types";
import useUpdateDoc from "../../hooks/useUpdateDoc";

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
  observationPeriod: ObservationPeriod;
  filteredObservations: ObservationRecord[];
};

function ObservationPeriodDelete({
  open,
  setOpen,
  observationPeriod,
  filteredObservations,
}: Props) {
  const observationPeriods = useRecoilValue(observationPeriodsAtom);
  const { sendRequest: updateDoc } = useUpdateDoc();

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
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
        `observationPeriods/${observationPeriod.organizationId}/${observationPeriod.studentId}`
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
        <DialogTitle sx={{ fontSize: 44, textAlign: "center" }}>Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this Observation Session? This will delete all observations
          in the given observation session too.
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleDelete}>
            Delete
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ObservationPeriodDelete;
