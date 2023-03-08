import { atom, selector, GetRecoilValue } from "recoil";
import { BehaviorPlanRecord } from "../types/types";
import { selectedStudentIdAtom } from "./studentAtoms";

export const selectedStudentBehaviorPlansGetter = ({ get }: { get: GetRecoilValue }) => {
  const selectedStudentId = get(selectedStudentIdAtom);
  const behaviorPlans = get(behaviorPlansAtom);
  console.log(behaviorPlans);
  if (!behaviorPlans || !selectedStudentId) return;
  const filteredBehaviorPlans = behaviorPlans.filter(
    (behaviorPlan) => behaviorPlan.studentId === selectedStudentId
  );
  console.log(filteredBehaviorPlans);
  return filteredBehaviorPlans;
};

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

export const selectedStudentBehaviorPlansAtom = selector({
  key: "selectedStudentBehaviorPlans",
  get: selectedStudentBehaviorPlansGetter,
});
