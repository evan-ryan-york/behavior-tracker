import { atom } from "recoil";
import { BehaviorPlan, BehaviorPlanRecord } from "../types/types";
import { DateTime } from "luxon";
import { BLANK_PLAN_FORM } from "../libraries/blankForms";

export const behaviorPlansAtom = atom<BehaviorPlanRecord[]>({
  key: "behaviorPlans",
  default: [],
});

export const behaviorPlansResetAtom = atom({
  key: "behaviorPlanReset",
  default: false,
});

export const behaviorDataDateRangeAtom = atom<[DateTime | null, DateTime | null]>({
  key: "behaviorDataDateRange",
  default: [DateTime.now().minus({ month: 1 }), DateTime.now()],
});

export const behaviorPlanFormAtom = atom<BehaviorPlan | BehaviorPlanRecord>({
  key: "behaviorPlanForm",
  default: BLANK_PLAN_FORM,
});
