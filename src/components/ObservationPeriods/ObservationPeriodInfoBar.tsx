import { useState, useEffect } from "react";
import { Box, Typography, Button, Chip, Avatar } from "@mui/material";
import { ObservationPeriodRecord, ObservationRecord } from "../../types/types";
import ObservationPeriodDelete from "./ObservationPeriodDelete";
import { getDifferenceForDisplay } from "../../libraries/functions";
import { behaviorsAtom } from "../../recoil/behaviorsAtoms";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  manageObservationOpenAtom,
  manageObservationPeriodOpenAtom,
  observationPeriodForEditAtom,
} from "../../recoil/observationAtoms";

type Props = {
  filteredObservations: ObservationRecord[];
  observationPeriod: ObservationPeriodRecord;
};

type BehaviorCounter = {
  label: string;
  counter: number;
  id: string;
};

function ObservationPeriodInfoBar({ filteredObservations, observationPeriod }: Props) {
  const setManageObservationOpen = useSetRecoilState(manageObservationOpenAtom);
  const setManageObservationPeriodOpen = useSetRecoilState(manageObservationPeriodOpenAtom);
  const setObservationPeriodForEdit = useSetRecoilState(observationPeriodForEditAtom);
  const behaviors = useRecoilValue(behaviorsAtom);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const deleteObservationPeriod = () => {
    setDeleteOpen(true);
  };
  const [behaviorCounters, setBehaviorCounters] = useState<BehaviorCounter[]>([]);

  useEffect(() => {
    const tempBehaviorCounters: BehaviorCounter[] = [];
    behaviors.forEach((behavior) => {
      tempBehaviorCounters.push({
        id: behavior.id,
        counter: 0,
        label: behavior.label,
      });
    });
    filteredObservations.forEach((observation) => {
      observation.behaviors.forEach((behavior) => {
        const index = tempBehaviorCounters.findIndex((counter) => counter.id === behavior);
        if (index > -1) {
          tempBehaviorCounters[index].counter++;
        }
      });
    });
    const behaviorCountersToSet = tempBehaviorCounters.filter(
      (behaviorCounter) => behaviorCounter.counter > 0
    );
    setBehaviorCounters(behaviorCountersToSet);
  }, [behaviors, filteredObservations]);

  const difference = observationPeriod.endTime - observationPeriod.startTime;
  const differenceForDisplay = getDifferenceForDisplay(difference);

  const handleEditObservationPeriodClick = () => {
    setObservationPeriodForEdit(observationPeriod);
    setManageObservationPeriodOpen(true);
  };

  const handleNewObservationClick = () => {
    setManageObservationOpen(true);
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography>{`Number of Observations: ${filteredObservations.length} over the time period of ${differenceForDisplay}`}</Typography>
        <Box>
          <Button
            sx={{ mr: 2 }}
            variant="contained"
            color="secondary"
            onClick={handleEditObservationPeriodClick}
          >
            Edit Observation Session
          </Button>
          <Button variant="contained" color="error" onClick={deleteObservationPeriod}>
            Delete Observation Session
          </Button>
        </Box>
      </Box>
      <Box>
        <Typography sx={{ mb: 1 }}>
          <b>Behavior Count During Observation Session:</b>
        </Typography>
        {behaviorCounters.map((behaviorCounter) => (
          <Chip
            sx={{ mr: 1 }}
            key={behaviorCounter.id}
            label={behaviorCounter.label}
            avatar={<Avatar>{behaviorCounter.counter}</Avatar>}
          />
        ))}
      </Box>
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" sx={{ padding: 2 }} onClick={handleNewObservationClick}>
          New Observation
        </Button>
      </Box>
      <Typography sx={{ mt: 2 }}>
        <b>Existing Observations In This Session:</b>
      </Typography>
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
