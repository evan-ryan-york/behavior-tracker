import { atom, selector, GetRecoilValue } from "recoil";
import { Student, StudentFileRecord, StudentRecord } from "../types/types";
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

export const selectedStudentGetter = ({ get }: { get: GetRecoilValue }) => {
  const selectedStudentId = get(selectedStudentIdAtom);
  const studentsObj = get(studentsObjAtom);
  if (!selectedStudentId || !studentsObj) return null;
  if (studentsObj[selectedStudentId]) {
    return studentsObj[selectedStudentId];
  } else {
    return null;
  }
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

export const selectedStudentAtom = selector({
  key: "selectedStudent",
  get: selectedStudentGetter,
});

export const studentsResetAtom = atom({
  key: "studentsReset",
  default: false,
});

export const studentFormAtom = atom<Student | StudentRecord>({
  key: "studentForm",
  default: BLANK_STUDENT_FORM,
});

export const studentFilesAtom = atom<StudentFileRecord[]>({
  key: "studentFiles",
  default: [],
});

export const studentFilesResetAtom = atom({
  key: "studentFilesReset",
  default: false,
});
