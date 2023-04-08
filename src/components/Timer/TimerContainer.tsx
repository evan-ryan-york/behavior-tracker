import React, { useState, useEffect } from "react";
import useTimer from "../../hooks/useTimer";
import { getDatabase, ref, onValue } from "firebase/database";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { organizationAtom } from "../../recoil/organizationAtoms";
import { selectedStudentIdAtom } from "../../recoil/studentAtoms";
import { loggedInStaffAtom } from "../../recoil/staffAtoms";
import { formatTime } from "../../libraries/functions";
import {
  observationPeriodIsActiveAtom,
  observationPeriodsAtom,
} from "../../recoil/observationAtoms";
import { Box, Button, Typography } from "@mui/material";

const Timer = () => {
  const [observationPeriods, setObservationPeriods] = useRecoilState(observationPeriodsAtom);
  const [isLoading, setIsLoading] = useState(true);
  const organization = useRecoilValue(organizationAtom);
  const selectedStudentId = useRecoilValue(selectedStudentIdAtom);
  const loggedInStaff = useRecoilValue(loggedInStaffAtom);
  const setObservationPeriodIsActive = useSetRecoilState(observationPeriodIsActiveAtom);

  const { timer, isActive, handleStart, handleStop, handleSet } = useTimer(0);

  useEffect(() => {
    setObservationPeriodIsActive(isActive);
  }, [isActive, setObservationPeriodIsActive]);

  useEffect(() => {
    if (!observationPeriods) return;
    observationPeriods.forEach((observationPeriod) => {
      if (observationPeriod.endTime === 0) {
        const difference = Date.now() - observationPeriod.startTime;
        handleSet(Math.round(difference / 1000));
      }
    });
    setIsLoading(false);
  }, [observationPeriods, handleSet]);

  useEffect(() => {
    if (!selectedStudentId || !organization || !loggedInStaff) return;
    const db = getDatabase();
    const observationPeriodsRef = ref(
      db,
      `observationPeriods/${organization.id}/${selectedStudentId}`
    );
    onValue(observationPeriodsRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return;
      setObservationPeriods(data);
    });
  }, [selectedStudentId, organization, loggedInStaff, setObservationPeriods]);

  const handleStartClick = () => {
    if (!selectedStudentId || !organization || !loggedInStaff || isLoading) return;
    handleStart({
      studentId: selectedStudentId,
      organizationId: organization.id,
      authorId: loggedInStaff.id,
      observationWindows: observationPeriods,
    });
  };

  const handleStopClick = () => {
    handleStop(observationPeriods);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 2,
          padding: 2,
          border: isActive ? "2px dashed red" : "none",
        }}
      >
        {!isLoading && (
          <div className="buttons">
            {!isActive ? (
              <Button
                variant="contained"
                color="secondary"
                sx={{ height: "100%" }}
                onClick={handleStartClick}
              >
                Start Observation Session
              </Button>
            ) : (
              <Button
                variant="contained"
                color="secondary"
                sx={{ height: "100%" }}
                onClick={handleStopClick}
                disabled={!isActive}
              >
                Stop
              </Button>
            )}
          </div>
        )}
        <Typography variant="h4">{formatTime(timer)}</Typography>
      </Box>
    </>
  );
};

export default Timer;
