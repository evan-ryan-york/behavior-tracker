import React, { useState, useEffect } from "react";
import { ObservationPeriod, ObservationRecord } from "../../types/types";
import { Typography, Box, Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getDifferenceForDisplay, dateRangeForDisplay } from "../../libraries/functions";
import { selectedStudentObservationsAtom } from "../../recoil/observationAtoms";
import { useRecoilValue } from "recoil";
import ObservationCard from "./ObservationCard";
import ObservationPeriodInfoBar from "./ObservationPeriodInfoBar";

type Props = {
  observationPeriod: ObservationPeriod;
};

function ObservationPeriodAccordion({ observationPeriod }: Props) {
  const [rangeMessage, setRangeMessage] = useState("");
  const [durationMessage, setDurationMessage] = useState("");
  const selectedStudentObservations = useRecoilValue(selectedStudentObservationsAtom);
  const [filteredObservations, setFilteredObservations] = useState<ObservationRecord[]>([]);

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

  useEffect(() => {
    if (!observationPeriod || !selectedStudentObservations) return;
    if (observationPeriod.endTime > 0) {
      const tempArray = selectedStudentObservations.filter(
        (observation) =>
          (observation.createdAt?.toMillis() ?? 0) > observationPeriod.startTime &&
          (observation.createdAt?.toMillis() ?? 0) < observationPeriod.endTime
      );
      setFilteredObservations(tempArray);
    } else {
      const tempArray = selectedStudentObservations.filter(
        (observation) => (observation.createdAt?.toMillis() ?? 0) > observationPeriod.startTime
      );
      setFilteredObservations(tempArray);
    }
  }, [observationPeriod, selectedStudentObservations]);

  return (
    <>
      <Accordion
        sx={{
          mt: 2,
          "&:before": {
            display: "none",
          },
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box>
            <Typography component="span">{rangeMessage}</Typography>
            <Typography component="span">
              <b>{durationMessage}</b>
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <ObservationPeriodInfoBar
            filteredObservations={filteredObservations}
            observationPeriod={observationPeriod}
          />
          {filteredObservations &&
            filteredObservations.map((observation) => (
              <ObservationCard key={observation.id} observation={observation} />
            ))}
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default ObservationPeriodAccordion;
