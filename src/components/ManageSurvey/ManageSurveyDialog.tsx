import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import SurveyForm from "./SurveyForm";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  functionSurveyFormAtom,
  functionSurveyQuestionsAtom,
  functionSurveyResultsResetAtom,
} from "../../recoil/functionSurveyAtoms";
import { selectedStudentAtom } from "../../recoil/studentAtoms";
import useAddDoc from "../../hooks/useAddDoc";
import useUpdateDoc from "../../hooks/useUpdateDoc";
import { useState } from "react";
import { BLANK_FUNCTION_SURVEY_RESULT_FORM } from "../../libraries/blankForms";
import SendLinkDialog from "./SendLinkDialog";

type Props = {
  open: boolean;
  setOpen: (pV: boolean) => void;
};

function ManageSurveyDialog({ open, setOpen }: Props) {
  const [functionSurveyForm, setFunctionSurveyForm] = useRecoilState(functionSurveyFormAtom);
  const setFunctionSurveyResultsReset = useSetRecoilState(functionSurveyResultsResetAtom);
  const selectedStudent = useRecoilValue(selectedStudentAtom);
  const questions = useRecoilValue(functionSurveyQuestionsAtom);
  const [sendLinkOpen, setSendLinkOpen] = useState(false);
  const [notAnswered, setNotAnswered] = useState<string[]>([]);
  const { sendRequest: addDoc } = useAddDoc();
  const { sendRequest: updateDoc } = useUpdateDoc();
  const handleClose = () => {
    setOpen(false);
  };
  const validateQuestions = () => {
    if (!questions) return;
    const tempArray: string[] = [];
    questions.forEach((question) => {
      if (!functionSurveyForm.responses[question.id]) {
        tempArray.push(question.id);
      }
    });
    setNotAnswered(tempArray);
    return tempArray.length === 0 ? true : false;
  };
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent) return;
    const validated = validateQuestions();
    if (validated) {
      const data = { ...functionSurveyForm, studentId: selectedStudent.id };
      if ("id" in functionSurveyForm) {
        updateDoc({ col: "functionSurveyResuts", id: functionSurveyForm.id, data: data });
      } else {
        addDoc({ col: "functionSurveyResults", data: data });
      }
      setFunctionSurveyForm(BLANK_FUNCTION_SURVEY_RESULT_FORM);
      setFunctionSurveyResultsReset((pV) => !pV);
      handleClose();
    }
  };

  const handleSendLinkOpen = () => {
    setSendLinkOpen(true);
  };
  return (
    <>
      {selectedStudent && (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
          <form onSubmit={handleSave}>
            <Box sx={{ backgroundColor: "#fafafa", padding: 1 }}>
              <DialogTitle sx={{ fontSize: 44, textAlign: "center" }}>
                {"id" in functionSurveyForm ? "Edit" : "New"} Behavior Survey
              </DialogTitle>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h6">
                  {`For ${selectedStudent.firstName} ${selectedStudent.lastName}`}
                </Typography>
                <Button sx={{ mt: 2 }} variant="outlined" onClick={handleSendLinkOpen}>
                  Send Link Via Email
                </Button>
              </Box>
              <DialogContent>
                <SurveyForm notAnswered={notAnswered} setNotAnswered={setNotAnswered} />
              </DialogContent>
              <DialogActions>
                <Button type="submit" variant="contained">
                  Submit
                </Button>
                <Button onClick={handleClose}>Cancel</Button>
              </DialogActions>
            </Box>
          </form>
        </Dialog>
      )}
      <SendLinkDialog open={sendLinkOpen} setOpen={setSendLinkOpen} />
    </>
  );
}

export default ManageSurveyDialog;
