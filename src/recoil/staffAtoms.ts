import { atom, selector } from "recoil";
import { GetRecoilValue } from "recoil";
import { BLANK_STAFF_FORM } from "../libraries/blankForms";

import { Staff, StaffRecord } from "../types/types";
// import { staffObjGetter } from "./selectors";

type Props = {
  get: GetRecoilValue;
};

export const staffObjGetter = ({ get }: Props) => {
  const staff = get(staffAtom);
  if (!staff) return null;
  const tempObj: { [key: string]: StaffRecord } = {};
  staff.forEach((staffMember) => {
    tempObj[staffMember.id] = staffMember;
  });
  return tempObj;
};

export const staffAtom = atom<StaffRecord[]>({
  key: "staff",
  default: [],
});

export const staffFormAtom = atom<Staff | StaffRecord>({
  key: "staffForm",
  default: BLANK_STAFF_FORM,
});

export const loggedInStaffAtom = atom<StaffRecord | null>({
  key: "loggedInStaff",
  default: null,
});

export const staffResetAtom = atom({
  key: "staffReset",
  default: false,
});

export const staffObjAtom = selector({
  key: "staffObj",
  get: staffObjGetter,
});
