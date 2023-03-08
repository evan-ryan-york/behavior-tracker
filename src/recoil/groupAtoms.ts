import { atom, selector, GetRecoilValue } from "recoil";
import { Group, GroupRecord } from "../types/types";
import { BLANK_GROUP_FORM } from "../libraries/blankForms";
import { loggedInStaffAtom } from "./staffAtoms";

export const groupsObjectGetter = ({ get }: { get: GetRecoilValue }) => {
  const groups = get(groupsAtom);
  if (!groups) return null;
  const tempObj: { [key: string]: GroupRecord } = {};
  groups.forEach((group) => {
    tempObj[group.id] = group;
  });
  return tempObj;
};

export const availableGroupsGetter = ({ get }: { get: GetRecoilValue }) => {
  const groups = get(groupsAtom);
  const loggedInStaff = get(loggedInStaffAtom);
  if (!groups || !loggedInStaff) return null;
  return groups.filter((group) => loggedInStaff.groupIds.includes(group.id));
};

export const groupsAtom = atom<GroupRecord[]>({
  key: "groups",
  default: [],
});

export const selectedGroupIdAtom = atom({
  key: "selectedGroupId",
  default: "",
});

export const availableGroupsAtom = selector({
  key: "availableGroups",
  get: availableGroupsGetter,
});

export const groupFormAtom = atom<Group | GroupRecord>({
  key: "groupForm",
  default: BLANK_GROUP_FORM,
});

export const groupsResetAtom = atom({
  key: "groupsReset",
  default: false,
});

export const groupsObjAtom = selector({
  key: "groupsObj",
  get: groupsObjectGetter,
});
