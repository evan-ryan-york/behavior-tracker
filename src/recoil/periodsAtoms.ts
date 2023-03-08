import { atom, selector, GetRecoilValue } from "recoil";
import { Period, PeriodRecord } from "../types/types";
import { BLANK_PERIOD_FORM } from "../libraries/blankForms";

export const periodsObjectGetter = ({ get }: { get: GetRecoilValue }) => {
  const periods = get(periodsAtom);
  if (!periods) return null;
  const tempObj: { [key: string]: PeriodRecord } = {};
  periods.forEach((period) => {
    tempObj[period.id] = period;
  });
  return tempObj;
};

export const periodsAtom = atom<PeriodRecord[]>({
  key: "periods",
  default: [],
});

export const periodFormAtom = atom<Period | PeriodRecord>({
  key: "periodForm",
  default: BLANK_PERIOD_FORM,
});

export const periodsResetAtom = atom({
  key: "periodsReset",
  default: false,
});

export const periodsObjAtom = selector({
  key: "periodsObjs",
  get: periodsObjectGetter,
});
