import { GetRecoilValue } from "recoil";
import { BehaviorReports, ObservationRecord } from "../types/types";
import { behaviorsAtom } from "./behaviorsAtoms";
import { filtersAtom } from "./filtersAtoms";
import { selectedStudentObservationsAtom } from "./observationAtoms";
import { studentsAtom } from "./studentAtoms";

type Props = {
  get: GetRecoilValue;
};

export const filteredStudentsGetter = ({ get }: Props) => {
  const students = get(studentsAtom);
  if (!students) return null;
  const filteredStudents = students.filter(
    (student) => student.enrollStatus === "Actively Enrolled"
  );
  return filteredStudents;
};

const getAntecedentsByBehavior = (observations: ObservationRecord[], behavior: string) => {
  const filteredObservations = observations.filter((observation) =>
    observation.behaviors.includes(behavior)
  );
  const antecedents: string[] = [];
  filteredObservations.forEach((observation) => {
    antecedents.push(...observation.antecedents);
  });
  return antecedents;
};

const getConsequencesByBehavior = (observations: ObservationRecord[], behavior: string) => {
  const filteredObservations = observations.filter((observation) =>
    observation.behaviors.includes(behavior)
  );
  const consequences: string[] = [];
  filteredObservations.forEach((observation) => {
    consequences.push(...observation.consequences);
  });
  return consequences;
};

const getFunctionsOfBehaviorByBehavior = (observations: ObservationRecord[], behavior: string) => {
  const filteredObservations = observations.filter((observation) =>
    observation.behaviors.includes(behavior)
  );
  const functionsOfBehavior: string[] = [];
  filteredObservations.forEach((observation) => {
    functionsOfBehavior.push(...observation.functionsOfBehavior);
  });
  return functionsOfBehavior;
};

export const observationsGroupedByBehaviorGetter = ({ get }: Props) => {
  const observations = get(selectedStudentObservationsAtom);
  const behaviors = get(behaviorsAtom);
  const filters = get(filtersAtom);
  if (!observations || !behaviors) return;
  const observationsForReports = observations.filter(
    (observation) =>
      observation.createdAt?.toMillis() ??
      (1 > (filters.dateRange[0] || 0) &&
        (observation.createdAt?.toMillis() ?? 1 < (filters.dateRange[1] || 2)))
  );
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
