import { atom } from "recoil";
import {
  StaffInterface,
  StaffFromAPIInterface,
  HomeroomInterface,
  StudentInterface,
} from "../interfaces/interfaces";

export const staffAtom = atom<StaffInterface[]>({
  key: "staff",
  default: [],
});

export const loggedInStaffAtom = atom<StaffInterface | null>({
  key: "loggedInStaff",
  default: null,
});

export const staffResetAtom = atom({
  key: "staffReset",
  default: false,
});

export const staffFromAPIAtom = atom<StaffFromAPIInterface[]>({
  key: "staffFromAPI",
  default: [],
});

//****** HOMEROOM ATOMS ******//

export const homeroomsAtom = atom<HomeroomInterface[]>({
  key: "homerooms",
  default: [],
});

//****** STUDENT ATOMS ******//

export const studentsAtom = atom<StudentInterface[]>({
  key: "students",
  default: [],
});
