import { Box, Paper, Typography } from "@mui/material";
import { timestampToDisplay } from "../../libraries/functions";
import { BehaviorPlanRecord } from "../../types/types";

type Props = {
  behaviorPlan: BehaviorPlanRecord;
  setSelectedBehaviorPlan: (pV: BehaviorPlanRecord) => void;
};

function BehaviorPlanCard({ behaviorPlan, setSelectedBehaviorPlan }: Props) {
  const handleClick = () => {
    setSelectedBehaviorPlan(behaviorPlan);
  };
  return (
    <Paper
      sx={{
        padding: 1,
        mt: 2,
        mb: 1,
        ":hover": {
          boxShadow: 3,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "95%",
          cursor: "pointer",
        }}
        onClick={handleClick}
      >
        <Typography variant="h4">Behavior Plan</Typography>
        {behaviorPlan.createdAt && (
          <Typography variant="body2">{`Created On ${timestampToDisplay(
            behaviorPlan.createdAt
          )}`}</Typography>
        )}
      </Box>
    </Paper>
  );
}

export default BehaviorPlanCard;
