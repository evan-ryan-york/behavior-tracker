import { useState, useRef } from "react";
import { getDatabase, ref, set } from "firebase/database";
import { ObservationPeriod } from "../types/types";

type StartProps = {
  studentId: string;
  organizationId: string;
  authorId: string;
  observationWindows: ObservationPeriod[];
};

type WriteToRTDBProps = {
  organizationId: string;
  studentId: string;
  authorId: string;
  data: ObservationPeriod[];
};

const useTimer = (initialState: number = 0) => {
  const [timer, setTimer] = useState<number>(initialState);
  const [isActive, setIsActive] = useState(false);
  //   const [isPaused, setIsPaused] = useState(false);
  const countRef = useRef<NodeJS.Timer>();

  function writeToRTDB({ organizationId, authorId, studentId, data }: WriteToRTDBProps) {
    const db = getDatabase();
    set(ref(db, `observationPeriods/${organizationId}/${studentId}`), data);
  }

  const handleStart = ({ studentId, organizationId, authorId, observationWindows }: StartProps) => {
    setIsActive(true);
    // setIsPaused(true);
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
    const currentObservationWindows = [...observationWindows];
    currentObservationWindows.push({
      studentId: studentId,
      organizationId: organizationId,
      authorId: authorId,
      startTime: Date.now(),
      endTime: 0,
      label: "",
    });
    writeToRTDB({
      studentId,
      organizationId,
      authorId,
      data: currentObservationWindows,
    });
  };

  //   const handlePause = () => {
  //     clearInterval(countRef.current);
  //     setIsPaused(false);
  //   };

  //   const handleResume = () => {
  //     setIsPaused(true);
  //     countRef.current = setInterval(() => {
  //       setTimer((timer) => timer + 1);
  //     }, 1000);
  //   };

  const handleSet = (seconds: number) => {
    clearInterval(countRef.current);
    setIsActive(true);
    // setIsPaused(false);
    setTimer(seconds);
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  };

  //   const handleReset = () => {
  //     clearInterval(countRef.current);
  //     setIsActive(false);
  //     setIsPaused(false);
  //     setTimer(0);
  //   };

  const handleStop = (observationPeriods: ObservationPeriod[]) => {
    clearInterval(countRef.current);
    setIsActive(false);
    // setIsPaused(false);
    setTimer(0);
    const activeIndex = observationPeriods.findIndex(
      (observationPeriod) => observationPeriod.endTime === 0
    );
    if (activeIndex > -1) {
      const mutableArray = [...observationPeriods];
      const activePeriod = observationPeriods[activeIndex];
      const updatedPeriod = { ...activePeriod, endTime: Date.now() };
      mutableArray.splice(activeIndex, 1);
      mutableArray.push(updatedPeriod);

      writeToRTDB({
        studentId: activePeriod.studentId,
        organizationId: activePeriod.organizationId,
        authorId: activePeriod.authorId,
        data: mutableArray,
      });
    }
  };

  return {
    timer,
    isActive,
    handleStart,
    handleSet,
    handleStop,
  };
};

export default useTimer;
