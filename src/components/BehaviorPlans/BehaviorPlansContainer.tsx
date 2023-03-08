import { Box } from "@mui/material";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { selectedStudentBehaviorPlansAtom } from "../../recoil/behaviorPlansAtoms";
import PlanFormDialog from "../PlanForm/PlanFormDialog";
import BehaviorPlanCard from "./BehaviorPlanCard";
import BehaviorPlansHeader from "./BehaviorPlansHeader";

function BehaviorPlansContainer() {
  const [newPlanOpen, setNewPlanOpen] = useState(false);
  const behaviorPlans = useRecoilValue(selectedStudentBehaviorPlansAtom);

  return (
    <>
      <BehaviorPlansHeader setNewPlanOpen={setNewPlanOpen} />
      <PlanFormDialog open={newPlanOpen} setOpen={setNewPlanOpen} />
      <Box sx={{mt: 4}}>
        {behaviorPlans &&
          behaviorPlans.map((behaviorPlan) => <BehaviorPlanCard behaviorPlan={behaviorPlan} />)}
      </Box>
    </>
  );
}

export default BehaviorPlansContainer;
