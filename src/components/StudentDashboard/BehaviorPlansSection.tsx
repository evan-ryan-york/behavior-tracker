import { Box, Button, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { organizationAtom } from "../../recoil/organizationAtoms";
import { useRecoilValue } from "recoil";
import { behaviorPlansAtom } from "../../recoil/behaviorPlansAtoms";
import BehaviorPlanCard from "./BehaviorPlanCard";
import BehaviorPlanDialog from "../BehaviorPlans/BehaviorPlanDialog";
import { BehaviorPlanRecord } from "../../types/types";
import ManageBehaviorPlanDialog from "../ManageBehaviorPlan/ManageBehaviorPlanDialog";

function BehaviorPlansSection() {
  const organization = useRecoilValue(organizationAtom);
  const behaviorPlans = useRecoilValue(behaviorPlansAtom);
  const [manageOpen, setManageOpen] = useState(false);
  const [selectedBehaviorPlan, setSelectedBehaviorPlan] = useState<BehaviorPlanRecord | null>(null);

  const handleManageOpen = () => {
    setManageOpen(true);
  };

  return (
    <>
      {organization && (
        <Paper sx={{ height: "95%" }}>
          <Box
            sx={{
              padding: 1,
              backgroundColor: organization.primaryColor,
              color: organization.primaryTextColor,
              textAlign: "center",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h4">Behavior Plans</Typography>
            <Button onClick={handleManageOpen} variant="contained" color="secondary">
              New
            </Button>
          </Box>
          <Box sx={{ padding: 2, height: 400, overflow: "scroll" }}>
            <Box sx={{ mt: 4 }}>
              {behaviorPlans &&
                behaviorPlans.map((behaviorPlan) => (
                  <BehaviorPlanCard
                    key={behaviorPlan.id}
                    behaviorPlan={behaviorPlan}
                    setSelectedBehaviorPlan={setSelectedBehaviorPlan}
                  />
                ))}
            </Box>
          </Box>
        </Paper>
      )}
      <BehaviorPlanDialog
        selectedBehaviorPlan={selectedBehaviorPlan}
        setSelectedBehaviorPlan={setSelectedBehaviorPlan}
      />
      <ManageBehaviorPlanDialog open={manageOpen} setOpen={setManageOpen} />
    </>
  );
}

export default BehaviorPlansSection;
