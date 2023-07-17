import { atom, selector, GetRecoilValue } from "recoil";
import { LibraryItem, LibraryItemRecord } from "../types/types";
import { BLANK_LIBRARY_ITEM_FORM } from "../libraries/blankForms";

export const strategiesObjectGetter = ({ get }: { get: GetRecoilValue }) => {
  const strategies = get(strategiesAtom);
  if (!strategies) return null;
  const tempObj: { [key: string]: LibraryItemRecord } = {};
  strategies.forEach((strategy) => {
    tempObj[strategy.id] = strategy;
  });
  return tempObj;
};

export const strategiesAtom = atom<LibraryItemRecord[]>({
  key: "strategies",
  default: [],
});

export const strategyFormAtom = atom<LibraryItem | LibraryItemRecord>({
  key: "strategyForm",
  default: BLANK_LIBRARY_ITEM_FORM,
});

export const strategiesResetAtom = atom({
  key: "strategiesReset",
  default: false,
});

export const strategiesObjAtom = selector({
  key: "strategiesObj",
  get: strategiesObjectGetter,
});
