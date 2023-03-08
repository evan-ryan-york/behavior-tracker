import { atom, selector, GetRecoilValue } from "recoil";
import { ReplacementBehavior, ReplacementBehaviorRecord } from "../types/types";
import { BLANK_REPLACEMENT_BEHAVIOR_FORM } from "../libraries/blankForms";

export const replacementBehaviorsObjectGetter = ({ get }: { get: GetRecoilValue }) => {
  const replacementBehaviors = get(replacementBehaviorsAtom);
  if (!replacementBehaviors) return null;
  const tempObj: { [key: string]: ReplacementBehaviorRecord } = {};
  replacementBehaviors.forEach((replacementBehavior) => {
    tempObj[replacementBehavior.id] = replacementBehavior;
  });
  return tempObj;
};

export const replacementBehaviorsAtom = atom<ReplacementBehaviorRecord[]>({
  key: "replacementBehaviors",
  default: [],
});

export const replacementBehaviorFormAtom = atom<ReplacementBehavior | ReplacementBehaviorRecord>({
  key: "replacementBehavior",
  default: BLANK_REPLACEMENT_BEHAVIOR_FORM,
});

export const replacementBehaviorsResetAtom = atom({
  key: "replacementBehaviorsReset",
  default: false,
});

export const replacementBehaviorsObjAtom = selector({
  key: "replacementBehaviorsObj",
  get: replacementBehaviorsObjectGetter,
});
