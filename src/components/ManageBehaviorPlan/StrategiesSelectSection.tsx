import { Typography } from "@mui/material";
import { selectedStudentAtom } from "../../recoil/studentAtoms";
import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import { validateCurrentStage } from "../../libraries/functions";
import { behaviorPlanFormAtom } from "../../recoil/behaviorPlansAtoms";
import LibrarySection from "./LibrarySection";
import { strategiesAtom } from "../../recoil/strategiesAtoms";
import { LibraryItemRecord } from "../../types/types";

type Props = {
  setOpen: (value: boolean) => void;
  behaviorPlanStage: number;
  setBehaviorPlanStage: (pV: number) => void;
};

function StrategiesSelectSection({ setOpen, behaviorPlanStage, setBehaviorPlanStage }: Props) {
  const selectedStudent = useRecoilValue(selectedStudentAtom);
  const planForm = useRecoilValue(behaviorPlanFormAtom);
  const strategies = useRecoilValue(strategiesAtom);
  const [preventionStrategies, setPreventionStrategies] = useState<LibraryItemRecord[]>([]);
  const [extinguishStrategies, setExtinguishStrategies] = useState<LibraryItemRecord[]>([]);
  const [reinforcementStrategies, setReinforicementStrategies] = useState<LibraryItemRecord[]>([]);

  useEffect(() => {
    validateCurrentStage({ planForm, setBehaviorPlanStage });
  }, [planForm, setBehaviorPlanStage]);

  useEffect(() => {
    setPreventionStrategies(strategies.filter((strategy) => strategy.type === "PREVENTION"));
    setExtinguishStrategies(strategies.filter((strategy) => strategy.type === "EXTINGUISH"));
    setReinforicementStrategies(strategies.filter((strategy) => strategy.type === "REINFORCE"));
  }, [strategies]);

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
          <LibrarySection
            title="Prevention Strategies"
            library="preventionStrategies"
            libraryItems={preventionStrategies}
          />
          {behaviorPlanStage > 0 && (
            <LibrarySection
              title="Reinforcement Strategies"
              library="reinforcementStrategies"
              libraryItems={reinforcementStrategies}
            />
          )}
          {behaviorPlanStage > 0 && (
            <LibrarySection
              title="Extinguish Strategies"
              library="extinguishStrategies"
              libraryItems={extinguishStrategies}
            />
          )}
        </>
      )}
    </>
  );
}

export default StrategiesSelectSection;
