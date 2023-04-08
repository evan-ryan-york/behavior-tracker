import { atom, selector, GetRecoilValue } from "recoil";
import { ObservationPeriod, ObservationRecord } from "../types/types";
import { selectedStudentIdAtom } from "./studentAtoms";
import { observationsGroupedByBehaviorGetter } from "./selectors";

export const selectedStudentObservationsGetter = ({ get }: { get: GetRecoilValue }) => {
  const selectedStudentId = get(selectedStudentIdAtom);
  const observations = get(observationsAtom);
  if (!observations || !selectedStudentId) return;
  const filteredObservations = observations.filter(
    (observation) => observation.studentId === selectedStudentId
  );
  return filteredObservations;
};

export const observationsAtom = atom<ObservationRecord[]>({
  key: "observations",
  default: [],
});

export const observationPeriodsAtom = atom<ObservationPeriod[]>({
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
