import { Dialog, Box, Typography } from "@mui/material";
import { selectedStudentAtom } from "../../recoil/studentAtoms";
import { useRecoilValue } from "recoil";
import { organizationAtom } from "../../recoil/organizationAtoms";
import PlanForm from "./PlanForm";
import { ProgressLabel } from "./ProgressLabel";
import { useState } from "react";
import { BEHAVIOR_PLAN_STAGES } from "../../libraries/objects";

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

export default function ManageBehaviorPlanDialog({ open, setOpen }: Props) {
  const organization = useRecoilValue(organizationAtom);
  const selectedStudent = useRecoilValue(selectedStudentAtom);
  const [behaviorPlanStage, setBehaviorPlanStage] = useState<number>(
    BEHAVIOR_PLAN_STAGES.SELECT_BEHAVIOR
  );

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {selectedStudent && open && organization && (
        <Dialog
          maxWidth="lg"
          fullWidth={true}
          open={open}
          sx={{ margin: window.innerWidth * 0.004 }}
          onClose={handleClose}
        >
          <Box
            sx={{
              textAlign: "center",
              backgroundColor: organization.primaryColor,
              padding: 1,
              color: "white",
            }}
          >
            <Typography
              variant="h5"
              sx={{ padding: 1 }}
            >{`Behavior Plan For ${selectedStudent.firstName} ${selectedStudent.lastName}`}</Typography>
            <ProgressLabel value={behaviorPlanStage} />
          </Box>
          <Box sx={{ padding: 4, height: "100%", overflow: "scroll" }}>
            <PlanForm
              setOpen={setOpen}
              behaviorPlanStage={behaviorPlanStage}
              setBehaviorPlanStage={setBehaviorPlanStage}
            />
          </Box>
        </Dialog>
      )}
    </>
  );
}
