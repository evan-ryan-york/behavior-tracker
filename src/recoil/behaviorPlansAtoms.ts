import { atom, selector, GetRecoilValue } from "recoil";
import { BehaviorPlanRecord } from "../types/types";

export const behaviorPlansAtom = atom<BehaviorPlanRecord[]>({
  key: "behaviorPlans",
  default: [],
});

// export const behaviorPlanFormAtom = atom<BehaviorPlan | BehaviorPlanRecord>({
//   key: "behaviorPlanForm",
//   default: BLANK_PLAN_FORM,
// });

export const behaviorPlansResetAtom = atom({
  key: "behaviorPlanReset",
  default: false,
});
