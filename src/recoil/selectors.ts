import { GetRecoilValue } from "recoil";
import { BehaviorReports, ObservationRecord } from "../types/types";
import { behaviorsAtom } from "./behaviorsAtoms";
import { filtersAtom } from "./filtersAtoms";
import { observationsAtom } from "./observationAtoms";
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

