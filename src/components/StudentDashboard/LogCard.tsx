import React, { useEffect, useState } from "react";
import { ObservationPeriod, ObservationPeriodRecord, ObservationRecord } from "../../types/types";
import { Box, Paper, Typography } from "@mui/material";
import { getDifferenceForDisplay, dateRangeForDisplay } from "../../libraries/functions";
import { useRecoilValue } from "recoil";
import { observationsAtom } from "../../recoil/observationAtoms";

type Props = {
  observationPeriod: ObservationPeriodRecord;
};

function LogCard({ observationPeriod }: Props) {
  const [rangeMessage, setRangeMessage] = useState("");
  const [durationMessage, setDurationMessage] = useState("");
  const [observationsCount, setObservationsCount] = useState<number>(0);
  const observations = useRecoilValue(observationsAtom);

  useEffect(() => {
    const rangeForDisplay = dateRangeForDisplay(
      observationPeriod.startTime,
      observationPeriod.endTime
    );
    setRangeMessage(rangeForDisplay);

    if (observationPeriod.endTime !== 0) {
      const difference = observationPeriod.endTime - observationPeriod.startTime;
      const differenceForDisplay = getDifferenceForDisplay(difference);
      setDurationMessage(differenceForDisplay);
    }
    const tempObservations = observations.filter(
      (observation) => observation.observationPeriodId === observationPeriod.id
    );
    setObservationsCount(tempObservations.length);
  }, [observationPeriod, observations]);
  return (
    <>
      <Paper sx={{ padding: 2, mt: 2 }}>
        <Box>
          <Typography variant="h6">{`${observationPeriod.label} - ${observationsCount} ${
            observationsCount === 1 ? "observation" : "observations"
          }`}</Typography>
          <Typography component="span">{rangeMessage}</Typography>
          <Typography component="span">
            <b>{durationMessage}</b>
          </Typography>
        </Box>
      </Paper>
    </>
  );
}

export default LogCard;
