import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  functionSurveyFormAtom,
  functionSurveyQuestionsAtom,
} from "../../recoil/functionSurveyAtoms";
import SurveyQuestion from "./SurveyQuestion";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { behaviorsAtom } from "../../recoil/behaviorsAtoms";


type Props = {
  notAnswered: string[];
  setNotAnswered: (pV: string[]) => void;
};

function SurveyForm({ notAnswered, setNotAnswered }: Props) {
  const questions = useRecoilValue(functionSurveyQuestionsAtom);
  const behaviors = useRecoilValue(behaviorsAtom);
  const [functionSurveyForm, setFunctionSurveyForm] = useRecoilState(functionSurveyFormAtom);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFunctionSurveyForm((pV) => ({ ...pV, [event.target.name]: event.target.value }));
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    setFunctionSurveyForm((pV) => ({ ...pV, behaviorId: event.target.value }));
  };
  return (
    <>
      <Box sx={{ mt: 1, padding: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              value={functionSurveyForm.submitter}
              name="submitter"
              required
              fullWidth
              label="Name of Person Submitting Survey"
              onChange={handleTextChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              value={functionSurveyForm.relationship}
              fullWidth
              required
              name="relationship"
              label="Relationship of Persion Submitting Survey to Child"
              onChange={handleTextChange}
            />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ mt: 1, padding: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="target-behavior-label">Select Target Behavior</InputLabel>
              <Select
                value={functionSurveyForm.behaviorId}
                labelId="target-behavior-label"
                required
                label="Select Target Behavior"
                onChange={handleSelectChange}
              >
                {behaviors &&
                  behaviors.map((behavior) => (
                    <MenuItem key={behavior.id} value={behavior.id}>
                      {behavior.label}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              value={functionSurveyForm.descriptionOfBehavior}
              fullWidth
              required
              name="descriptionOfBehavior"
              label="Description of Behavior"
              onChange={handleTextChange}
            />
          </Grid>
        </Grid>
      </Box>
      {questions &&
        questions.map((question, index) => (
          <SurveyQuestion
            key={question.id}
            question={question}
            index={index}
            notAnswered={notAnswered}
            setNotAnswered={setNotAnswered}
          />
        ))}
    </>
  );
}

export default SurveyForm;
