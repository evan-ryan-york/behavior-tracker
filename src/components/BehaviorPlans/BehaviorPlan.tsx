import { Avatar, Box, Chip, Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import parse from "html-react-parser";
import { BehaviorPlanRecord } from "../../types/types";
import { useRecoilValue } from "recoil";
import { behaviorsObjAtom } from "../../recoil/behaviorsAtoms";
import { replacementBehaviorsObjAtom } from "../../recoil/replacementBehaviorsAtoms";
import { organizationAtom } from "../../recoil/organizationAtoms";

type Props = {
  selectedBehaviorPlan: BehaviorPlanRecord | null;
};

function BehaviorPlan({ selectedBehaviorPlan }: Props) {
  const behaviorObj = useRecoilValue(behaviorsObjAtom);
  const replacementBehaviorObj = useRecoilValue(replacementBehaviorsObjAtom);
  const organization = useRecoilValue(organizationAtom);

  return (
    <>
      {selectedBehaviorPlan && behaviorObj && organization && (
        <Box>
          <Typography variant="h5">{`Target Behavior: ${
            behaviorObj[selectedBehaviorPlan.targetBehavior].label
          }`}</Typography>
          <Typography
            sx={{ mt: 1 }}
          >{`Behavior Definition: ${selectedBehaviorPlan.behaviorDefinition}`}</Typography>
          <Typography sx={{ mt: 3 }} variant="h5">
            Antecedents
          </Typography>
          {selectedBehaviorPlan.antecedents.map((antecedent) => (
            <Chip
              key={antecedent.label}
              label={antecedent.label}
              sx={{ mt: 1, mb: 1, mr: 1 }}
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
          <Typography
            sx={{ mt: 1 }}
          >{`Antecedent Notes: ${selectedBehaviorPlan.antecedentNotes}`}</Typography>
          <Typography sx={{ mt: 3 }} variant="h5">
            Functions of Behavior
          </Typography>
          {selectedBehaviorPlan.functionsOfBehavior.map((functionOfBehavior) => (
            <Chip
              key={functionOfBehavior.label}
              label={functionOfBehavior.label}
              sx={{ mt: 1, mb: 1, mr: 1 }}
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
          {replacementBehaviorObj && (
            <>
              <Typography sx={{ mt: 3 }} variant="h5">
                Replacement Behavior
              </Typography>
              <Typography sx={{ mt: 1 }}>{`${
                replacementBehaviorObj[selectedBehaviorPlan.replacementBehavior].label
              }`}</Typography>
            </>
          )}
          <Typography sx={{ mt: 3 }} variant="h5">
            Strategies to Prevent the Target Behavior
          </Typography>
          {selectedBehaviorPlan.preventionStrategies.map((strategy) => (
            <Box key={strategy as string}>{parse(strategy as string)}</Box>
          ))}
          <Typography sx={{ mt: 3 }} variant="h5">
            Strategies to Extinguish the Target Behavior
          </Typography>
          {selectedBehaviorPlan.extinguishStrategies.map((strategy) => (
            <Box key={strategy as string}>{parse(strategy as string)}</Box>
          ))}
          <Typography sx={{ mt: 3 }} variant="h5">
            Strategies to Reinforce the Replacement Behavior
          </Typography>
          {selectedBehaviorPlan.reinforcementStrategies.map((strategy) => (
            <Box key={strategy as string}>{parse(strategy as string)}</Box>
          ))}
        </Box>
      )}
    </>
  );
}

export default BehaviorPlan;
