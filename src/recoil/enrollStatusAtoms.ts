import { atom, selector, GetRecoilValue } from "recoil";
import { EnrollStatus, EnrollStatusRecord } from "../types/types";
import { BLANK_ENROLL_STATUS_FORM } from "../libraries/blankForms";

export const enrollStatusesObjGetter = ({ get }: { get: GetRecoilValue }) => {
  const enrollStatuses = get(enrollStatusesAtom);
  if (!enrollStatuses) return null;
  const tempObj: { [key: string]: EnrollStatusRecord } = {};
  enrollStatuses.forEach((enrollStatus) => {
    tempObj[enrollStatus.id] = enrollStatus;
  });
  return tempObj;
};

export const enrollStatusesAtom = atom<EnrollStatusRecord[]>({
  key: "enrollStatuses",
  default: [],
});

export const enrollStatusFormAtom = atom<EnrollStatus | EnrollStatusRecord>({
  key: "enrollStatusForm",
  default: BLANK_ENROLL_STATUS_FORM,
});

export const enrollStatusesResetAtom = atom({
  key: "enrollStatusesReset",
  default: false,
});

export const enrollStatusesObjAtom = selector({
  key: "enrollStatusesObj",
  get: enrollStatusesObjGetter,
});
