import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { behaviorDataDateRangeAtom } from "../recoil/behaviorPlansAtoms";
import { filteredObservationPeriodsByDateAtom, observationsAtom } from "../recoil/observationAtoms";
import { behaviorsObjAtom } from "../recoil/behaviorsAtoms";
import { selectedStudentAtom } from "../recoil/studentAtoms";
import { DateTime } from "luxon";
import { createWeeksObj } from "../libraries/functions";

const useCalculateGoalFrequency = () => {
  const filteredObservationPeriodsByDate = useRecoilValue(filteredObservationPeriodsByDateAtom);
  const selectedStudent = useRecoilValue(selectedStudentAtom);
  const behaviorsObj = useRecoilValue(behaviorsObjAtom);
  const behaviorDataDateRange = useRecoilValue(behaviorDataDateRangeAtom);
  const observations = useRecoilValue(observationsAtom);

  const calculateGoalFrequency = useCallback(
    (targetBehaviorId: string) => {
      if (
        !selectedStudent ||
        !behaviorsObj ||
        !behaviorsObj[targetBehaviorId] ||
        !behaviorDataDateRange ||
        !filteredObservationPeriodsByDate ||
        !observations
      )
        return [];
      const MILLIS_IN_HOUR = 3600000;
      const weeksObjArray = createWeeksObj(behaviorDataDateRange);
      weeksObjArray.forEach((weekObj, index) => {
        const observationPeriodsInWeek = filteredObservationPeriodsByDate.filter(
          (observationPeriod) =>
            DateTime.fromMillis(observationPeriod.startTime).weekNumber === weekObj.weekNumber
        );
        let totalIncidents = 0;
        let totalLengthInMS = 0;
        observationPeriodsInWeek.forEach((observationPeriod) => {
          const currentObservations = observations.filter(
            (observation) =>
              observation.observationPeriodId === observationPeriod.id &&
              observation.behaviors.includes(targetBehaviorId)
          );
          totalIncidents += currentObservations.length;
          totalLengthInMS += observationPeriod.endTime - observationPeriod.startTime;
        });
        const lengthInHours = totalLengthInMS / MILLIS_IN_HOUR;
        weeksObjArray[index].incidentsPerHour =
          lengthInHours === 0 ? 0 : totalIncidents / lengthInHours;
      });
      return weeksObjArray;
    },
    [
      selectedStudent,
      behaviorsObj,
      behaviorDataDateRange,
      filteredObservationPeriodsByDate,
      observations,
    ]
  );
  return { calculateGoalFrequency };
};

export default useCalculateGoalFrequency;
