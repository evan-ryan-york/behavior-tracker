import { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { behaviorsAtom } from "../../recoil/behaviorsAtoms";
import { BehaviorRecord } from "../../types/types";
import { filteredObservationsByPeriodsAtom } from "../../recoil/observationAtoms";
import { BLANK_PLAN_FORM } from "../../libraries/blankForms";
import useAddDoc from "../../hooks/useAddDoc";
import { selectedStudentIdAtom } from "../../recoil/studentAtoms";
import { organizationAtom } from "../../recoil/organizationAtoms";
import { behaviorPlanFormAtom, behaviorPlansResetAtom } from "../../recoil/behaviorPlansAtoms";
import BehaviorSelectSection from "./BehaviorSelectSection";
import StrategiesSelectSection from "./StrategiesSelectSection";
import MeasureForm from "./MeasureForm";
import { Button } from "@mui/material";
import useUpdateDoc from "../../hooks/useUpdateDoc";

type Props = {
  setOpen: (value: boolean) => void;
  behaviorPlanStage: number;
  setBehaviorPlanStage: (pV: number) => void;
};

function PlanForm({ setOpen, behaviorPlanStage, setBehaviorPlanStage }: Props) {
  const [planForm, setPlanForm] = useRecoilState(behaviorPlanFormAtom);
  const [behaviorsForForm, setBehaviorsForForm] = useState<BehaviorRecord[]>([]);
  const { sendRequest: addDoc } = useAddDoc();
  const { sendRequest: updateDoc } = useUpdateDoc();
  const filteredObservations = useRecoilValue(filteredObservationsByPeriodsAtom);
  const behaviors = useRecoilValue(behaviorsAtom);
  const selectedStudentId = useRecoilValue(selectedStudentIdAtom);
  const organization = useRecoilValue(organizationAtom);
  const setBehaviorPlansReset = useSetRecoilState(behaviorPlansResetAtom);

  useEffect(() => {
    if (!filteredObservations || !behaviors) return;
    const tempArray: BehaviorRecord[] = [];
    behaviors.forEach((behavior) => {
      const behaviorCount = filteredObservations.filter((observation) =>
        observation.behaviors.includes(behavior.id)
      );
      const label =
        behavior.label +
        ": " +
        behaviorCount.length +
        ` instance${behaviorCount.length === 1 ? "" : "s"} recorded`;
      tempArray.push({ ...behavior, label: label });
    });
    setBehaviorsForForm(tempArray);
  }, [behaviors, filteredObservations]);

  const handleSubmit = async () => {
    if (!selectedStudentId || !organization) return;
    if ("id" in planForm) {
      await updateDoc({ col: "behaviorPlans", id: planForm.id, data: planForm });
    } else {
      await addDoc({
        col: "behaviorPlans",
        data: { ...planForm, studentId: selectedStudentId, organizationId: organization.id },
      });
    }
    setPlanForm(BLANK_PLAN_FORM);
    setOpen(false);
    setBehaviorPlansReset((pV) => !pV);
  };

  return (
    <>
      <BehaviorSelectSection
        setOpen={setOpen}
        behaviorsForForm={behaviorsForForm}
        behaviorPlanStage={behaviorPlanStage}
        setBehaviorPlanStage={setBehaviorPlanStage}
      />
      <StrategiesSelectSection
        setOpen={setOpen}
        behaviorPlanStage={behaviorPlanStage}
        setBehaviorPlanStage={setBehaviorPlanStage}
      />
      <MeasureForm
        behaviorPlanStage={behaviorPlanStage}
        setBehaviorPlanStage={setBehaviorPlanStage}
      />
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        sx={{ padding: 2, mb: 1, mt: 2 }}
        onClick={handleSubmit}
      >
        {"id" in planForm ? "Save Behavior Plan" : "Create Behavior Plan"}
      </Button>
    </>
  );
}

export default PlanForm;
