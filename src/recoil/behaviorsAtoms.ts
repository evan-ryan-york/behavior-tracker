import { atom, selector, GetRecoilValue } from "recoil";
import { Behavior, BehaviorRecord } from "../types/types";
import { BLANK_LABEL_FORM } from "../libraries/blankForms";

export const behaviorsObjectGetter = ({ get }: { get: GetRecoilValue }) => {
  const behaviors = get(behaviorsAtom);
  if (!behaviors) return null;
  const tempObj: { [key: string]: BehaviorRecord } = {};
  behaviors.forEach((behavior) => {
    tempObj[behavior.id] = behavior;
  });
  return tempObj;
};

export const behaviorsAtom = atom<BehaviorRecord[]>({
  key: "behaviors",
  default: [],
});

export const behaviorFormAtom = atom<Behavior | BehaviorRecord>({
  key: "behaviorForm",
  default: BLANK_LABEL_FORM,
});

export const behaviorsResetAtom = atom({
  key: "behaviorsReset",
  default: false,
});

export const behaviorsObjAtom = selector({
  key: "behaviorsObj",
  get: behaviorsObjectGetter,
});
