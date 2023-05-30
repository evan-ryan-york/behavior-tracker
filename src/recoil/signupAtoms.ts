import { atom, selector } from "recoil";
import { GetRecoilValue } from "recoil";
import { BLANK_STAFF_FORM } from "../libraries/blankForms";

import { LeadRecord, PermissionRecord, Staff, StaffRecord } from "../types/types";
// import { staffObjGetter } from "./selectors";

type Props = {
  get: GetRecoilValue;
};

export const leadsAtom = atom<LeadRecord[]>({
  key: "leads",
  default: [],
});

export const signupFormAtom = atom<Staff>({
  key: "signupForm",
  default: BLANK_STAFF_FORM,
});
