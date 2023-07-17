import { Avatar, Box, Chip, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { FUNCTIONS_OF_BEHAVIOR, FUNCTION_SURVEY_OPTIONS } from "../../libraries/objects";
import { antecedentsAtom, antecedentsObjAtom } from "../../recoil/antecedentsAtoms";
import { consequencesObjAtom } from "../../recoil/consequencesAtoms";
import { observationsGroupedByBehaviorAtom } from "../../recoil/observationAtoms";
import { organizationAtom } from "../../recoil/organizationAtoms";
import { BehaviorPlan, FunctionWithCount } from "../../types/types";
import {
  filteredSurveysByDateAtom,
  functionSurveyQuestionsAtom,
} from "../../recoil/functionSurveyAtoms";
import { functionsWithCountAtom } from "../../recoil/behaviorPlansAtoms";

type SetterFunction = (pV: BehaviorPlan) => BehaviorPlan;

type Props = {
  setPlanForm: (pV: SetterFunction) => void;
  behaviorId: string;
  align?: "left" | "center" | "right";
};

function ShowPrimaryFunctionOfBehavior({ behaviorId, setPlanForm, align }: Props) {
  const organization = useRecoilValue(organizationAtom);
  const observationsGroupedByBehavior = useRecoilValue(observationsGroupedByBehaviorAtom);
  const antecedents = useRecoilValue(antecedentsAtom);
  const antecedentsObj = useRecoilValue(antecedentsObjAtom);
  const consequencesObj = useRecoilValue(consequencesObjAtom);
  const filteredSurveyResults = useRecoilValue(filteredSurveysByDateAtom);
  const surveyQuestions = useRecoilValue(functionSurveyQuestionsAtom);
  const [functionsWithCount, setFunctionsWithCount] = useRecoilState(functionsWithCountAtom);

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
      const tempArray: FunctionWithCount[] = [];
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
      setFunctionsWithCount(tempArray);
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
    setFunctionsWithCount,
  ]);

  return (
    <>
      <Box
        sx={{
          padding: 2,
          backgroundColor: "#eee",
          borderRadius: 2,
          textAlign: align ? align : "left",
        }}
      >
        <Typography variant="h6">
          Based on current data, the function(s) of this behavior is
        </Typography>
        {organization &&
          functionsWithCount.map((functionOfBehavior) => (
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
