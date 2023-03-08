import { atom, selector, GetRecoilValue } from "recoil";
import { Consequence, ConsequenceRecord } from "../types/types";
import { BLANK_CONSEQUENCE_FORM } from "../libraries/blankForms";

export const consequencesObjectGetter = ({ get }: { get: GetRecoilValue }) => {
  const consequences = get(consequencesAtom);
  if (!consequences) return null;
  const tempObj: { [key: string]: ConsequenceRecord } = {};
  consequences.forEach((consequence) => {
    tempObj[consequence.id] = consequence;
  });
  return tempObj;
};

export const consequencesAtom = atom<ConsequenceRecord[]>({
  key: "consequences",
  default: [],
});

export const consequenceFormAtom = atom<Consequence | ConsequenceRecord>({
  key: "consequenceForm",
  default: BLANK_CONSEQUENCE_FORM,
});

export const consequencesResetAtom = atom({
  key: "consequencesReset",
  default: false,
});

export const consequencesObjAtom = selector({
  key: "consequencesObj",
  get: consequencesObjectGetter,
});
