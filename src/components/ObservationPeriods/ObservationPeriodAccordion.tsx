import React, { useState, useEffect } from "react";
import { ObservationPeriodRecord, ObservationRecord } from "../../types/types";
import { Typography, Box, Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getDifferenceForDisplay, dateRangeForDisplay } from "../../libraries/functions";
import {
  activeObservationPeriodIdAtom,
  observationsAtom,
  selectedObservationPeriodIdAtom,
} from "../../recoil/observationAtoms";
import { useRecoilValue, useSetRecoilState } from "recoil";
import ObservationCard from "./ObservationCard";
import ObservationPeriodInfoBar from "./ObservationPeriodInfoBar";

type Props = {
  observationPeriod: ObservationPeriodRecord;
};

function ObservationPeriodAccordion({ observationPeriod }: Props) {
  const [rangeMessage, setRangeMessage] = useState("");
  const [durationMessage, setDurationMessage] = useState("");
  const selectedStudentObservations = useRecoilValue(observationsAtom);
  const activeObservationPeriodId = useRecoilValue(activeObservationPeriodIdAtom);
  const setSelectedObservationPeriodId = useSetRecoilState(selectedObservationPeriodIdAtom);
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
    setFilteredObservations(
      selectedStudentObservations.filter(
        (observation) => observation.observationPeriodId === observationPeriod.id
      )
    );
  }, [observationPeriod, selectedStudentObservations]);

  const handleAccordionChange = (
    event: React.SyntheticEvent<Element, Event>,
    expanded: boolean
  ) => {
    if (expanded === true) {
      setSelectedObservationPeriodId(observationPeriod.id);
    } else {
      setSelectedObservationPeriodId(null);
    }
  };

  return (
    <>
      <Accordion
        sx={{
          border: activeObservationPeriodId === observationPeriod.id ? "1px solid red" : "none",
          mt: 2,
          "&:before": {
            display: "none",
          },
        }}
        onChange={handleAccordionChange}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box>
            <Typography variant="h6">{observationPeriod.label}</Typography>
            {activeObservationPeriodId === observationPeriod.id && (
              <Typography variant="h6" sx={{ color: "red" }}>
                This is an active session
              </Typography>
            )}
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
