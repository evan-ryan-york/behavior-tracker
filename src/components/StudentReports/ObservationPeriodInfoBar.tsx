import { useState, useEffect } from "react";
import { Box, Typography, Button, Chip, Avatar } from "@mui/material";
import { ObservationPeriod, ObservationRecord } from "../../types/types";
import ObservationPeriodDelete from "./ObservationPeriodDelete";
import { getDifferenceForDisplay } from "../../libraries/functions";
import { behaviorsAtom } from "../../recoil/behaviorsAtoms";
import { useRecoilValue } from "recoil";
import ObservationPeriodEdit from "./ObservationPeriodEdit";

type Props = {
  filteredObservations: ObservationRecord[];
  observationPeriod: ObservationPeriod;
};

type BehaviorCounter = {
  label: string;
  counter: number;
  id: string;
};

function ObservationPeriodInfoBar({ filteredObservations, observationPeriod }: Props) {
  const behaviors = useRecoilValue(behaviorsAtom);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const deleteObservationPeriod = () => {
    setDeleteOpen(true);
  };
  const editObservationPeriod = () => {
    setEditOpen(true);
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

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography>{`Number of Observations: ${filteredObservations.length} over the time period of ${differenceForDisplay}`}</Typography>
        <Box>
          <Button
            sx={{ mr: 2 }}
            variant="contained"
            color="secondary"
            onClick={editObservationPeriod}
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
          <b>Behavior Count During Observation Period:</b>
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
      <ObservationPeriodDelete
        observationPeriod={observationPeriod}
        open={deleteOpen}
        setOpen={setDeleteOpen}
        filteredObservations={filteredObservations}
      />
      <ObservationPeriodEdit
        observationPeriod={observationPeriod}
        open={editOpen}
        setOpen={setEditOpen}
        filteredObservations={filteredObservations}
      />
    </>
  );
}

export default ObservationPeriodInfoBar;
