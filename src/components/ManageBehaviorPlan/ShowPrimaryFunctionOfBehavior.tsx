import { Avatar, Box, Chip, Grid, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { FUNCTIONS_OF_BEHAVIOR, FUNCTION_SURVEY_OPTIONS } from "../../libraries/objects";
import { antecedentsAtom, antecedentsObjAtom } from "../../recoil/antecedentsAtoms";
import { consequencesObjAtom } from "../../recoil/consequencesAtoms";
import { observationsGroupedByBehaviorAtom } from "../../recoil/observationAtoms";
import { organizationAtom } from "../../recoil/organizationAtoms";
import { BehaviorPlan } from "../../types/types";
import {
  filteredSurveysByDateAtom,
  functionSurveyQuestionsAtom,
} from "../../recoil/functionSurveyAtoms";

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
  const filteredSurveyResults = useRecoilValue(filteredSurveysByDateAtom);
  const surveyQuestions = useRecoilValue(functionSurveyQuestionsAtom);
  const [functionsOfBehaviorForDisplay, setFunctionsOfBehaviorForDisplay] = useState<
    FunctionsOfBehaviorForDisplay[]
  >([]);

  useEffect(() => {
    if (
      !observationsGroupedByBehavior ||
      !antecedentsObj ||
      !consequencesObj ||
      !filteredSurveyResults ||
      !surveyQuestions
    )
      return;
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
        const filteredQuestions = surveyQuestions.filter(
          (question) => question.functionOfBehavior === functionOfBehavior
        );
        filteredSurveyResults.forEach((result) => {
          filteredQuestions.forEach((question) => {
            if (!result.responses[question.id]) return;
            const response = result.responses[question.id];
            switch (response) {
              case FUNCTION_SURVEY_OPTIONS.AGREE:
                count++;
                break;
              case FUNCTION_SURVEY_OPTIONS.STRONGLY_AGREE:
                count = count + 2;
                break;
              default:
                break;
            }
          });
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
    filteredSurveyResults,
    surveyQuestions,
  ]);

  return (
    <>
      <Box sx={{padding: 2, backgroundColor: "#eee", mt: 2, borderRadius: 2}}>
        <Typography sx={{ mt: 1 }} variant="h6">
          Based on current data, the function(s) of this behavior is:
        </Typography>
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
      </Box>
    </>
  );
}

export default ShowPrimaryFunctionOfBehavior;
