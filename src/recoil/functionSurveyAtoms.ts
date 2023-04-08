import { atom } from "recoil";
import {
  FunctionSurveyQuestion,
  FunctionSurveyQuestionRecord,
  FunctionSurveyResult,
  FunctionSurveyResultRecord,
} from "../types/types";
import {
  BLANK_FUNCTION_SURVEY_QUESTION_FORM,
  BLANK_FUNCTION_SURVEY_RESULT_FORM,
} from "../libraries/blankForms";

export const functionSurveyQuestionsAtom = atom<FunctionSurveyQuestionRecord[]>({
  key: "functionSurveyQuestions",
  default: [],
});

export const functionSurveyQuestionFormAtom = atom<
  FunctionSurveyQuestion | FunctionSurveyQuestionRecord
>({
  key: "functionSurveyQuestionForm",
  default: BLANK_FUNCTION_SURVEY_QUESTION_FORM,
});

export const functionSurveyQuestionsResetAtom = atom({
  key: "functionSurveyQuestionsReset",
  default: false,
});

export const functionSurveyOpenAtom = atom({
  key: "functionSurveyOpen",
  default: false,
});

export const functionSurveyResultsAtom = atom<FunctionSurveyResultRecord[]>({
  key: "functionSurveyResults",
  default: [],
});

export const functionSurveyResultsResetAtom = atom({
  key: "functionSurveyResultsReset",
  default: false,
});

export const functionSurveyFormAtom = atom<FunctionSurveyResult | FunctionSurveyResultRecord>({
  key: "functionSurveyForm",
  default: BLANK_FUNCTION_SURVEY_RESULT_FORM,
});
