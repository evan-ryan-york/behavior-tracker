import React, { useState, useEffect } from "react";
import useTimer from "../../hooks/useTimer";
import { getDatabase, ref, onValue } from "firebase/database";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { organizationAtom } from "../../recoil/organizationAtoms";
import { selectedStudentIdAtom } from "../../recoil/studentAtoms";
import { loggedInStaffAtom } from "../../recoil/staffAtoms";
import { formatTime } from "../../libraries/functions";
import {
  activeObservationPeriodIdAtom,
  observationPeriodIsActiveAtom,
  observationPeriodsAtom,
} from "../../recoil/observationAtoms";
import { Button, Grid, Typography } from "@mui/material";
import { ObservationPeriodRecord } from "../../types/types";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const TimerContainer = () => {
  const [observationPeriods, setObservationPeriods] = useRecoilState(observationPeriodsAtom);
  const [isLoading, setIsLoading] = useState(true);
  const organization = useRecoilValue(organizationAtom);
  const selectedStudentId = useRecoilValue(selectedStudentIdAtom);
  const loggedInStaff = useRecoilValue(loggedInStaffAtom);
  const setObservationPeriodIsActive = useSetRecoilState(observationPeriodIsActiveAtom);
  const setActiveObservationPeriodId = useSetRecoilState(activeObservationPeriodIdAtom);
  const { width } = useWindowDimensions();

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
        setActiveObservationPeriodId(observationPeriod.id);
      }
    });
    setIsLoading(false);
  }, [observationPeriods, handleSet, setActiveObservationPeriodId]);

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
      const keysArray = Object.keys(data);
      const tempArray: ObservationPeriodRecord[] = [];
      keysArray.forEach((key) => {
        tempArray.push({
          ...data[key],
          id: key,
        });
      });
      if (!data) return;
      tempArray.sort((a, b) => b.startTime - a.startTime);
      setObservationPeriods(tempArray);
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
      <Grid
        container
        spacing={0}
        justifyContent={"space-between"}
        sx={{
          mt: 2,
          padding: 2,
          border: isActive ? "2px dashed red" : "none",
        }}
      >
        {!isLoading && (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <div >
              {!isActive ? (
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  sx={{ height: "100%" }}
                  onClick={handleStartClick}
                >
                  Start Timed Observation Session
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ height: "100%" }}
                  onClick={handleStopClick}
                  disabled={!isActive}
                  fullWidth
                >
                  Stop
                </Button>
              )}
            </div>
          </Grid>
        )}

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Typography sx={{ textAlign: width > 600 ? "right" : "center" }} variant="h4">
            {formatTime(timer)}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default TimerContainer;
