import { atom, selector, GetRecoilValue } from "recoil";
import { Antecedent, AntecedentRecord } from "../types/types";
import { BLANK_ANTECEDENT_FORM } from "../libraries/blankForms";

export const antecdentsObjectGetter = ({ get }: { get: GetRecoilValue }) => {
  const antecdents = get(antecedentsAtom);
  if (!antecdents) return null;
  const tempObj: { [key: string]: AntecedentRecord } = {};
  antecdents.forEach((antecdent) => {
    tempObj[antecdent.id] = antecdent;
  });
  return tempObj;
};

export const antecedentsAtom = atom<AntecedentRecord[]>({
  key: "antecedents",
  default: [],
});

export const antecedentFormAtom = atom<Antecedent | AntecedentRecord>({
  key: "antecedentForm",
  default: BLANK_ANTECEDENT_FORM,
});

export const antecedentsResetAtom = atom({
  key: "antecedentsReset",
  default: false,
});

export const antecedentsObjAtom = selector({
  key: "antecedentsObj",
  get: antecdentsObjectGetter,
});
