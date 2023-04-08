import React from "react";
import { FunctionSurveyQuestionRecord } from "../../types/types";
import {
  FormControl,
  Grid,
  Paper,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { FUNCTION_SURVEY_OPTIONS } from "../../libraries/objects";
import { selectedStudentAtom } from "../../recoil/studentAtoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { functionSurveyFormAtom } from "../../recoil/functionSurveyAtoms";

type Props = {
  question: FunctionSurveyQuestionRecord;
  index: number;
  notAnswered: string[];
  setNotAnswered: (pV: string[]) => void;
};

function SurveyQuestion({ question, index, notAnswered, setNotAnswered }: Props) {
  const selectedStudent = useRecoilValue(selectedStudentAtom);
  const [functionSurveyForm, setFunctionSurveyForm] = useRecoilState(functionSurveyFormAtom);
  const formatTextWithName = (questionString: string) => {
    if (!selectedStudent) return;
    return questionString.replaceAll("*child*", `${selectedStudent.firstName}`);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
    setFunctionSurveyForm((pV) => ({
      ...pV,
      responses: { ...pV.responses, [question.id]: value },
    }));
    const tempArray: string[] = [...notAnswered];
    tempArray.splice(tempArray.indexOf(question.id), 1);
    setNotAnswered(tempArray);
  };
  const error = notAnswered.includes(question.id);
  return (
    <>
      <Paper sx={{ mt: 2, padding: 1, border: error ? "1px solid red" : "none" }}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={5} lg={7}>
            <Typography>{`${index + 1}: ${formatTextWithName(question.label)}`}</Typography>
            {error && (
              <Typography sx={{ color: "red" }} variant="body2">
                This Question Must Be Answered
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={7} lg={5} sx={{ textAlign: "right" }}>
            <FormControl>
              <RadioGroup
                onChange={handleChange}
                value={
                  question.id in functionSurveyForm.responses
                    ? functionSurveyForm.responses[question.id]
                    : null
                }
                row
                name="question-response-options"
              >
                <FormControlLabel
                  value={FUNCTION_SURVEY_OPTIONS.DISAGREE}
                  control={<Radio />}
                  label={FUNCTION_SURVEY_OPTIONS.DISAGREE}
                />
                <FormControlLabel
                  value={FUNCTION_SURVEY_OPTIONS.AGREE}
                  control={<Radio />}
                  label={FUNCTION_SURVEY_OPTIONS.AGREE}
                />
                <FormControlLabel
                  value={FUNCTION_SURVEY_OPTIONS.STRONGLY_AGREE}
                  control={<Radio />}
                  label={FUNCTION_SURVEY_OPTIONS.STRONGLY_AGREE}
                />
                <FormControlLabel
                  value={FUNCTION_SURVEY_OPTIONS.NA}
                  control={<Radio />}
                  label={FUNCTION_SURVEY_OPTIONS.NA}
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

export default SurveyQuestion;
