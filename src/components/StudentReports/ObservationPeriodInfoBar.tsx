import { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { ObservationPeriod, ObservationRecord } from "../../types/types";
import ObservationPeriodDelete from "./ObservationPeriodDelete";

type Props = {
  filteredObservations: ObservationRecord[];
  observationPeriod: ObservationPeriod;
};

function ObservationPeriodInfoBar({ filteredObservations, observationPeriod }: Props) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const deleteObservationPeriod = () => {
    setDeleteOpen(true);
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography>{`Number of Observations: ${filteredObservations.length}`}</Typography>
        <Button variant="contained" color="error" onClick={deleteObservationPeriod}>
          Delete Observation Session
        </Button>
      </Box>
      <ObservationPeriodDelete
        observationPeriod={observationPeriod}
        open={deleteOpen}
        setOpen={setDeleteOpen}
        filteredObservations={filteredObservations}
      />
    </>
  );
}

export default ObservationPeriodInfoBar;
