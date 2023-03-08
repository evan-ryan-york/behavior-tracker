import { atom } from "recoil";
import { Filters } from "../types/types";

export const filtersAtom = atom<Filters>({
  key: "filters",
  default: {
    dateRange: [null, null],
  },
});
