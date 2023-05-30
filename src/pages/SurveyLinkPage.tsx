import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SurveyForm from "../components/ManageSurvey/SurveyForm";
import { BLANK_FUNCTION_SURVEY_RESULT_FORM } from "../libraries/blankForms";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  functionSurveyFormAtom,
  functionSurveyQuestionsAtom,
  functionSurveyResultsResetAtom,
} from "../recoil/functionSurveyAtoms";
import { selectedStudentAtom } from "../recoil/studentAtoms";
import useAddDoc from "../hooks/useAddDoc";
import useUpdateDoc from "../hooks/useUpdateDoc";
import useGetDocs from "../hooks/useGetDocs";
import { Backdrop, Box, Button, CircularProgress, Paper, Typography } from "@mui/material";
import { SurveyLinkRecord } from "../types/types";
import { selectedStudentIdAtom } from "../recoil/studentAtoms";

function SurveyLinkPage() {
  const [functionSurveyForm, setFunctionSurveyForm] = useRecoilState(functionSurveyFormAtom);
  const [functionSurveyResultsReset, setFunctionSurveyResultsReset] = useRecoilState(
    functionSurveyResultsResetAtom
  );
  const setSelectedStudentId = useSetRecoilState(selectedStudentIdAtom);
  const questions = useRecoilValue(functionSurveyQuestionsAtom);
  const [notAnswered, setNotAnswered] = useState<string[]>([]);
  const [surveyLink, setSurveyLink] = useState<SurveyLinkRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const { sendRequest: addDoc } = useAddDoc();
  const { sendRequest: updateDoc } = useUpdateDoc();
  const { sendRequest: getDocs } = useGetDocs();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const studentId = queryParams.get("studentId");
  const passcode = queryParams.get("passcode");

  useEffect(() => {
    setLoading(true);
    if (!studentId || !passcode) return;
    const getSurveyLink = async () => {
      const response = await getDocs<SurveyLinkRecord>({
        col: "surveyLinks",
        config: {
          where: ["studentId", "==", studentId],
        },
      });
      if (response) {
        const currentLink = response.filter(
          (surveyLink) => surveyLink.passcode === passcode && surveyLink.compleated === false
        );

        if (currentLink.length === 1) {
          setSurveyLink(currentLink[0]);
          setSelectedStudentId(studentId);
        }
      }
      setLoading(false);
    };
    getSurveyLink();
  }, [getDocs, studentId, passcode, setSelectedStudentId, functionSurveyResultsReset]);

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
    if (!studentId || !surveyLink) return;
    const validated = validateQuestions();
    updateDoc({ col: "surveyLinks", id: surveyLink.id, data: { ...surveyLink, compleated: true } });
    if (validated) {
      const data = { ...functionSurveyForm, studentId: studentId };
      if ("id" in functionSurveyForm) {
        updateDoc({ col: "functionSurveyResuts", id: functionSurveyForm.id, data: data });
      } else {
        addDoc({ col: "functionSurveyResults", data: data });
      }
      setFunctionSurveyForm(BLANK_FUNCTION_SURVEY_RESULT_FORM);
      setFunctionSurveyResultsReset((pV) => !pV);
    }
  };
  return (
    <>
      {loading ? (
        <></>
      ) : (
        <Box sx={{ height: "100VH" }}>
          {surveyLink ? (
            <Box sx={{ pt: 4, pl: 8, pr: 8, pb: 4 }}>
              <Paper sx={{ padding: 2 }}>
                <Typography variant="h2">Student Behavior Survey</Typography>
                <SurveyForm notAnswered={notAnswered} setNotAnswered={setNotAnswered} />
                <Button
                  fullWidth
                  sx={{ mt: 2, padding: 2 }}
                  onClick={handleSave}
                  variant="contained"
                >
                  Submit
                </Button>
              </Paper>
            </Box>
          ) : (
            <Box sx={{ pt: 12, pl: 8, pr: 8, pb: 4 }}>
              <Paper sx={{ padding: 6, textAlign: "center" }}>
                <Typography variant="h4">
                  This Link is Expired, Please Reach Out To The Person Who Sent You This Link To Get
                  A New Link.
                </Typography>
              </Paper>
            </Box>
          )}
        </Box>
      )}
    </>
  );
}

export default SurveyLinkPage;
