import { atom } from "recoil";
import { GetRecoilValue } from "recoil";
import { BLANK_STAFF_FORM } from "../libraries/blankForms";

import { LeadRecord, Staff } from "../types/types";

export const leadsAtom = atom<LeadRecord[]>({
  key: "leads",
  default: [],
});

export const signupFormAtom = atom<Staff>({
  key: "signupForm",
  default: BLANK_STAFF_FORM,
});
