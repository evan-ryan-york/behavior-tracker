import React, { useState, useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { behaviorsAtom } from "../../recoil/behaviorsAtoms";
import { BehaviorPlan, BehaviorRecord, ReplacementBehaviorRecord } from "../../types/types";
import { replacementBehaviorsAtom } from "../../recoil/replacementBehaviorsAtoms";
import { observationsAtom } from "../../recoil/observationAtoms";
import { BLANK_PLAN_FORM } from "../../libraries/blankForms";
import useAddDoc from "../../hooks/useAddDoc";
import { selectedStudentIdAtom } from "../../recoil/studentAtoms";
import { organizationAtom } from "../../recoil/organizationAtoms";
import { behaviorPlansResetAtom } from "../../recoil/behaviorPlansAtoms";
import DataSelectForm from "./DataSelectForm";
import BehaviorSelectForm from "./BehaviorSelectForm";
import { BEHAVIOR_PLAN_STEPS } from "../../libraries/objects";
import StrategiesForm from "./StrategiesForm";
import MeasureForm from "./MeasureForm";

type Props = {
  setOpen: (value: boolean) => void;
  selectedMenuItem: string;
};

function PlanForm({ setOpen, selectedMenuItem }: Props) {
  const [planForm, setPlanForm] = useState<BehaviorPlan>(BLANK_PLAN_FORM);
  const [stepNumber, setStepNumber] = useState<number>(1);
  const [dataDateRange, setDataDateRange] = useState<[string | null, string | null]>([null, null]);
  const [behaviorsForForm, setBehaviorsForForm] = useState<BehaviorRecord[]>([]);
  const { sendRequest: addDoc } = useAddDoc();
  const observations = useRecoilValue(observationsAtom);
  const behaviors = useRecoilValue(behaviorsAtom);
  const selectedStudentId = useRecoilValue(selectedStudentIdAtom);
  const organization = useRecoilValue(organizationAtom);
  const replacementBehaviors = useRecoilValue(replacementBehaviorsAtom);
  const [fitleredReplacementBehaviors, setFilteredReplacementBehaviors] = useState<
    ReplacementBehaviorRecord[]
  >([]);
  const setBehaviorPlansReset = useSetRecoilState(behaviorPlansResetAtom);

  useEffect(() => {
    if (!observations || !behaviors) return;
    const tempArray: BehaviorRecord[] = [];
    behaviors.forEach((behavior) => {
      const behaviorCount = observations.filter((observation) =>
        observation.behaviors.includes(behavior.id)
      );
      const label = behavior.label + " " + behaviorCount.length;
      tempArray.push({ ...behavior, label: label });
    });
    setBehaviorsForForm(tempArray);
  }, [behaviors, observations]);

  useEffect(() => {
    switch (selectedMenuItem) {
      case BEHAVIOR_PLAN_STEPS.STEP_ONE:
        setStepNumber(1);
        break;
      case BEHAVIOR_PLAN_STEPS.STEP_TWO:
        setStepNumber(2);
        break;
      case BEHAVIOR_PLAN_STEPS.STEP_THREE:
        setStepNumber(3);
        break;
      case BEHAVIOR_PLAN_STEPS.STEP_FOUR:
        setStepNumber(4);
        break;
      default:
        setStepNumber(1);
    }
  }, [selectedMenuItem]);

  const handleSubmit = async () => {
    if (!selectedStudentId || !organization) return;
    await addDoc({
      col: "behaviorPlans",
      data: { ...planForm, studentId: selectedStudentId, organizationId: organization.id },
    });
    setPlanForm(BLANK_PLAN_FORM);
    setOpen(false);
    setBehaviorPlansReset((pV) => !pV);
  };

  useEffect(() => {
    if (!replacementBehaviors || !planForm) return;
    const tempFilteredBehaviors = replacementBehaviors.filter(
      (behavior) => behavior.behaviorId === planForm.targetBehavior
    );
    setFilteredReplacementBehaviors(tempFilteredBehaviors);
  }, [replacementBehaviors, planForm]);

  return (
    <>
      {<DataSelectForm dataDateRange={dataDateRange} setDataDateRange={setDataDateRange} />}
      {stepNumber > 1 && (
        <BehaviorSelectForm
          planForm={planForm}
          setPlanForm={setPlanForm}
          setOpen={setOpen}
          behaviorsForForm={behaviorsForForm}
          fitleredReplacementBehaviors={fitleredReplacementBehaviors}
        />
      )}
      {stepNumber > 2 && (
        <StrategiesForm setOpen={setOpen} planForm={planForm} setPlanForm={setPlanForm} />
      )}
      {stepNumber > 3 && <MeasureForm handleSubmit={handleSubmit} />}
    </>
  );
}

export default PlanForm;
