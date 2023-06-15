import {
  Alert,
  Box,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { behaviorPlanFormAtom } from "../../recoil/behaviorPlansAtoms";
import { selectedStudentAtom } from "../../recoil/studentAtoms";
import { behaviorsObjAtom } from "../../recoil/behaviorsAtoms";
import { filteredObservationsByPeriodsAtom } from "../../recoil/observationAtoms";
import { observationPeriodsAtom } from "../../recoil/observationAtoms";
import { makeUnique, createFrequencyMessage } from "../../libraries/functions";

type Props = {
  behaviorPlanStage: number;
  setBehaviorPlanStage: (pV: number) => void;
};

function MeasureForm({ behaviorPlanStage, setBehaviorPlanStage }: Props) {
  const [planForm, setPlanForm] = useRecoilState(behaviorPlanFormAtom);
  const selectedStudent = useRecoilValue(selectedStudentAtom);
  const behaviorsObj = useRecoilValue(behaviorsObjAtom);
  const filteredObservations = useRecoilValue(filteredObservationsByPeriodsAtom);
  const observationPeriods = useRecoilValue(observationPeriodsAtom);
  const [frequencyMessage, setFrequencyMessage] = useState<string | null>(null);

  useEffect(() => {
    if (
      !filteredObservations ||
      !observationPeriods ||
      !selectedStudent ||
      !behaviorsObj ||
      !planForm.targetBehavior
    )
      return;
    const observationPeriodIds = filteredObservations.map(
      (observation) => observation.observationPeriodId
    );
    const uniqueObservationPeriodIds = makeUnique(observationPeriodIds);
    let tempTime = 0;
    uniqueObservationPeriodIds.forEach((observationPeriodId) => {
      const currentObservationPeriod = observationPeriods.find(
        (observationPeriod) => observationPeriod.id === observationPeriodId
      );
      if (!currentObservationPeriod) return;
      tempTime += currentObservationPeriod.endTime - currentObservationPeriod.startTime;
    });
    const tempMessage = createFrequencyMessage({
      instances: filteredObservations.length,
      milliseconds: tempTime,
    });
    setFrequencyMessage(
      `${selectedStudent.firstName} is currently ${
        behaviorsObj[planForm.targetBehavior].label
      } ${tempMessage}`
    );
  }, [filteredObservations, observationPeriods, selectedStudent, behaviorsObj, planForm]);

  const handleMethodChange = (event: SelectChangeEvent) => {
    setPlanForm((pV) => ({ ...pV, measureMethod: event.target.value as "Frequency" | "Interval" }));
  };

  const handleFrequencyNumeratorChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPlanForm((pV) => ({ ...pV, frequencyNumerator: Number(event.target.value) }));
  };

  const handleFrequencyDenominatorChnage = (event: SelectChangeEvent) => {
    setPlanForm((pV) => ({
      ...pV,
      frequencyDenominator: event.target.value as "Day" | "Hour" | "Week",
    }));
  };
  return (
    <>
      {behaviorsObj && selectedStudent && behaviorPlanStage > 1 && (
        <>
          <Typography sx={{ mt: 4 }} variant="h4">
            Stage 3: Measures of Success
          </Typography>
          <Grid container>
            <Grid item xs={12} sm={6} md={8}>
              <Typography variant="h6" sx={{ mt: 2 }}>
                How would you like to measure whether this behavior plan is successful?
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Select
                fullWidth
                onChange={handleMethodChange}
                value={planForm.measureMethod}
                sx={{ mt: 1 }}
              >
                <MenuItem value="Frequency">How Frequent a Behavior Happens</MenuItem>
                <MenuItem value="Interval">How Long a Behavior Lasts</MenuItem>
              </Select>
            </Grid>
          </Grid>
          {planForm.measureMethod === "Frequency" && (
            <>
              <Typography variant="h6" sx={{ mt: 2 }}>
                Set the Frequency You Want to See the Behavior Reach
              </Typography>
              <Alert severity="info">{frequencyMessage}</Alert>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "8px",
                  mt: 2,
                  mb: 2,
                }}
              >
                <Typography>
                  This behavior plan will be successfully met when {selectedStudent.firstName}{" "}
                  {behaviorsObj[planForm.targetBehavior].label}'s no more than
                </Typography>
                <TextField
                  onChange={handleFrequencyNumeratorChange}
                  type="number"
                  value={planForm.frequencyNumerator > 0 ? planForm.frequencyNumerator : ""}
                />
                <Typography> times per </Typography>
                <Select
                  onChange={handleFrequencyDenominatorChnage}
                  value={planForm.frequencyDenominator}
                >
                  <MenuItem value="Hour">Hour</MenuItem>
                  <MenuItem value="Day">Day</MenuItem>
                  <MenuItem value="Week">Week</MenuItem>
                </Select>
              </Box>
            </>
          )}
        </>
      )}
    </>
  );
}

export default MeasureForm;
