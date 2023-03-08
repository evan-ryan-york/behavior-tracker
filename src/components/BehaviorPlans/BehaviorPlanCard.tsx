import React from "react";
import {
  Chip,
  Avatar,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
} from "@mui/material";
import parse from "html-react-parser";
import { useRecoilValue } from "recoil";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { behaviorsObjAtom } from "../../recoil/behaviorsAtoms";
import { BehaviorPlanRecord } from "../../types/types";
import { timestampToDisplay } from "../../libraries/functions";
import { organizationAtom } from "../../recoil/organizationAtoms";
import { replacementBehaviorsObjAtom } from "../../recoil/replacementBehaviorsAtoms";

type Props = {
  behaviorPlan: BehaviorPlanRecord;
};

function BehaviorPlanCard({ behaviorPlan }: Props) {
  const behaviorObj = useRecoilValue(behaviorsObjAtom);
  const replacementBehaviorObj = useRecoilValue(replacementBehaviorsObjAtom);
  const organization = useRecoilValue(organizationAtom);
  return (
    <>
      {organization && behaviorObj && (
        <Container maxWidth="md">
          <Accordion
            sx={{
              mt: 2,
              "&:before": {
                display: "none",
              },
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "95%",
                }}
              >
                <Typography variant="h4">Behavior Plan</Typography>
                {behaviorPlan.createdAt && (
                  <Typography variant="body2">{`Created On ${timestampToDisplay(
                    behaviorPlan.createdAt
                  )}`}</Typography>
                )}
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="h5">{`Target Behavior: ${
                behaviorObj[behaviorPlan.targetBehavior].label
              }`}</Typography>
              <Typography
                sx={{ mt: 1 }}
              >{`Behavior Definition: ${behaviorPlan.behaviorDefinition}`}</Typography>
              <Typography sx={{ mt: 3 }} variant="h5">
                Antecedents
              </Typography>
              {behaviorPlan.antecedents.map((antecedent) => (
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
              >{`Antecedent Notes: ${behaviorPlan.antecedentNotes}`}</Typography>
              <Typography sx={{ mt: 3 }} variant="h5">
                Functions of Behavior
              </Typography>
              {behaviorPlan.functionsOfBehavior.map((functionOfBehavior) => (
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
                    replacementBehaviorObj[behaviorPlan.replacementBehavior].label
                  }`}</Typography>
                </>
              )}
              <Typography sx={{ mt: 3 }} variant="h5">
                Strategies to Prevent the Target Behavior
              </Typography>
              {behaviorPlan.preventionStrategies.map((strategy) => (
                <Box key={strategy as string}>{parse(strategy as string)}</Box>
              ))}
              <Typography sx={{ mt: 3 }} variant="h5">
                Strategies to Extinguish the Target Behavior
              </Typography>
              {behaviorPlan.extinguishStrategies.map((strategy) => (
                <Box key={strategy as string}>{parse(strategy as string)}</Box>
              ))}
              <Typography sx={{ mt: 3 }} variant="h5">
                Strategies to Reinforce the Replacement Behavior
              </Typography>
              {behaviorPlan.reinforcementStrategies.map((strategy) => (
                <Box key={strategy as string}>{parse(strategy as string)}</Box>
              ))}
            </AccordionDetails>
          </Accordion>
        </Container>
      )}
    </>
  );
}

export default BehaviorPlanCard;
