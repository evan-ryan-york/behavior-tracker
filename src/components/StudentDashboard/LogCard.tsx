import React, { useEffect, useState } from "react";
import { ObservationPeriod } from "../../types/types";
import { Box, Paper, Typography } from "@mui/material";
import { getDifferenceForDisplay, dateRangeForDisplay } from "../../libraries/functions";

type Props = {
  observationPeriod: ObservationPeriod;
};

function LogCard({ observationPeriod }: Props) {
  const [rangeMessage, setRangeMessage] = useState("");
  const [durationMessage, setDurationMessage] = useState("");

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
  }, [observationPeriod]);
  return (
    <>
      <Paper sx={{ padding: 2, mt: 2 }}>
        <Box>
          <Typography variant="h6">{observationPeriod.label}</Typography>
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
