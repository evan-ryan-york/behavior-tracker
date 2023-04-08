import { atom, selector, GetRecoilValue } from "recoil";
import { Strategy, StrategyRecord } from "../types/types";
import { BLANK_STRATEGY_FORM } from "../libraries/blankForms";

export const strategiesObjectGetter = ({ get }: { get: GetRecoilValue }) => {
  const strategies = get(strategiesAtom);
  if (!strategies) return null;
  const tempObj: { [key: string]: StrategyRecord } = {};
  strategies.forEach((strategy) => {
    tempObj[strategy.id] = strategy;
  });
  return tempObj;
};

export const strategiesAtom = atom<StrategyRecord[]>({
  key: "strategies",
  default: [],
});

export const strategyFormAtom = atom<Strategy | StrategyRecord>({
  key: "strategyForm",
  default: BLANK_STRATEGY_FORM,
});

export const strategiesResetAtom = atom({
  key: "strategiesReset",
  default: false,
});

export const strategiesObjAtom = selector({
  key: "strategiesObj",
  get: strategiesObjectGetter,
});
