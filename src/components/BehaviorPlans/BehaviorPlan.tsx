import { Avatar, Box, Chip, Typography } from "@mui/material";
import parse from "html-react-parser";
import { BehaviorPlanRecord } from "../../types/types";
import { useRecoilValue } from "recoil";
import { behaviorsObjAtom } from "../../recoil/behaviorsAtoms";
import { organizationAtom } from "../../recoil/organizationAtoms";
import { selectedStudentAtom } from "../../recoil/studentAtoms";
import { replacementBehaviorsAtom } from "../../recoil/replacementBehaviorsAtoms";
import { strategiesAtom } from "../../recoil/strategiesAtoms";

type Props = {
  selectedBehaviorPlan: BehaviorPlanRecord | null;
};

function BehaviorPlan({ selectedBehaviorPlan }: Props) {
  const behaviorObj = useRecoilValue(behaviorsObjAtom);
  const organization = useRecoilValue(organizationAtom);
  const selectedStudent = useRecoilValue(selectedStudentAtom);
  const replacementBehaviors = useRecoilValue(replacementBehaviorsAtom);
  const strategies = useRecoilValue(strategiesAtom);

  return (
    <>
      {selectedStudent && selectedBehaviorPlan && behaviorObj && organization && (
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
          {
            <>
              <Typography sx={{ mt: 3 }} variant="h5">
                Replacement Behaviors
              </Typography>
              {selectedBehaviorPlan.replacementBehaviors.map((replacementBehaviorId) => (
                <Box key={replacementBehaviorId}>
                  {parse(
                    (replacementBehaviors.find(
                      (replacementBehavior) => replacementBehavior.id === replacementBehaviorId
                    )?.content as string) ?? ""
                  )}
                </Box>
              ))}
              <Box>{parse(selectedBehaviorPlan.replacementBehaviorsNotes as string)}</Box>
            </>
          }
          <Typography sx={{ mt: 3 }} variant="h5">
            Strategies to Prevent the Target Behavior
          </Typography>
          {selectedBehaviorPlan.preventionStrategies.map((strategyId) => (
            <Box key={strategyId}>
              {parse(
                (strategies.find((strategy) => strategy.id === strategyId)?.content as string) ?? ""
              )}
            </Box>
          ))}
          <Box>{parse(selectedBehaviorPlan.preventionStrategiesNotes as string)}</Box>
          <Typography sx={{ mt: 3 }} variant="h5">
            Strategies to Extinguish the Target Behavior
          </Typography>
          {selectedBehaviorPlan.extinguishStrategies.map((strategyId) => (
            <Box key={strategyId}>
              {parse(
                (strategies.find((strategy) => strategy.id === strategyId)?.content as string) ?? ""
              )}
            </Box>
          ))}
          <Box>{parse(selectedBehaviorPlan.extinguishStrategiesNotes as string)}</Box>
          <Typography sx={{ mt: 3 }} variant="h5">
            Strategies to Reinforce the Replacement Behavior
          </Typography>
          {selectedBehaviorPlan.reinforcementStrategies.map((strategyId) => (
            <Box key={strategyId}>
              {parse(
                (strategies.find((strategy) => strategy.id === strategyId)?.content as string) ?? ""
              )}
            </Box>
          ))}
          <Box>{parse(selectedBehaviorPlan.reinforcementStrategiesNotes as string)}</Box>
          <Typography sx={{ mt: 3 }} variant="h5">
            The Behavior Plan Will Be Met When
          </Typography>
          <Typography>{`${selectedStudent.firstName} is observed ${
            behaviorObj[selectedBehaviorPlan.targetBehavior].label
          } ${
            selectedBehaviorPlan.frequencyNumerator
          } times per ${selectedBehaviorPlan.frequencyDenominator.toLowerCase()} or less.`}</Typography>
        </Box>
      )}
    </>
  );
}

export default BehaviorPlan;
