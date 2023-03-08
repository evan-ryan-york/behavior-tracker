import { atom, selector, GetRecoilValue } from "recoil";
import { Student, StudentRecord } from "../types/types";
import { BLANK_STUDENT_FORM } from "../libraries/blankForms";

export const studentsObjectGetter = ({ get }: { get: GetRecoilValue }) => {
  const students = get(studentsAtom);
  if (!students) return null;
  const tempObj: { [key: string]: StudentRecord } = {};
  students.forEach((student) => {
    tempObj[student.id] = student;
  });
  return tempObj;
};

export const studentsAtom = atom<StudentRecord[]>({
  key: "students",
  default: [],
});

export const selectedStudentIdAtom = atom<string | null>({
  key: "selectedStudentId",
  default: null,
});

export const studentsObjAtom = selector({
  key: "studentsObj",
  get: studentsObjectGetter,
});

export const studentsResetAtom = atom({
  key: "studentsReset",
  default: false,
});

export const studentFormAtom = atom<Student | StudentRecord>({
  key: "studentForm",
  default: BLANK_STUDENT_FORM,
});
