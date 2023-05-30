import { atom, selector } from "recoil";
import { GetRecoilValue } from "recoil";
import { BLANK_STAFF_FORM } from "../libraries/blankForms";

import { PermissionRecord, Staff, StaffRecord } from "../types/types";
// import { staffObjGetter } from "./selectors";

type Props = {
  get: GetRecoilValue;
};

const staffObjGetter = ({ get }: Props) => {
  const staff = get(staffAtom);
  if (!staff) return null;
  const tempObj: { [key: string]: StaffRecord } = {};
  staff.forEach((staffMember) => {
    tempObj[staffMember.id] = staffMember;
  });
  return tempObj;
};

const staffPermissionGetter = ({ get }: Props) => {
  const loggedInStaff = get(loggedInStaffAtom);
  const permissions = get(allPermissionsAtom);
  if (!permissions || !loggedInStaff) return;
  const userPermission = permissions.find(
    (permission) => permission.id === loggedInStaff.permissionId
  );
  return userPermission;
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

export const userPermissionAtom = selector({
  key: "userPermission",
  get: staffPermissionGetter,
});

export const selectPermissionsAtom = atom<PermissionRecord[]>({
  key: "selectPermissions",
  default: [],
});

export const allPermissionsAtom = atom<PermissionRecord[]>({
  key: "allPermissionsAtom",
  default: [],
});
