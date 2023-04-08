import { Typography, TextField, Grid } from "@mui/material";
import { BehaviorPlan } from "../../types/types";
import PreventionStrategies from "./PreventionStrategies";
import ReinforcementStrategies from "./ReinforcementStrategies";
import ExtinguishStrategies from "./ExtinguishStrategies";
import Antecedents from "./Antecedents";

type SetterFunction = (pV: BehaviorPlan) => BehaviorPlan;

type Props = {
  setOpen: (value: boolean) => void;
  planForm: BehaviorPlan;
  setPlanForm: (pV: SetterFunction) => void;
};

function StrategiesForm({ setOpen, planForm, setPlanForm }: Props) {
  const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlanForm((pV) => ({ ...pV, [event.target.name]: event.target.value }));
  };

  return (
    <>
      <Typography sx={{ textAlign: "center" }} variant="h4">
        Now Select the Strategies You'll Use
      </Typography>
      <Antecedents behaviorId={planForm.targetBehavior} setPlanForm={setPlanForm} />
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6">Additional Antecedent Notes:</Typography>
        </Grid>
        <Grid item xs={12} sm={8}>
          <TextField
            onChange={handleTextFieldChange}
            name="antecedentNotes"
            value={planForm.antecedentNotes}
            fullWidth
          />
        </Grid>
      </Grid>
      <PreventionStrategies planForm={planForm} setPlanForm={setPlanForm} />
      <ReinforcementStrategies planForm={planForm} setPlanForm={setPlanForm} />
      <ExtinguishStrategies planForm={planForm} setPlanForm={setPlanForm} />
    </>
  );
}

export default StrategiesForm;
