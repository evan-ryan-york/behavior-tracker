import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { BehaviorPlanRecord } from "../../types/types";
import BehaviorPlan from "./BehaviorPlan";
import DeleteDialog from "../shared/DeleteDialog";
import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { behaviorPlanFormAtom, behaviorPlansResetAtom } from "../../recoil/behaviorPlansAtoms";

type Props = {
  selectedBehaviorPlan: BehaviorPlanRecord | null;
  setSelectedBehaviorPlan: (pV: BehaviorPlanRecord | null) => void;
  setManageOpen: (value: boolean) => void;
};

function BehaviorPlanDialog({
  selectedBehaviorPlan,
  setSelectedBehaviorPlan,
  setManageOpen,
}: Props) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [behaviorPlanReset, setBehaviorPlanReset] = useRecoilState(behaviorPlansResetAtom);
  const setBehaviorPlanForm = useSetRecoilState(behaviorPlanFormAtom);
  const handleClose = () => {
    setSelectedBehaviorPlan(null);
  };

  const handleDeleteBehaviorPlan = () => {
    setDeleteOpen(true);
  };

  const handleEditDraft = () => {
    if (!selectedBehaviorPlan) return;
    setManageOpen(true);
    setBehaviorPlanForm(selectedBehaviorPlan);
  };

  useEffect(() => {
    setSelectedBehaviorPlan(null);
  }, [behaviorPlanReset, setSelectedBehaviorPlan]);

  return (
    <>
      {selectedBehaviorPlan && (
        <>
          <Dialog
            open={Boolean(selectedBehaviorPlan)}
            onClose={handleClose}
            fullWidth
            maxWidth="md"
          >
            <DialogTitle sx={{ fontSize: 44, textAlign: "center" }}>Behavior Plan</DialogTitle>
            <DialogContent>
              <BehaviorPlan selectedBehaviorPlan={selectedBehaviorPlan} />
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Button onClick={handleEditDraft} color="secondary" variant="contained">
                Edit Draft
              </Button>
              <Button onClick={handleDeleteBehaviorPlan} variant="contained" color="error">
                Delete Behavior Plan
              </Button>
            </DialogActions>
          </Dialog>
          <DeleteDialog
            open={deleteOpen}
            setOpen={setDeleteOpen}
            collection="behaviorPlans"
            message="Are you sure you want to delete this Behavior Plan? All data associated with it will be removed."
            id={selectedBehaviorPlan.id}
            setReset={setBehaviorPlanReset}
          ></DeleteDialog>
        </>
      )}
    </>
  );
}

export default BehaviorPlanDialog;
