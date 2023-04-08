import { Typography, Select, SelectChangeEvent, MenuItem, TextField, Grid } from "@mui/material";
import ShowPrimaryFunctionOfBehavior from "./ShowPrimaryFunctionOfBehavior";
import { BehaviorPlan, BehaviorRecord, ReplacementBehaviorRecord } from "../../types/types";
import { behaviorsObjAtom } from "../../recoil/behaviorsAtoms";
import { useRecoilValue } from "recoil";

type SetterFunction = (pV: BehaviorPlan) => BehaviorPlan;

type Props = {
  setOpen: (value: boolean) => void;
  planForm: BehaviorPlan;
  setPlanForm: (pV: SetterFunction) => void;
  behaviorsForForm: BehaviorRecord[];
  fitleredReplacementBehaviors: ReplacementBehaviorRecord[];
};

function BehaviorSelectForm({
  setOpen,
  setPlanForm,
  planForm,
  behaviorsForForm,
  fitleredReplacementBehaviors,
}: Props) {
  const behaviorsObj = useRecoilValue(behaviorsObjAtom);

  const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlanForm((pV) => ({ ...pV, [event.target.name]: event.target.value }));
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    setPlanForm((pV) => ({ ...pV, [event.target.name]: event.target.value }));
  };

  return (
    <>
      <Typography sx={{ textAlign: "center" }} variant="h4">
        Define the Target and Replacement Behavior
      </Typography>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6">Target Behavior: </Typography>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Select
            name="targetBehavior"
            fullWidth
            onChange={handleSelectChange}
            value={planForm.targetBehavior}
          >
            {behaviorsForForm &&
              behaviorsForForm.map((behavior) => (
                <MenuItem key={behavior.id} value={behavior.id}>
                  {behavior.label}
                </MenuItem>
              ))}
          </Select>
        </Grid>
      </Grid>
      {planForm.targetBehavior && (
        <>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6">
                What does this behavior look like for this specific child?
              </Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                onChange={handleTextFieldChange}
                name="behaviorDefinition"
                value={planForm.behaviorDefinition}
                multiline
                fullWidth
              />
            </Grid>
          </Grid>
          <ShowPrimaryFunctionOfBehavior
            behaviorId={planForm.targetBehavior}
            setPlanForm={setPlanForm}
          />
          {behaviorsObj && planForm.targetBehavior && (
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12} sm={4}>
                <Typography variant="h6">
                  {`Replacement behavior for ${behaviorsObj[planForm.targetBehavior].label}`}{" "}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Select
                  name="replacementBehavior"
                  fullWidth
                  onChange={handleSelectChange}
                  value={planForm.replacementBehavior}
                >
                  {fitleredReplacementBehaviors &&
                    fitleredReplacementBehaviors.map((behavior) => (
                      <MenuItem key={behavior.id} value={behavior.id}>
                        {behavior.label}
                      </MenuItem>
                    ))}
                </Select>
              </Grid>
            </Grid>
          )}
        </>
      )}
    </>
  );
}

export default BehaviorSelectForm;
