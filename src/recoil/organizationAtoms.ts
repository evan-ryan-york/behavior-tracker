import { atom } from "recoil";
import { OrganizationRecord } from "../types/types";

export const organizationAtom = atom<OrganizationRecord | null>({
  key: "organization",
  default: null,
});

export const organizationResetAtom = atom({
  key: "organizationReset",
  default: false,
});

export const loadingAtom = atom({
  key: "loading",
  default: false,
});
