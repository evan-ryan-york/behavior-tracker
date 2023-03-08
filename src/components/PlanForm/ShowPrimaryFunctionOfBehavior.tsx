import { Avatar, Chip, Grid, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { FUNCTIONS_OF_BEHAVIOR } from "../../libraries/objects";
import { antecedentsAtom, antecedentsObjAtom } from "../../recoil/antecedentsAtoms";
import { consequencesObjAtom } from "../../recoil/consequencesAtoms";
import { observationsGroupedByBehaviorAtom } from "../../recoil/observationAtoms";
import { organizationAtom } from "../../recoil/organizationAtoms";
import { BehaviorPlan } from "../../types/types";

type FunctionsOfBehaviorForDisplay = {
  label: string;
  count: number;
};

type SetterFunction = (pV: BehaviorPlan) => BehaviorPlan;

type Props = {
  setPlanForm: (pV: SetterFunction) => void;
  behaviorId: string;
};

function ShowPrimaryFunctionOfBehavior({ behaviorId, setPlanForm }: Props) {
  const organization = useRecoilValue(organizationAtom);
  const observationsGroupedByBehavior = useRecoilValue(observationsGroupedByBehaviorAtom);
  const antecedents = useRecoilValue(antecedentsAtom);
  const antecedentsObj = useRecoilValue(antecedentsObjAtom);
  const consequencesObj = useRecoilValue(consequencesObjAtom);
  const [functionsOfBehaviorForDisplay, setFunctionsOfBehaviorForDisplay] = useState<
    FunctionsOfBehaviorForDisplay[]
  >([]);

  useEffect(() => {
    if (!observationsGroupedByBehavior || !antecedentsObj || !consequencesObj) return;
    if (observationsGroupedByBehavior[behaviorId]) {
      const tempArray: FunctionsOfBehaviorForDisplay[] = [];
      const antecedentIds = observationsGroupedByBehavior[behaviorId].antecedentIds;
      const consequenceIds = observationsGroupedByBehavior[behaviorId].antecedentIds;
      const functionsOfBehaviorArray = Object.values(FUNCTIONS_OF_BEHAVIOR);
      functionsOfBehaviorArray.forEach((functionOfBehavior) => {
        let count = 0;
        antecedentIds.forEach((antecedentId) => {
          if (!antecedentsObj[antecedentId]) return;
          const functionOfBehaviorName = antecedentsObj[antecedentId].functionOfBehavior;
          if (functionOfBehaviorName === functionOfBehavior) {
            count++;
          }
        });
        consequenceIds.forEach((consequenceId) => {
          if (!consequencesObj[consequenceId]) return;
          const functionOfBehaviorName = consequencesObj[consequenceId].functionOfBehavior;
          if (functionOfBehaviorName === functionOfBehavior) {
            count++;
          }
        });
        if (count > 0) {
          tempArray.push({ label: functionOfBehavior, count: count });
        }
      });
      tempArray.sort((a, b) => b.count - a.count);
      setPlanForm((pV) => ({ ...pV, functionsOfBehavior: tempArray }));
      setFunctionsOfBehaviorForDisplay(tempArray);
    }
  }, [
    observationsGroupedByBehavior,
    antecedentsObj,
    consequencesObj,
    behaviorId,
    antecedents,
    setPlanForm,
  ]);

  return (
    <>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6">Primary Function of Behavior: </Typography>
        </Grid>
        <Grid item xs={12} sm={8}>
          {organization &&
            functionsOfBehaviorForDisplay.map((functionOfBehavior) => (
              <Chip
                key={functionOfBehavior.label}
                label={functionOfBehavior.label}
                sx={{ margin: 1 }}
                avatar={
                  <Avatar
                    sx={{
                      bgcolor: organization.secondaryColor,
                      color: `${organization.secondaryTextColor} !important`,
                    }}
                  >
                    {functionOfBehavior.count}
                  </Avatar>
                }
              />
            ))}
        </Grid>
      </Grid>
    </>
  );
}

export default ShowPrimaryFunctionOfBehavior;
