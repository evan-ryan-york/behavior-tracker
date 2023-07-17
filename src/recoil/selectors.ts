import { GetRecoilValue } from "recoil";
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
