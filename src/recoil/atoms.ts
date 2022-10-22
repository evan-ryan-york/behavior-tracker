import { atom } from "recoil";
import { StaffInterface } from "../interfaces/interfaces";

export const staffAtom = atom<StaffInterface[]>({
  key: "staff",
  default: [],
});

export const loggedInStaffAtom = atom<StaffInterface | null>({
  key: "loggedInStaff",
  default: null,
})

export const staffResetAtom = atom({
  key: "staffReset",
  default: false,
});
