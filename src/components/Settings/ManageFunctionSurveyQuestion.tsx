import { SyntheticEvent } from "react";
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import useUpdateDoc from "../../hooks/useUpdateDoc";
import useAddDoc from "../../hooks/useAddDoc";
import { BLANK_FUNCTION_SURVEY_QUESTION_FORM } from "../../libraries/blankForms";
import DialogTitle from "@mui/material/DialogTitle";
import { loggedInStaffAtom } from "../../recoil/staffAtoms";
import { FUNCTIONS_OF_BEHAVIOR } from "../../libraries/objects";
import {
  functionSurveyQuestionFormAtom,
  functionSurveyQuestionsResetAtom,
} from "../../recoil/functionSurveyAtoms";

type Props = {
  open: boolean;
  setOpen: (value: boolean | ((pV: boolean) => boolean)) => void;
};

type FormState = EventTarget & {
  name: string;
  value: string;
  checked: string;
};

export default function ManageFunctionSurveyQuestion({ open, setOpen }: Props) {
  const { sendRequest: updateDoc } = useUpdateDoc();
  const { sendRequest: addDoc } = useAddDoc();
  const [functionSurveyQuestionForm, setFunctionSurveyQuestionForm] = useRecoilState(
    functionSurveyQuestionFormAtom
  );
  const setFunctionSurveyQuestionsReset = useSetRecoilState(functionSurveyQuestionsResetAtom);
  const loggedInStaff = useRecoilValue(loggedInStaffAtom);

  const handleChange = (event: SyntheticEvent) => {
    const formState = event.target as FormState;
    setFunctionSurveyQuestionForm((pV) => {
      return { ...pV, [formState.name]: formState.value };
    });
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    setFunctionSurveyQuestionForm((pV) => ({ ...pV, [event.target.name]: event.target.value }));
  };

  const handleClose = () => {
    setOpen(false);
    setFunctionSurveyQuestionForm(BLANK_FUNCTION_SURVEY_QUESTION_FORM);
  };

  const handleSave = async () => {
    if (!loggedInStaff) return;
    const formToSubmit = {
      ...functionSurveyQuestionForm,
      organizationId: loggedInStaff.organizationId,
    };
    if ("id" in functionSurveyQuestionForm) {
      await updateDoc({
        col: "functionSurveyQuestions",
        data: formToSubmit,
        id: functionSurveyQuestionForm.id,
      });
    } else {
      await addDoc({ col: "functionSurveyQuestions", data: formToSubmit });
    }
    handleClose();
    setFunctionSurveyQuestionForm(BLANK_FUNCTION_SURVEY_QUESTION_FORM);
    setFunctionSurveyQuestionsReset((pV) => !pV);
  };

  return (
    <>
      {functionSurveyQuestionForm && (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
          <DialogTitle sx={{ fontSize: 44, textAlign: "center" }}>{`${
            "id" in functionSurveyQuestionForm ? "Edit" : "New"
          } Survey Question`}</DialogTitle>
          <DialogContent>
            <Typography sx={{ mb: 1 }} variant="body2">
              <i>Use *child* to auto put the child's first name into the question</i>
            </Typography>
            <Typography sx={{ mb: 1 }}>Label</Typography>
            <TextField
              fullWidth
              name="label"
              value={functionSurveyQuestionForm.label}
              onChange={handleChange}
            />
            <Typography sx={{ mb: 1, mt: 2 }}>Function of Behavior</Typography>
            <Select
              name="functionOfBehavior"
              onChange={handleSelectChange}
              value={functionSurveyQuestionForm.functionOfBehavior}
              fullWidth
            >
              <MenuItem value={FUNCTIONS_OF_BEHAVIOR.ACCESS}>
                {FUNCTIONS_OF_BEHAVIOR.ACCESS}
              </MenuItem>
              <MenuItem value={FUNCTIONS_OF_BEHAVIOR.ESCAPE}>
                {FUNCTIONS_OF_BEHAVIOR.ESCAPE}
              </MenuItem>
              <MenuItem value={FUNCTIONS_OF_BEHAVIOR.ATTENTION}>
                {FUNCTIONS_OF_BEHAVIOR.ATTENTION}
              </MenuItem>
              <MenuItem value={FUNCTIONS_OF_BEHAVIOR.SENSORY}>
                {FUNCTIONS_OF_BEHAVIOR.SENSORY}
              </MenuItem>
            </Select>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSave}>Save</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
