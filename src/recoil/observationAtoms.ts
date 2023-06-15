import { atom, selector, GetRecoilValue } from "recoil";
import { BehaviorReports, ObservationPeriodRecord, ObservationRecord } from "../types/types";
import { selectedStudentIdAtom } from "./studentAtoms";
import { behaviorDataDateRangeAtom } from "./behaviorPlansAtoms";
import { behaviorsAtom } from "./behaviorsAtoms";
import { filtersAtom } from "./filtersAtoms";
import {
  getAntecedentsByBehavior,
  getConsequencesByBehavior,
  getFunctionsOfBehaviorByBehavior,
} from "./functions";

type Props = {
  get: GetRecoilValue;
};

export const selectedStudentObservationsGetter = ({ get }: Props) => {
  const selectedStudentId = get(selectedStudentIdAtom);
  const observations = get(observationsAtom);
  if (!observations || !selectedStudentId) return;
  const filteredObservations = observations.filter(
    (observation) => observation.studentId === selectedStudentId
  );
  return filteredObservations;
};

const filterObservationPeriodsByDateGetter = ({ get }: Props) => {
  const dateRange = get(behaviorDataDateRangeAtom);
  const observationPeriods = get(observationPeriodsAtom);
  const [start, end] = dateRange;
  if (!start || !end) return [];
  const filteredObservationPeriods = observationPeriods.filter(
    (observationPeriod) =>
      observationPeriod.startTime > start.toMillis() && observationPeriod.endTime < end.toMillis()
  );
  return filteredObservationPeriods;
};

const filterObservationsByPeriodsGetter = ({ get }: Props) => {
  const filteredObservationPeriods = get(filteredObservationPeriodsByDateAtom);
  const observations = get(observationsAtom);
  if (!filteredObservationPeriods) return [];
  const tempObservations: ObservationRecord[] = [];
  filteredObservationPeriods.forEach((observationPeriod) => {
    const tempObservationsInPeriod = observations.filter(
      (observation) => observation.observationPeriodId === observationPeriod.id
    );
    console.log(tempObservationsInPeriod);
    tempObservations.push(...tempObservationsInPeriod);
  });
  return tempObservations;
};

const observationsGroupedByBehaviorGetter = ({ get }: Props) => {
  const observations = get(filteredObservationsByPeriodsAtom);
  const behaviors = get(behaviorsAtom);
  const filters = get(filtersAtom);
  if (!observations || !behaviors) return;
  const startDateMS = filters.dateRange[0] ? new Date(filters.dateRange[0]).getTime() : 0;
  const endDateMS = filters.dateRange[1] ? new Date(filters.dateRange[1]).getTime() : 9999999999999;
  const observationsForReports = observations.filter(
    (observation) =>
      (observation.createdAt?.toMillis() ?? 0) > startDateMS &&
      (observation.createdAt?.toMillis() ?? 0) < endDateMS
  );

  observationsForReports.forEach((observation) => {
    const createdAt = observation.createdAt?.toMillis() ?? 0;
  });

  const behaviorObj: BehaviorReports = {};
  behaviors.forEach((behavior) => {
    behaviorObj[behavior.id] = {
      label: behavior.label,
      antecedentIds: getAntecedentsByBehavior(observationsForReports, behavior.id),
      consequenceIds: getConsequencesByBehavior(observationsForReports, behavior.id),
      functionsOfBehavior: getFunctionsOfBehaviorByBehavior(observationsForReports, behavior.id),
    };
  });

  return behaviorObj;
};

export const observationsAtom = atom<ObservationRecord[]>({
  key: "observations",
  default: [],
});

export const observationPeriodsAtom = atom<ObservationPeriodRecord[]>({
  key: "observationPeriods",
  default: [],
});

export const observationsResetAtom = atom({
  key: "observationsReset",
  default: false,
});

export const observationPeriodIsActiveAtom = atom({
  key: "observationPeriodIsActive",
  default: false,
});

export const observationsGroupedByBehaviorAtom = selector({
  key: "observationsGroupedByBehavior",
  get: observationsGroupedByBehaviorGetter,
});

export const activeObservationPeriodIdAtom = atom<string | null>({
  key: "activeObservationPeriodId",
  default: null,
});

export const selectedObservationPeriodIdAtom = atom<string | null>({
  key: "selectedObservationPeriodId",
  default: null,
});

export const manageObservationOpenAtom = atom({
  key: "manageObservationOpen",
  default: false,
});

export const manageObservationPeriodOpenAtom = atom({
  key: "manageObservationPeriodOpen",
  default: false,
});

export const observationForEditAtom = atom<ObservationRecord | null>({
  key: "observationForEdit",
  default: null,
});

export const observationPeriodForEditAtom = atom<ObservationPeriodRecord | null>({
  key: "observationPeriodForEdit",
  default: null,
});

export const filteredObservationsByPeriodsAtom = selector({
  key: "filteredObservationsByPeriods",
  get: filterObservationsByPeriodsGetter,
});

export const filteredObservationPeriodsByDateAtom = selector({
  key: "filteredObservationPeriodsByDate",
  get: filterObservationPeriodsByDateGetter,
});
