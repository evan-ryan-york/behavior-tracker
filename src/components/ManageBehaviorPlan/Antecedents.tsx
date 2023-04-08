import { Avatar, Chip, Grid, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { antecedentsAtom, antecedentsObjAtom } from "../../recoil/antecedentsAtoms";
import { observationsGroupedByBehaviorAtom } from "../../recoil/observationAtoms";
import { organizationAtom } from "../../recoil/organizationAtoms";
import { BehaviorPlan } from "../../types/types";

type AntecedentsForDisplay = {
  label: string;
  count: number;
};

type SetterFunction = (pV: BehaviorPlan) => BehaviorPlan;

type Props = {
  setPlanForm: (pV: SetterFunction) => void;
  behaviorId: string;
};

function Antecedents({ behaviorId, setPlanForm }: Props) {
  const organization = useRecoilValue(organizationAtom);
  const observationsGroupedByBehavior = useRecoilValue(observationsGroupedByBehaviorAtom);
  const antecedents = useRecoilValue(antecedentsAtom);
  const antecedentsObj = useRecoilValue(antecedentsObjAtom);
  const [antecedentsForDisplay, setAntecedentsForDisplay] = useState<AntecedentsForDisplay[]>([]);

  useEffect(() => {
    if (!observationsGroupedByBehavior || !antecedentsObj) return;
    if (observationsGroupedByBehavior[behaviorId]) {
      const tempArray: AntecedentsForDisplay[] = [];
      const antecedentIds = observationsGroupedByBehavior[behaviorId].antecedentIds;
      antecedents.forEach((antecedent) => {
        if (antecedentIds.includes(antecedent.id)) {
          tempArray.push({
            label: antecedent.label,
            count: antecedentIds.filter((id) => id === antecedent.id).length,
          });
        }
      });
      tempArray.sort((a, b) => b.count - a.count);
      setAntecedentsForDisplay(tempArray);
      setPlanForm((pV) => ({ ...pV, antecedents: tempArray }));
    }
  }, [observationsGroupedByBehavior, antecedentsObj, behaviorId, antecedents, setPlanForm]);

  return (
    <>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6">What are the Triggers (antecedents)?</Typography>
        </Grid>
        <Grid item xs={12} sm={8}>
          {organization &&
            antecedentsForDisplay.map((antecedent) => (
              <Chip
                key={antecedent.label}
                label={antecedent.label}
                sx={{ margin: 1 }}
                avatar={
                  <Avatar
                    sx={{
                      bgcolor: organization.secondaryColor,
                      color: `${organization.secondaryTextColor} !important`,
                    }}
                  >
                    {antecedent.count}
                  </Avatar>
                }
              />
            ))}
        </Grid>
      </Grid>
    </>
  );
}

export default Antecedents;
