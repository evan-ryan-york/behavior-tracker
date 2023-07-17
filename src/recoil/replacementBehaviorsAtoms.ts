import { atom, selector, GetRecoilValue } from "recoil";
import { LibraryItem, LibraryItemRecord } from "../types/types";
import { BLANK_LIBRARY_ITEM_FORM } from "../libraries/blankForms";

export const replacementBehaviorsObjectGetter = ({ get }: { get: GetRecoilValue }) => {
  const replacementBehaviors = get(replacementBehaviorsAtom);
  if (!replacementBehaviors) return null;
  const tempObj: { [key: string]: LibraryItemRecord } = {};
  replacementBehaviors.forEach((replacementBehavior) => {
    tempObj[replacementBehavior.id] = replacementBehavior;
  });
  return tempObj;
};

export const replacementBehaviorsAtom = atom<LibraryItemRecord[]>({
  key: "replacementBehaviors",
  default: [],
});

export const replacementBehaviorFormAtom = atom<LibraryItem | LibraryItemRecord>({
  key: "replacementBehavior",
  default: BLANK_LIBRARY_ITEM_FORM,
});

export const replacementBehaviorsResetAtom = atom({
  key: "replacementBehaviorsReset",
  default: false,
});

export const replacementBehaviorsObjAtom = selector({
  key: "replacementBehaviorsObj",
  get: replacementBehaviorsObjectGetter,
});
