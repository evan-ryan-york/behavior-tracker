import { GetRecoilValue, atom, selector } from "recoil";
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
import { behaviorDataDateRangeAtom } from "./behaviorPlansAtoms";

const filterSurveysByDateGetter = ({ get }: { get: GetRecoilValue }) => {
  const dateRange = get(behaviorDataDateRangeAtom);
  const surveyResults = get(functionSurveyResultsAtom);
  const [start, end] = dateRange;
  if (!start || !end || !surveyResults) return [];
  const filteredSurveyResults = surveyResults.filter(
    (surveyResult) =>
      surveyResult.createdAt &&
      surveyResult.createdAt.toMillis() > start.toMillis() &&
      surveyResult.createdAt.toMillis() < end.toMillis()
  );
  return filteredSurveyResults;
};

export const questionsObjectGetter = ({ get }: { get: GetRecoilValue }) => {
  const questions = get(functionSurveyQuestionsAtom);
  if (!questions) return null;
  const tempObj: { [key: string]: FunctionSurveyQuestionRecord } = {};
  questions.forEach((question) => {
    tempObj[question.id] = question;
  });
  return tempObj;
};

export const functionSurveyQuestionsAtom = atom<FunctionSurveyQuestionRecord[]>({
  key: "functionSurveyQuestions",
  default: [],
});

export const functionSurveyQuestionsObjAtom = selector({
  key: "functionSurveyQuestionsObj",
  get: questionsObjectGetter,
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

export const filteredSurveysByDateAtom = selector({
  key: "filteredSurveysByDate",
  get: filterSurveysByDateGetter,
});
