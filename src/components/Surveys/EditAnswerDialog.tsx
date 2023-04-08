import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { FUNCTION_SURVEY_OPTIONS } from "../../libraries/objects";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { selectedStudentAtom } from "../../recoil/studentAtoms";
import { FunctionSurveyQuestionRecord, FunctionSurveyResultRecord } from "../../types/types";
import useUpdateDoc from "../../hooks/useUpdateDoc";
import { functionSurveyResultsResetAtom } from "../../recoil/functionSurveyAtoms";

type Props = {
  question: FunctionSurveyQuestionRecord | null;
  currentOption: string | null;
  open: boolean;
  setOpen: (pV: boolean) => void;
  selectedSurvey: FunctionSurveyResultRecord | null;
};

function EditAnswerDialog({ question, currentOption, open, setOpen, selectedSurvey }: Props) {
  const [selectedOption, setSelectedOption] = useState<string | null>(currentOption);
  const selectedStudent = useRecoilValue(selectedStudentAtom);
  const setFunctionSurveyResultsReset = useSetRecoilState(functionSurveyResultsResetAtom);
  const { sendRequest: updateDoc } = useUpdateDoc();
  const formatTextWithName = (questionString: string) => {
    if (!selectedStudent) return;
    return questionString.replaceAll("*child*", `${selectedStudent.firstName}`);
  };

  useEffect(() => {
    setSelectedOption(currentOption);
  }, [currentOption]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
    setSelectedOption(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    if (!selectedSurvey || !question) return;
    await updateDoc({
      col: "functionSurveyResults",
      data: {
        ...selectedSurvey,
        responses: { ...selectedSurvey.responses, [question.id]: selectedOption },
      },
      id: selectedSurvey.id,
    });
    setFunctionSurveyResultsReset((pV) => !pV);
    setSelectedOption(null);
    handleClose();
  };
  return (
    <>
      {question && currentOption && (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle sx={{ fontSize: 44, textAlign: "center" }}>Edit Response</DialogTitle>
          <DialogContent sx={{ textAlign: "center" }}>
            <Typography>{`${formatTextWithName(question.label)}`}</Typography>
            <FormControl sx={{ mt: 2 }}>
              <RadioGroup
                onChange={handleChange}
                value={selectedOption}
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
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSave} variant="contained">
              Save
            </Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

export default EditAnswerDialog;
