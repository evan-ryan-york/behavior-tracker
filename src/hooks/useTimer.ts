import { useState, useRef } from "react";
import { getDatabase, ref, set, push } from "firebase/database";
import { ObservationPeriod, ObservationPeriodRecord } from "../types/types";
import { useRecoilState } from "recoil";
import { activeObservationPeriodIdAtom } from "../recoil/observationAtoms";

type StartProps = {
  studentId: string;
  organizationId: string;
  authorId: string;
  observationWindows: ObservationPeriod[];
};

type AddToRTDBProps = {
  organizationId: string;
  studentId: string;
  data: ObservationPeriod;
};

type UpdateToRTDBProps = {
  organizationId: string;
  studentId: string;
  periodId: string;
  data: ObservationPeriodRecord;
};

const useTimer = (initialState: number = 0) => {
  const [timer, setTimer] = useState<number>(initialState);
  const [isActive, setIsActive] = useState(false);
  const [activeObservationPeriodId, setActiveObservationPeriodId] = useRecoilState(
    activeObservationPeriodIdAtom
  );
  //   const [isPaused, setIsPaused] = useState(false);
  const countRef = useRef<NodeJS.Timer>();

  const addToRTDB = async ({ organizationId, studentId, data }: AddToRTDBProps) => {
    const db = getDatabase();
    const entryRef = ref(db, `observationPeriods/${organizationId}/${studentId}`);
    const newEntry = await push(entryRef, data);
    return newEntry.key;
  };

  function updateRTDB({ organizationId, studentId, periodId, data }: UpdateToRTDBProps) {
    const db = getDatabase();
    const noId: any = { ...data };
    delete noId.id;
    set(ref(db, `observationPeriods/${organizationId}/${studentId}/${periodId}`), noId);
  }

  const handleStart = async ({
    studentId,
    organizationId,
    authorId,
    observationWindows,
  }: StartProps) => {
    setIsActive(true);
    // setIsPaused(true);
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
    const data = {
      studentId: studentId,
      organizationId: organizationId,
      authorId: authorId,
      startTime: Date.now(),
      endTime: 0,
      label: "Observation Period",
    };
    const periodId = await addToRTDB({
      studentId,
      organizationId,
      data,
    });
    setActiveObservationPeriodId(periodId);
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

  const handleStop = (observationPeriods: ObservationPeriodRecord[]) => {
    clearInterval(countRef.current);
    setIsActive(false);
    // setIsPaused(false);
    setTimer(0);
    const activePeriod = observationPeriods.find(
      (period) => period.id === activeObservationPeriodId
    );
    if (activePeriod) {
      const updatedPeriod = { ...activePeriod, endTime: Date.now() };

      updateRTDB({
        studentId: activePeriod.studentId,
        organizationId: activePeriod.organizationId,
        periodId: activePeriod.id,
        data: updatedPeriod,
      });
    }
    setActiveObservationPeriodId(null);
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
