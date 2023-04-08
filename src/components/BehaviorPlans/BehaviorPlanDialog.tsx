import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { BehaviorPlanRecord } from "../../types/types";
import BehaviorPlan from "./BehaviorPlan";

type Props = {
  selectedBehaviorPlan: BehaviorPlanRecord | null;
  setSelectedBehaviorPlan: (pV: BehaviorPlanRecord | null) => void;
};

function BehaviorPlanDialog({ selectedBehaviorPlan, setSelectedBehaviorPlan }: Props) {
  const handleClose = () => {
    setSelectedBehaviorPlan(null);
  };
  return (
    <>
      {selectedBehaviorPlan && (
        <Dialog open={Boolean(selectedBehaviorPlan)} onClose={handleClose} fullWidth maxWidth="md">
          <DialogTitle sx={{ fontSize: 44, textAlign: "center" }}>Behavior Plan</DialogTitle>
          <DialogContent>
            <BehaviorPlan selectedBehaviorPlan={selectedBehaviorPlan} />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

export default BehaviorPlanDialog;
