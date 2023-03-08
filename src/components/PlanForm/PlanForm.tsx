import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Select,
  SelectChangeEvent,
  MenuItem,
  TextField,
  Grid,
} from "@mui/material";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { behaviorsAtom, behaviorsObjAtom } from "../../recoil/behaviorsAtoms";
import { BehaviorPlan, BehaviorRecord, ReplacementBehaviorRecord } from "../../types/types";
import { replacementBehaviorsAtom } from "../../recoil/replacementBehaviorsAtoms";
import PreventionStrategies from "./PreventionStrategies";
import { selectedStudentObservationsAtom } from "../../recoil/observationAtoms";
import ShowPrimaryFunctionOfBehavior from "./ShowPrimaryFunctionOfBehavior";
import ReinforcementStrategies from "./ReinforcementStrategies";
import ExtinguishStrategies from "./ExtinguishStrategies";
import { BLANK_PLAN_FORM } from "../../libraries/blankForms";
import Antecedents from "./Antecedents";
import useAddDoc from "../../hooks/useAddDoc";
import { selectedStudentIdAtom } from "../../recoil/studentAtoms";
import { organizationAtom } from "../../recoil/organizationAtoms";
import { behaviorPlansResetAtom } from "../../recoil/behaviorPlansAtoms";

type Props = {
  setOpen: (value: boolean) => void;
};

function PlanForm({ setOpen }: Props) {
  const [planForm, setPlanForm] = useState<BehaviorPlan>(BLANK_PLAN_FORM);
  const [behaviorsForForm, setBehaviorsForForm] = useState<BehaviorRecord[]>([]);
  const { sendRequest: addDoc } = useAddDoc();
  const observations = useRecoilValue(selectedStudentObservationsAtom);
  const behaviors = useRecoilValue(behaviorsAtom);
  const behaviorsObj = useRecoilValue(behaviorsObjAtom);
  const selectedStudentId = useRecoilValue(selectedStudentIdAtom);
  const organization = useRecoilValue(organizationAtom);
  const replacementBehaviors = useRecoilValue(replacementBehaviorsAtom);
  const [fitleredReplacementBehaviors, setFilteredReplacementBehaviors] = useState<
    ReplacementBehaviorRecord[]
  >([]);
  const setBehaviorPlansReset = useSetRecoilState(behaviorPlansResetAtom);

  useEffect(() => {
    if (!observations || !behaviors) return;
    const tempArray: BehaviorRecord[] = [];
    behaviors.forEach((behavior) => {
      const behaviorCount = observations.filter((observation) =>
        observation.behaviors.includes(behavior.id)
      );
      const label = behavior.label + " " + behaviorCount.length;
      tempArray.push({ ...behavior, label: label });
    });
    setBehaviorsForForm(tempArray);
  }, [behaviors, observations]);

  const handleSubmit = async () => {
    if (!selectedStudentId || !organization) return;
    await addDoc({
      col: "behaviorPlans",
      data: { ...planForm, studentId: selectedStudentId, organizationId: organization.id },
    });
    setPlanForm(BLANK_PLAN_FORM);
    setOpen(false);
    setBehaviorPlansReset((pV) => !pV);
  };

  const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlanForm((pV) => ({ ...pV, [event.target.name]: event.target.value }));
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    setPlanForm((pV) => ({ ...pV, [event.target.name]: event.target.value }));
  };

  useEffect(() => {
    if (!replacementBehaviors || !planForm) return;
    const tempFilteredBehaviors = replacementBehaviors.filter(
      (behavior) => behavior.behaviorId === planForm.targetBehavior
    );
    setFilteredReplacementBehaviors(tempFilteredBehaviors);
  }, [replacementBehaviors, planForm]);

  return (
    <>
      {!planForm.targetBehavior && (
        <Typography sx={{ textAlign: "center" }} variant="h4">
          First Select the Target Behavior
        </Typography>
      )}
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
          <PreventionStrategies planForm={planForm} setPlanForm={setPlanForm} />
          <ReinforcementStrategies planForm={planForm} setPlanForm={setPlanForm} />
          <ExtinguishStrategies planForm={planForm} setPlanForm={setPlanForm} />

          <Button
            variant="contained"
            color="secondary"
            fullWidth
            sx={{ padding: 2, mb: 1, mt: 2 }}
            onClick={handleSubmit}
          >
            Create Behavior Plan
          </Button>
        </>
      )}
    </>
  );
}

export default PlanForm;
