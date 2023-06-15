import { Typography } from "@mui/material";
import PreventionStrategies from "./PreventionStrategies";
import ReinforcementStrategies from "./ReinforcementStrategies";
import ExtinguishStrategies from "./ExtinguishStrategies";
import { selectedStudentAtom } from "../../recoil/studentAtoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect } from "react";
import { validateCurrentStage } from "../../libraries/functions";
import { behaviorPlanFormAtom } from "../../recoil/behaviorPlansAtoms";

type Props = {
  setOpen: (value: boolean) => void;
  behaviorPlanStage: number;
  setBehaviorPlanStage: (pV: number) => void;
};

function StrategiesSelectSection({ setOpen, behaviorPlanStage, setBehaviorPlanStage }: Props) {
  const selectedStudent = useRecoilValue(selectedStudentAtom);
  const [planForm, setPlanForm] = useRecoilState(behaviorPlanFormAtom);

  useEffect(() => {
    validateCurrentStage({ planForm, setBehaviorPlanStage });
  }, [planForm, setBehaviorPlanStage]);

  return (
    <>
      {behaviorPlanStage > 0 && (
        <>
          <Typography sx={{ mt: 4 }} variant="h4">
            Stage 2: Strategies
          </Typography>
          <Typography
            sx={{ mt: 2 }}
            variant="h5"
          >{`Now We're Going To Select Strategies To Use To Change ${selectedStudent?.firstName} Behavior`}</Typography>
          <PreventionStrategies planForm={planForm} setPlanForm={setPlanForm} />
          {behaviorPlanStage > 0 && (
            <ReinforcementStrategies planForm={planForm} setPlanForm={setPlanForm} />
          )}
          {behaviorPlanStage > 0 && (
            <ExtinguishStrategies planForm={planForm} setPlanForm={setPlanForm} />
          )}
        </>
      )}
    </>
  );
}

export default StrategiesSelectSection;
